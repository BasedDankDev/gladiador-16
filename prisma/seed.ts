import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  // ── HOMBRE ──────────────────────────────────────────────
  {
    name: "Camiseta El Papá Sublimada",
    slug: "camiseta-papa-hombre",
    price: 12500,
    image: "/hombre/camiseta-papa/1.png",
    images: JSON.stringify([
      "/hombre/camiseta-papa/1.png",
      "/hombre/camiseta-papa/2.png",
      "/hombre/camiseta-papa/3.png",
      "/hombre/camiseta-papa/4.png",
      "/hombre/camiseta-papa/5.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "hombre",
    productType: "sublimada",
  },
  {
    name: "Camiseta Goku Sublimada",
    slug: "camiseta-goku-hombre",
    price: 12500,
    image: "/hombre/camiseta-goku/1.png",
    images: JSON.stringify([
      "/hombre/camiseta-goku/1.png",
      "/hombre/camiseta-goku/2.png",
      "/hombre/camiseta-goku/3.png",
      "/hombre/camiseta-goku/4.png",
      "/hombre/camiseta-goku/5.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "hombre",
    productType: "sublimada",
  },
  {
    name: "Retro Saprissa 2005",
    slug: "retro-2005-hombre",
    price: 15500,
    image: "/hombre/retro-2005/1.png",
    images: JSON.stringify([
      "/hombre/retro-2005/1.png",
      "/hombre/retro-2005/2.png",
      "/hombre/retro-2005/3.png",
      "/hombre/retro-2005/4.png",
      "/hombre/retro-2005/5.png",
    ]),
    badge: "NUEVO",
    variants: "6 Tallas",
    category: "hombre",
    productType: "retro",
  },
  {
    name: "Polo Modernista Oversize",
    slug: "polo-modernista-hombre",
    price: 19900,
    image: "/hombre/polo-modernista/1.png",
    images: JSON.stringify([
      "/hombre/polo-modernista/1.png",
      "/hombre/polo-modernista/2.png",
      "/hombre/polo-modernista/3.png",
      "/hombre/polo-modernista/4.png",
      "/hombre/polo-modernista/5.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "hombre",
    productType: "polo",
  },
  {
    name: "Polo Retro Oversize",
    slug: "polo-retro-hombre",
    price: 19900,
    image: "/hombre/polo-retro/1.png",
    images: JSON.stringify([
      "/hombre/polo-retro/1.png",
      "/hombre/polo-retro/2.png",
      "/hombre/polo-retro/3.png",
      "/hombre/polo-retro/4.png",
      "/hombre/polo-retro/5.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "hombre",
    productType: "polo",
  },
  {
    name: "Retro Saprissa 2008",
    slug: "retro-2008-hombre",
    price: 15500,
    image: "/hombre/retro-2008/1.png",
    images: JSON.stringify([
      "/hombre/retro-2008/1.png",
      "/hombre/retro-2008/2.png",
      "/hombre/retro-2008/3.png",
      "/hombre/retro-2008/4.png",
      "/hombre/retro-2008/5.png",
    ]),
    badge: "NUEVO",
    variants: "6 Tallas",
    category: "hombre",
    productType: "retro",
  },

  // ── MUJER ───────────────────────────────────────────────
  {
    name: "Camiseta Atemporal Blanca",
    slug: "saprissa-mujer-retro",
    price: 12500,
    image: "/mujer/saprissa-mujer-front.png",
    images: JSON.stringify([
      "/mujer/saprissa-mujer-front.png",
      "/mujer/saprissa-mujer-closeup.png",
      "/mujer/saprissa-mujer-back.png",
      "/mujer/saprissa-mujer-extra.png",
      "/mujer/saprissa-mujer-flatlay.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "mujer",
    productType: "retro",
  },
  {
    name: "Camiseta Atemporal Morada",
    slug: "atemporal-morada-mujer",
    price: 12500,
    image: "/mujer/atemporal-morada/1.png",
    images: JSON.stringify([
      "/mujer/atemporal-morada/1.png",
      "/mujer/atemporal-morada/2.png",
      "/mujer/atemporal-morada/3.png",
      "/mujer/atemporal-morada/4.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "mujer",
    productType: "retro",
  },
  {
    name: "Polo Modernista Crop",
    slug: "polo-modernista-crop-mujer",
    price: 19900,
    image: "/mujer/polo-modernista-crop/2.png",
    images: JSON.stringify([
      "/mujer/polo-modernista-crop/1.png",
      "/mujer/polo-modernista-crop/2.png",
      "/mujer/polo-modernista-crop/3.png",
      "/mujer/polo-modernista-crop/4.png",
      "/mujer/polo-modernista-crop/5.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "mujer",
    productType: "polo",
  },
  {
    name: "Polo Retro Crop",
    slug: "polo-retro-crop-mujer",
    price: 19900,
    image: "/mujer/polo-retro-crop/4.png",
    images: JSON.stringify([
      "/mujer/polo-retro-crop/1.png",
      "/mujer/polo-retro-crop/2.png",
      "/mujer/polo-retro-crop/3.png",
      "/mujer/polo-retro-crop/4.png",
      "/mujer/polo-retro-crop/5.png",
    ]),
    badge: "NUEVO",
    variants: "5 Tallas",
    category: "mujer",
    productType: "polo",
  },
];

async function main() {
  console.log("Seeding products...");
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
