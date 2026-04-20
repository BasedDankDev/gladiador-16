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
            <div className="mb-6">
              <Image
                src="/gladiador-logo.png"
                alt="Gladiador 16"
                width={64}
                height={64}
              />
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

          {/* Follow */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-6">SÍGUENOS</h4>
            <a
              href="https://www.tiktok.com/@gladiador16cr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-light"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.24a8.16 8.16 0 0 0 4.77 1.52V6.31a4.85 4.85 0 0 1-1.84-.38Z" />
              </svg>
              @gladiador16cr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
