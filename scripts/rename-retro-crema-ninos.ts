import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const r = await prisma.product.update({
    where: { slug: "retro-crema-ninos" },
    data: { name: "Polo Retro Niños" },
  });
  console.log(`${r.slug}: name="${r.name}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
