import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Old: polo-retro-crop-mujer points at /mujer/polo-retro-crop (stripes shirt)
  // Old: polo-modernista-crop-mujer points at /mujer/polo-modernista-crop (cream/maroon shirt)
  // We want slug+name+images all aligned by style.
  // Directories were just swapped on disk, so the slug paths will line up after we swap slugs too.

  const stripes = await prisma.product.findUnique({ where: { slug: "polo-retro-crop-mujer" } });
  const cream = await prisma.product.findUnique({ where: { slug: "polo-modernista-crop-mujer" } });

  if (!stripes || !cream) {
    console.log("missing one of the products");
    return;
  }

  // Step 1: park stripes at temp slug
  await prisma.product.update({
    where: { slug: "polo-retro-crop-mujer" },
    data: { slug: "_swap_tmp_crop" },
  });

  // Step 2: move cream → polo-retro-crop-mujer, update image paths
  await prisma.product.update({
    where: { slug: "polo-modernista-crop-mujer" },
    data: {
      slug: "polo-retro-crop-mujer",
      image: cream.image.replace("/polo-modernista-crop/", "/polo-retro-crop/"),
      images: cream.images
        ? JSON.stringify(
            (JSON.parse(cream.images) as string[]).map((p) =>
              p.replace("/polo-modernista-crop/", "/polo-retro-crop/"),
            ),
          )
        : cream.images,
    },
  });

  // Step 3: move stripes (temp) → polo-modernista-crop-mujer, update image paths
  await prisma.product.update({
    where: { slug: "_swap_tmp_crop" },
    data: {
      slug: "polo-modernista-crop-mujer",
      image: stripes.image.replace("/polo-retro-crop/", "/polo-modernista-crop/"),
      images: stripes.images
        ? JSON.stringify(
            (JSON.parse(stripes.images) as string[]).map((p) =>
              p.replace("/polo-retro-crop/", "/polo-modernista-crop/"),
            ),
          )
        : stripes.images,
    },
  });

  console.log("Swap complete");
  for (const slug of ["polo-modernista-crop-mujer", "polo-retro-crop-mujer"]) {
    const p = await prisma.product.findUnique({ where: { slug } });
    console.log(`${slug}: name="${p?.name}" image=${p?.image}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
