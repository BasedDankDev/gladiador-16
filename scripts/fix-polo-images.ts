import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // After folder swap:
  // polo-retro-crop/   = all 5 striped images (was polo-modernista-crop/)
  // polo-modernista-crop/ = 4 cream+accents + 1 striped outlier at /4.png
  //
  // Fix:
  //   - polo-retro-crop-mujer → main image = /mujer/polo-retro-crop/2.png (striped model standing)
  //     images stay as 1-5 (all striped, all correct)
  //   - polo-modernista-crop-mujer → drop /4.png from images array (the striped outlier)

  const retro = await prisma.product.update({
    where: { slug: "polo-retro-crop-mujer" },
    data: {
      image: "/mujer/polo-retro-crop/2.png",
      images: JSON.stringify([
        "/mujer/polo-retro-crop/1.png",
        "/mujer/polo-retro-crop/2.png",
        "/mujer/polo-retro-crop/3.png",
        "/mujer/polo-retro-crop/4.png",
        "/mujer/polo-retro-crop/5.png",
      ]),
    },
  });

  const modernista = await prisma.product.update({
    where: { slug: "polo-modernista-crop-mujer" },
    data: {
      image: "/mujer/polo-modernista-crop/2.png",
      images: JSON.stringify([
        "/mujer/polo-modernista-crop/1.png",
        "/mujer/polo-modernista-crop/2.png",
        "/mujer/polo-modernista-crop/3.png",
        "/mujer/polo-modernista-crop/5.png",
      ]),
    },
  });

  console.log("polo-retro-crop-mujer:", retro.image);
  console.log("  images:", retro.images);
  console.log("polo-modernista-crop-mujer:", modernista.image);
  console.log("  images:", modernista.images);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
