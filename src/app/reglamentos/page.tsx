import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Reglamentos() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-10 h-1 bg-maroon-light mb-6" />
          <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-8">
            Reglamentos
          </h1>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed">
            <p>
              En Gladiador 16 nos comprometemos a ofrecer una experiencia de compra transparente y justa. A continuacion detallamos nuestros reglamentos generales.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Compras y disponibilidad</h2>
            <p>
              Todos los productos estan sujetos a disponibilidad. En caso de que un articulo se agote despues de realizado el pedido, nos comunicaremos contigo para ofrecerte alternativas o gestionar la devolucion del monto.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Personalizacion</h2>
            <p>
              Los productos personalizados (nombre, numero u otros detalles) no son elegibles para cambio ni devolucion, salvo que presenten defectos de fabrica. Verifica cuidadosamente los datos antes de confirmar tu pedido.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Cuidado de las prendas</h2>
            <p>
              Para mantener la calidad de nuestros productos, recomendamos lavar a mano o en ciclo delicado con agua fria, no usar secadora y no planchar directamente sobre los disenos sublimados.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Uso de contenido</h2>
            <p>
              Las fotografias, textos y disenos publicados en este sitio son propiedad de Gladiador 16. Queda prohibida su reproduccion total o parcial sin autorizacion previa por escrito.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Propiedad intelectual y originalidad</h2>
            <p>
              Todos nuestros disenos son originales y creados internamente. No utilizamos logos protegidos ni producimos replicas de uniformes oficiales. Nuestra propuesta es ropa casual y retro, para hombres y mujeres, inspirada en la aficion pero con identidad propia.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar estos reglamentos en cualquier momento. Los cambios se publicaran en esta pagina y entraran en vigencia de forma inmediata.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
