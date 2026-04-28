import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUGS = [
  "camiseta-goku-hombre",
];

async function main() {
  for (const slug of SLUGS) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`${slug}: not found`);
      continue;
    }
    const itemCount = await prisma.orderItem.count({ where: { productId: product.id } });
    if (itemCount > 0) {
      const items = await prisma.orderItem.findMany({
        where: { productId: product.id },
        include: { order: { select: { id: true, status: true, shippingName: true } } },
      });
      console.log(`  ${slug} has ${itemCount} order item(s):`);
      for (const it of items) {
        console.log(`    order #${it.order.id.slice(-5)} ${it.order.shippingName} status=${it.order.status}`);
      }
      await prisma.orderItem.deleteMany({ where: { productId: product.id } });
      console.log(`  Deleted ${itemCount} order item(s)`);
    }
    await prisma.product.delete({ where: { slug } });
    console.log(`Deleted ${product.name} (${slug})`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
