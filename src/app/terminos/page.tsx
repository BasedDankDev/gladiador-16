import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terminos() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-10 h-1 bg-maroon-light mb-6" />
          <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight mb-8">
            Terminos y Condiciones
          </h1>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed">
            <p>
              Al acceder y utilizar el sitio web de Gladiador 16, aceptas los siguientes terminos y condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier compra.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">1. Uso del sitio</h2>
            <p>
              Este sitio web es propiedad de Gladiador 16. El contenido, imagenes, disenos y textos son propiedad exclusiva de la marca y estan protegidos por las leyes de propiedad intelectual de Costa Rica.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">2. Productos y precios</h2>
            <p>
              Los precios mostrados estan en colones costarricenses e incluyen el impuesto de valor agregado (IVA). Nos reservamos el derecho de modificar precios sin previo aviso. Las imagenes de los productos son referenciales y pueden variar ligeramente del producto final.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">3. Pedidos y pagos</h2>
            <p>
              Al realizar un pedido, te comprometes a proporcionar informacion veridica y completa. Aceptamos pagos por transferencia bancaria, SINPE Movil y otros metodos indicados durante el proceso de compra. El pedido se confirma una vez verificado el pago.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">4. Envios</h2>
            <p>
              Realizamos envios a todo Costa Rica. Los tiempos de entrega varian segun la ubicacion y disponibilidad del producto. Pedidos mayores a 25 000 colones califican para envio gratuito.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">5. Devoluciones y cambios</h2>
            <p>
              Aceptamos cambios de talla dentro de los primeros 7 dias naturales posteriores a la entrega, siempre que el producto se encuentre en su estado original, sin uso y con sus etiquetas. No se realizan devoluciones de dinero, unicamente cambios.
            </p>

            <h2 className="text-xl font-bold text-black pt-2">6. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos terminos, puedes comunicarte con nosotros al +506 8855 7999 o al correo info@gladiador16.cr.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
