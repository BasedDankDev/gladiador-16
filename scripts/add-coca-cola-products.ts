import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRODUCTS = [
  {
    slug: "visitante-1986-hombre",
    name: "Camiseta Visitante 1986 Coca-Cola - Hombre",
    price: 19900,
    image: "/hombre/visitante-1986/1.png",
    images: [
      "/hombre/visitante-1986/1.png",
      "/hombre/visitante-1986/2.png",
      "/hombre/visitante-1986/3.png",
      "/hombre/visitante-1986/4.png",
      "/hombre/visitante-1986/5.png",
    ],
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "hombre",
    productType: "retro",
  },
  {
    slug: "visitante-1986-mujer",
    name: "Camiseta Visitante 1986 Coca-Cola - Mujer",
    price: 19900,
    image: "/mujer/visitante-1986/1.png",
    images: [
      "/mujer/visitante-1986/1.png",
      "/mujer/visitante-1986/2.png",
      "/mujer/visitante-1986/3.png",
      "/mujer/visitante-1986/4.png",
      "/mujer/visitante-1986/5.png",
    ],
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "mujer",
    productType: "retro",
  },
  {
    slug: "adidas-local-maroon",
    name: "Adidas Local",
    price: 19900,
    image: "/unisex/adidas-local/1.png",
    images: [
      "/unisex/adidas-local/1.png",
      "/unisex/adidas-local/2.png",
      "/unisex/adidas-local/3.png",
      "/unisex/adidas-local/4.png",
      "/unisex/adidas-local/5.png",
      "/unisex/adidas-local/6.png",
    ],
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "unisex",
    productType: "retro",
  },
];

async function main() {
  for (const p of PRODUCTS) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`${p.slug}: already exists, updating...`);
      await prisma.product.update({
        where: { slug: p.slug },
        data: {
          name: p.name,
          price: p.price,
          image: p.image,
          images: JSON.stringify(p.images),
          badge: p.badge,
          variants: p.variants,
          category: p.category,
          productType: p.productType,
          inStock: true,
        },
      });
    } else {
      await prisma.product.create({
        data: {
          slug: p.slug,
          name: p.name,
          price: p.price,
          image: p.image,
          images: JSON.stringify(p.images),
          badge: p.badge,
          variants: p.variants,
          category: p.category,
          productType: p.productType,
          inStock: true,
        },
      });
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
