import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (const slug of ["polo-modernista-crop-mujer", "polo-retro-crop-mujer"]) {
    const p = await prisma.product.findUnique({ where: { slug } });
    console.log(`slug=${slug}`);
    console.log(`  name=${p?.name}`);
    console.log(`  image=${p?.image}`);
    console.log(`  images=${p?.images}`);
  }
}

main().finally(() => prisma.$disconnect());
