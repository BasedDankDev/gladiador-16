import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RENAMES: { slug: string; name: string }[] = [
  { slug: "camiseta-goku-hombre", name: "Camiseta Goku Saprissa - Hombre" },
  { slug: "polo-modernista-hombre", name: "Polo Modernista Saprissa - Hombre" },
  { slug: "polo-retro-hombre", name: "Polo Retro Saprissa - Hombre" },
];

async function main() {
  for (const r of RENAMES) {
    const before = await prisma.product.findUnique({ where: { slug: r.slug }, select: { name: true } });
    if (!before) {
      console.log(`${r.slug}: not found`);
      continue;
    }
    await prisma.product.update({ where: { slug: r.slug }, data: { name: r.name } });
    console.log(`${r.slug}: "${before.name}" -> "${r.name}"`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
