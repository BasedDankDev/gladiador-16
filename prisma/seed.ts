import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Camiseta Basica Negra",
    slug: "camiseta-basica-negra",
    price: 12500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "camisetas",
  },
  {
    name: "Camiseta Basica Blanca",
    slug: "camiseta-basica-blanca",
    price: 12500,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "camisetas",
  },
  {
    name: "Hoodie Oversize",
    slug: "hoodie-oversize",
    price: 24500,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 4 Tallas",
    category: "hoodies",
  },
  {
    name: "Pantalon Cargo",
    slug: "pantalon-cargo",
    price: 19500,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "pantalones",
  },
  {
    name: "Jogger Deportivo",
    slug: "jogger-deportivo",
    price: 18500,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "3 Colores, 4 Tallas",
    category: "pantalones",
  },
  {
    name: "Polo Clasico",
    slug: "polo-clasico",
    price: 15000,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
    badge: "AGOTADO",
    variants: "3 Colores, 5 Tallas",
    category: "camisetas",
    inStock: false,
  },
  {
    name: "Chaleco Deportivo",
    slug: "chaleco-deportivo",
    price: 22000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 4 Tallas",
    category: "chalecos",
  },
  {
    name: "Camisa Formal",
    slug: "camisa-formal",
    price: 28000,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop",
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "camisas",
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
