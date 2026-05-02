import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const r = await prisma.product.update({
    where: { slug: "polo-retro-crop-mujer" },
    data: { image: "/mujer/polo-retro-crop-v2/2.png" },
  });
  console.log(`${r.slug}: image=${r.image}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
