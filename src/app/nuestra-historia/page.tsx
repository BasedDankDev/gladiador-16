import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function NuestraHistoria() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[60vh] bg-black overflow-hidden flex items-center justify-center">
          <Image
            src="/hombre/retro-2005/1.png"
            alt=""
            fill
            className="object-cover opacity-20 scale-110 blur-sm"
            sizes="100vw"
          />
          <div className="relative z-10 text-center px-6">
            <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.3em] mb-4">
              Desde 1970
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic text-white tracking-tight leading-none">
              NUESTRA HISTORIA
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          {/* Origin */}
          <div className="mb-16">
            <div className="w-10 h-1 bg-maroon-light mb-6" />
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight mb-6">
              Con herencia de El Atleta (1970)
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Pioneros en serigrafia deportiva en Costa Rica. Hoy, desde Servirapidos Serigraficos, continuamos esa tradicion con tecnologia de punta en sublimacion y telas de alto rendimiento, acabados nitidos en materiales como Brush Norteamericano, Dry Fit, Speed Dry, Speed, Geek y Columbia. Todo ese conocimiento lo canalizamos en nuestra marca propia, Gladiador 16, donde cada prenda refleja decadas de experiencia al servicio de la aficion.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <div className="w-10 h-1 bg-gold mb-6" />
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight mb-6">
              Una marca creada por la aficion
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Nuestra ropa e historias capturan los momentos que definen la experiencia del hincha y la cultura de nuestras comunidades. Elevamos estos momentos, grandes y pequenos, que hacen del deporte algo tan extraordinario y significativo para tantas personas.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Lo expresamos a traves del arte y el diseno. Es una gran responsabilidad, por eso nuestros productos son de la mas alta calidad, elevando la ropa deportiva al nivel que los fanaticos merecen, hecha a nuestra medida, con la aficion en el corazon del proceso.
            </p>
          </div>

          {/* Materials highlight */}
          <div className="bg-[#0d1117] text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-lg md:text-xl font-bold mb-4">Materiales de elite</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Brush Norteamericano", "Dry Fit", "Speed Dry", "Speed", "Geek", "Columbia"].map((mat) => (
                <div key={mat} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                  <span className="text-sm font-medium text-white/80">{mat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
