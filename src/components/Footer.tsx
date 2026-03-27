"use client";

import Image from "next/image";

const helpLinks = ["+506 8888-8888", "Lun-Vie 9am-5pm", "info@gladiador16.cr", "Terminos de servicio", "Politica de privacidad"];
const orderLinks = ["Devoluciones", "Opciones de pago", "Opciones de envio", "Envio gratis"];
const aboutLinks = ["Nuestros valores", "Contacto", "Tienda fisica"];
const socialLinks = ["Instagram", "TikTok", "Facebook"];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-10">
      <div className="px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="w-16 h-16 bg-maroon-light flex items-center justify-center mb-6 relative">
              <Image
                src="/escudo-logo.svg"
                alt="Gladiador 16"
                width={28}
                height={35}
                className="invert"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-gold" />
            </div>
            <h3 className="text-4xl font-black tracking-tight uppercase leading-none">
              <span className="text-white">GLADI</span>
              <br />
              <span className="text-maroon-light">ADOR</span>
              <br />
              <span className="text-maroon-light">16</span>
            </h3>
            <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase mt-4 leading-relaxed">
              ROPA DEPORTIVA DE ELITE
              <br />
              SAN JOSE, COSTA RICA
            </p>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6">AYUDA</h4>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Orders */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6">PEDIDOS</h4>
            <ul className="space-y-3">
              {orderLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6">NOSOTROS</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6">REDES</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16">
          <h4 className="text-sm font-bold tracking-wider uppercase mb-4">SUSCRIBITE</h4>
          <form className="flex max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-maroon-light px-4 py-3 hover:bg-maroon transition-colors"
              aria-label="Suscribirse"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
