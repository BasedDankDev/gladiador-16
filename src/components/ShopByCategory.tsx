"use client";

import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-cream text-black py-10 md:py-16">
      <div className="px-6 md:px-16">

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/hombre/polo-modernista/1.png"
              alt="Gladiador 16"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Bienvenido a Gladiador 16, una marca creada por la aficion.
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Nuestra ropa e historias capturan los momentos que definen la experiencia del hincha y la cultura de nuestras comunidades. Elevamos estos momentos, grandes y pequenos, que hacen del deporte algo tan extraordinario y significativo para tantas personas.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Lo expresamos a traves del arte y el diseno. Es una gran responsabilidad, por eso nuestros productos son de la mas alta calidad, elevando la ropa deportiva al nivel que los fanaticos merecen, hecha a nuestra medida, con la aficion en el corazon del proceso.
            </p>
            <Link
              href="/nuestra-historia"
              className="inline-block border border-black text-black text-sm font-medium px-8 py-3 hover:bg-black hover:text-white transition-colors"
            >
              Nuestra Historia
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
