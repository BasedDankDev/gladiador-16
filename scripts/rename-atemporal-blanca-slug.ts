import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const r = await prisma.product.update({
    where: { slug: "saprissa-mujer-retro" },
    data: { slug: "atemporal-blanca-mujer" },
  });
  console.log(`updated: slug=${r.slug} name="${r.name}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
