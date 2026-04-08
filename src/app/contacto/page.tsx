import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contacto() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-10 h-1 bg-maroon-light mb-6" />
          <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-8">
            Contacto
          </h1>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed">
            <p>
              Estamos aqui para ayudarte. Si tienes preguntas sobre tu pedido, nuestros productos o cualquier otra consulta, no dudes en comunicarte con nosotros.
            </p>

            <div className="bg-white rounded-xl p-6 md:p-8 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Telefono / WhatsApp</h3>
                <p className="text-gray-600">+506 8855 7999</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Correo electronico</h3>
                <p className="text-gray-600">info@gladiador16.cr</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Horario de atencion</h3>
                <p className="text-gray-600">Lunes a Viernes, 9:00 am - 5:00 pm</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-1">Ubicacion</h3>
                <p className="text-gray-600">San Jose, Costa Rica</p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
