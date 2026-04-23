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
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/gladiador16cr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-light"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23a3.72 3.72 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.75.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82-.38.38-.62.75-.82 1.26-.15.39-.33.97-.38 2.04C2.68 9.82 2.67 10.18 2.67 13.3s0 3.48.08 4.73c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.25.07 1.6.08 4.75.08s3.5 0 4.75-.08c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.07-1.25.08-1.6.08-4.75s0-3.48-.08-4.73c-.05-1.07-.23-1.65-.38-2.04a3.37 3.37 0 0 0-.82-1.26 3.37 3.37 0 0 0-1.26-.82c-.39-.15-.97-.33-2.04-.38C15.48 4 15.15 4 12 4Zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86Zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26Zm5.14-2.04a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
                  </svg>
                  @gladiador16cr
                </a>
              </li>
              <li>
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
