import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newImages = [
    "/mujer/polo-retro-crop-v2/3.png",
    "/mujer/polo-retro-crop-v2/2.png",
    "/mujer/polo-retro-crop-v2/5.png",
    "/mujer/polo-retro-crop-v2/1.png",
  ];

  await prisma.product.update({
    where: { slug: "polo-retro-crop-mujer" },
    data: {
      image: newImages[0],
      images: JSON.stringify(newImages),
    },
  });

  const p = await prisma.product.findUnique({ where: { slug: "polo-retro-crop-mujer" } });
  console.log(`image=${p?.image}`);
  console.log(`images=${p?.images}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
