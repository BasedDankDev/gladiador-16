import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Slim Fit Dragon S",
    slug: "slim-fit-dragon-s",
    price: 12500,
    image: "/images/products/img-6.png",
    images: JSON.stringify(["/images/products/img-6.png", "/images/products/img-15.png", "/images/products/img-16.png"]),
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "camisetas",
  },
  {
    name: "Slim Fit Papa Morado",
    slug: "slim-fit-papa-morado",
    price: 12500,
    image: "/images/products/img-8.png",
    images: JSON.stringify(["/images/products/img-8.png", "/images/products/img-14.png", "/images/products/img-18.png"]),
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "camisetas",
  },
  {
    name: "Dry Fit Goku S",
    slug: "dry-fit-goku-s",
    price: 24500,
    image: "/images/products/img-24.png",
    images: JSON.stringify(["/images/products/img-24.png", "/images/products/img-22.png", "/images/products/img-21.png"]),
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 4 Tallas",
    category: "camisetas",
  },
  {
    name: "Dry Fit Dracarys",
    slug: "dry-fit-dracarys",
    price: 19500,
    image: "/images/products/img-6b.png",
    images: JSON.stringify(["/images/products/img-6b.png", "/images/products/img-26.png", "/images/products/img-25.png"]),
    badge: "ENVIO RAPIDO",
    variants: "2 Colores, 5 Tallas",
    category: "camisetas",
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
