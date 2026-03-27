"use client";

import Image from "next/image";
import Link from "next/link";

const newProducts = [
  {
    name: "CAMISETA BASICA NEGRA",
    subtitle: "EDICION ESPECIAL",
    price: "12 500",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    slug: "camiseta-basica-negra",
  },
  {
    name: "HOODIE OVERSIZE",
    subtitle: "EDICION ESPECIAL",
    price: "24 500",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    slug: "hoodie-oversize",
  },
  {
    name: "CAMISETA BASICA NEGRA",
    subtitle: "EDICION ESPECIAL",
    price: "12 500",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=600&fit=crop",
    slug: "camiseta-basica-blanca",
  },
  {
    name: "CAMISETA BASICA BLANCA",
    subtitle: "EDICION ESPECIAL",
    price: "12 500",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=600&fit=crop",
    slug: "camiseta-basica-blanca-2",
  },
];

export default function NewArrivals() {
  return (
    <section id="nuevo" className="bg-black py-16 md:py-24">
      <div className="px-6 md:px-16">
        {/* Title */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">
            NO TE PERDAS
          </h2>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">
            NUESTROS DISEÑOS RETRO
          </h2>
        </div>

        {/* Products Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newProducts.map((product, i) => (
            <Link key={i} href={`/producto/${product.slug}`} className="group">
              <div className="relative overflow-hidden bg-gray-900 aspect-[3/4]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-xs font-bold tracking-wider uppercase text-white">
                  {product.name}
                </h3>
                <p className="text-[10px] text-maroon-light mt-1 tracking-wider uppercase">
                  {product.subtitle}
                </p>
                <p className="text-base font-bold mt-1 text-white">
                  ₡{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
