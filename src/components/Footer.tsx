"use client";

import Image from "next/image";

const helpLinks = ["+506 8855 7999", "Lun-Vie 9am-5pm", "info@gladiador16.cr"];
const generalLinks = [
  { label: "Nuestra Historia", href: "/nuestra-historia" },
  { label: "Contacto", href: "/contacto" },
  { label: "Terminos y Condiciones", href: "/terminos" },
  { label: "Politica de Privacidad", href: "/privacidad" },
  { label: "Reglamentos", href: "/reglamentos" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-10">
      <div className="px-6 md:px-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Brand */}
          <div>
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

          {/* General */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6">GENERAL</h4>
            <ul className="space-y-3">
              {generalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors font-light">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
