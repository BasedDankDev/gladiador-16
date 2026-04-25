import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const corrections: { slug: string; correctPrice: number }[] = [
  { slug: "saprissa-mujer-retro", correctPrice: 15500 },
  { slug: "atemporal-morada-mujer", correctPrice: 15500 },
  { slug: "polo-modernista-crop-mujer", correctPrice: 19900 },
  { slug: "polo-retro-crop-mujer", correctPrice: 19900 },
  { slug: "camiseta-papa-hombre", correctPrice: 15500 },
  { slug: "camiseta-goku-hombre", correctPrice: 15500 },
  { slug: "retro-2005-hombre", correctPrice: 17500 },
  { slug: "polo-modernista-hombre", correctPrice: 19900 },
  { slug: "polo-retro-hombre", correctPrice: 19900 },
  { slug: "retro-2008-hombre", correctPrice: 17500 },
];

async function main() {
  console.log("Before:");
  for (const c of corrections) {
    const p = await prisma.product.findUnique({ where: { slug: c.slug }, select: { slug: true, price: true, name: true } });
    console.log(`  ${c.slug}: current=${p?.price} → target=${c.correctPrice}`);
  }

  console.log("\nUpdating...");
  for (const c of corrections) {
    await prisma.product.update({
      where: { slug: c.slug },
      data: { price: c.correctPrice },
    });
  }

  console.log("\nAfter:");
  for (const c of corrections) {
    const p = await prisma.product.findUnique({ where: { slug: c.slug }, select: { slug: true, price: true } });
    console.log(`  ${c.slug}: ${p?.price}`);
  }

  console.log("\nScanning for historical orders that used mis-priced products...");
  const slugs = corrections.map((c) => c.slug);
  const products = await prisma.product.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true, price: true } });
  const priceBySlug = new Map(products.map((p) => [p.slug, p.price]));
  const idToSlug = new Map(products.map((p) => [p.id, p.slug]));

  const affectedItems = await prisma.orderItem.findMany({
    where: { productId: { in: products.map((p) => p.id) } },
    include: { order: { select: { id: true, createdAt: true, shippingName: true, status: true, total: true } } },
    orderBy: { order: { createdAt: "desc" } },
  });

  let flagged = 0;
  for (const item of affectedItems) {
    const slug = idToSlug.get(item.productId)!;
    const correctPrice = priceBySlug.get(slug)!;
    if (item.price !== correctPrice) {
      flagged++;
      const short = item.order.id.slice(-5);
      const diff = correctPrice - item.price;
      const sign = diff > 0 ? "+" : "";
      console.log(
        `  #${short}  ${item.order.createdAt.toISOString().slice(0, 10)}  ${item.order.shippingName.padEnd(20)}  ${slug.padEnd(30)}  qty=${item.quantity}  charged=${item.price}  should=${correctPrice}  delta=${sign}${diff * item.quantity}  status=${item.order.status}`
      );
    }
  }
  console.log(`\nTotal affected order items: ${flagged}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
