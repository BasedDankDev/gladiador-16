import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUGS = ["polo-modernista-crop-mujer", "polo-retro-crop-mujer"];

async function main() {
  for (const slug of SLUGS) {
    const p = await prisma.product.findUnique({ where: { slug } });
    if (!p) continue;

    const newImage = p.image
      .replace("/polo-modernista-crop/", "/polo-modernista-crop-v2/")
      .replace("/polo-retro-crop/", "/polo-retro-crop-v2/");

    const newImages = p.images
      ? JSON.stringify(
          (JSON.parse(p.images) as string[]).map((path) =>
            path
              .replace("/polo-modernista-crop/", "/polo-modernista-crop-v2/")
              .replace("/polo-retro-crop/", "/polo-retro-crop-v2/"),
          ),
        )
      : p.images;

    await prisma.product.update({
      where: { slug },
      data: { image: newImage, images: newImages },
    });
    console.log(`${slug}: image=${newImage}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
