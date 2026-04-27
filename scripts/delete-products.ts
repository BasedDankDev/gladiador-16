import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUGS = [
  "retro-2008-hombre",
  "camiseta-papa-hombre",
  "retro-2005-hombre",
];

async function main() {
  for (const slug of SLUGS) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`${slug}: not found`);
      continue;
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
