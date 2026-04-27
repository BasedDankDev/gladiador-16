import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUGS_TO_DELETE = [
  "retro-2008-hombre",
  "camiseta-papa-hombre",
  "retro-2005-hombre",
];

async function main() {
  for (const slug of SLUGS_TO_DELETE) {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true },
    });
    if (!product) {
      console.log(`\n${slug}: NOT FOUND in DB`);
      continue;
    }
    const items = await prisma.orderItem.findMany({
      where: { productId: product.id },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            shippingName: true,
          },
        },
      },
    });
    console.log(`\n${product.name} (${slug}): ${items.length} order item(s)`);
    for (const it of items) {
      const short = it.order.id.slice(-5);
      const date = it.order.createdAt.toISOString().slice(0, 10);
      console.log(
        `  #${short}  ${date}  ${it.order.shippingName.padEnd(20)}  qty=${it.quantity}  status=${it.order.status}`
      );
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
