import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RENAMES: { slug: string; name: string }[] = [
  { slug: "polo-retro-crop-mujer", name: "Polo Retro Crop" },
  { slug: "polo-modernista-crop-mujer", name: "Polo Modernista Crop Saprissa" },
];

async function main() {
  for (const r of RENAMES) {
    const existing = await prisma.product.findUnique({ where: { slug: r.slug } });
    if (!existing) {
      console.log(`${r.slug}: not found`);
      continue;
    }
    if (existing.name === r.name) {
      console.log(`${r.slug}: already "${r.name}"`);
      continue;
    }
    await prisma.product.update({ where: { slug: r.slug }, data: { name: r.name } });
    console.log(`${r.slug}: "${existing.name}" -> "${r.name}"`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
