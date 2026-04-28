import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRICE = 15900;

const PRODUCTS = [
  {
    slug: "retro-crema-ninos",
    name: "Retro Crema Niños",
    image: "/ninos/retro-crema/1.png",
    images: [
      "/ninos/retro-crema/1.png",
      "/ninos/retro-crema/2.png",
      "/ninos/retro-crema/3.png",
      "/ninos/retro-crema/4.png",
      "/ninos/retro-crema/5.png",
    ],
    productType: "retro",
  },
  {
    slug: "visitante-1986-nino",
    name: "Polo Retro Coca Cola Niño",
    image: "/ninos/visitante-1986-nino/1.png",
    images: [
      "/ninos/visitante-1986-nino/1.png",
      "/ninos/visitante-1986-nino/2.png",
      "/ninos/visitante-1986-nino/3.png",
      "/ninos/visitante-1986-nino/4.png",
    ],
    productType: "retro",
  },
  {
    slug: "visitante-1986-nina",
    name: "Polo Retro Coca Cola Niña",
    image: "/ninos/visitante-1986-nina/1.png",
    images: [
      "/ninos/visitante-1986-nina/1.png",
      "/ninos/visitante-1986-nina/2.png",
      "/ninos/visitante-1986-nina/3.png",
      "/ninos/visitante-1986-nina/4.png",
    ],
    productType: "retro",
  },
  {
    slug: "adidas-local-ninos",
    name: "Polo Retro Adidas Local Niños",
    image: "/ninos/adidas-local/1.png",
    images: [
      "/ninos/adidas-local/1.png",
      "/ninos/adidas-local/2.png",
      "/ninos/adidas-local/3.png",
      "/ninos/adidas-local/4.png",
      "/ninos/adidas-local/5.png",
    ],
    productType: "retro",
  },
];

async function main() {
  for (const p of PRODUCTS) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    const data = {
      name: p.name,
      price: PRICE,
      image: p.image,
      images: JSON.stringify(p.images),
      badge: "NUEVO",
      variants: "5 Tallas",
      category: "ninos",
      productType: p.productType,
      inStock: true,
    };
    if (existing) {
      await prisma.product.update({ where: { slug: p.slug }, data });
      console.log(`${p.slug}: updated`);
    } else {
      await prisma.product.create({ data: { slug: p.slug, ...data } });
      console.log(`${p.slug}: created`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
