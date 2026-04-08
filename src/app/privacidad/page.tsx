import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacidad() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-10 h-1 bg-maroon-light mb-6" />
          <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-8">
            Politica de Privacidad
          </h1>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed">
            <p>
              En Gladiador 16 valoramos tu privacidad. Esta politica describe como recopilamos, usamos y protegemos tu informacion personal cuando utilizas nuestro sitio web.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Informacion que recopilamos</h2>
            <p>
              Al realizar una compra o registrarte en nuestro sitio, podemos recopilar tu nombre, correo electronico, numero de telefono, direccion de envio y datos necesarios para procesar tu pedido.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Uso de la informacion</h2>
            <p>
              Utilizamos tu informacion unicamente para procesar pedidos, enviar confirmaciones, coordinar entregas y brindarte atencion al cliente. No compartimos ni vendemos tu informacion personal a terceros.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Seguridad</h2>
            <p>
              Implementamos medidas de seguridad para proteger tu informacion personal contra acceso no autorizado, alteracion o divulgacion. Sin embargo, ninguna transmision por internet es completamente segura.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Cookies</h2>
            <p>
              Nuestro sitio puede utilizar cookies para mejorar tu experiencia de navegacion. Puedes configurar tu navegador para rechazar cookies, aunque esto podria afectar algunas funcionalidades del sitio.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">Contacto</h2>
            <p>
              Si tienes preguntas sobre esta politica de privacidad, escribenos a info@gladiador16.cr o llamanos al +506 8855 7999.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
