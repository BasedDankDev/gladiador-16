"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

function UserDropdown({ session }: { session: { user?: { name?: string | null; email?: string | null; image?: string | null } } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = session.user?.name?.charAt(0).toUpperCase() || "?";
  const avatarUrl = session.user?.image;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-contain bg-white/10" />
        ) : (
          <div className="w-8 h-8 bg-maroon-light rounded-full flex items-center justify-center text-xs font-bold text-white">
            {initial}
          </div>
        )}
        <span className="hidden md:inline text-sm text-white">{session.user?.name}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-md shadow-lg py-2 min-w-[160px] z-50">
          <Link href="/perfil" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors">
            Mi Perfil
          </Link>
          {(process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase()).includes(session.user?.email?.toLowerCase() || "") && (
            <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors">
              Panel Admin
            </Link>
          )}
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
          >
            Desconectar
          </button>
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { label: "HOMBRE", href: "/tienda?cat=hombre" },
  { label: "MUJER", href: "/tienda?cat=mujer" },
  { label: "NIÑOS", href: "/tienda?cat=ninos" },
  { label: "NUEVO Y EN TENDENCIA", href: "/tienda?cat=nuevo" },
];

type MenuColumn = { title: string; items: { label: string; href: string }[] };
type MenuContent = { columns: MenuColumn[]; ctaLabel: string; ctaHref: string } | { empty: true; message: string };

const megaMenus: Record<string, MenuContent> = {
  HOMBRE: {
    columns: [
      {
        title: "Camisetas",
        items: [
          { label: "Visitante 1986 Coca-Cola", href: "/producto/visitante-1986-hombre" },
          { label: "Adidas Local", href: "/producto/adidas-local-maroon" },
        ],
      },
      {
        title: "Polos",
        items: [
          { label: "Polo Retro Saprissa", href: "/producto/polo-retro-hombre" },
          { label: "Polo Modernista Saprissa", href: "/producto/polo-modernista-hombre" },
        ],
      },
      {
        title: "Estilo",
        items: [
          { label: "Retro", href: "/tienda?cat=hombre" },
          { label: "Oversize", href: "/tienda?cat=hombre" },
        ],
      },
    ],
    ctaLabel: "Ver Todo Hombre",
    ctaHref: "/tienda?cat=hombre",
  },
  MUJER: {
    columns: [
      {
        title: "Camisetas",
        items: [
          { label: "Camiseta Atemporal Blanca", href: "/producto/saprissa-mujer-retro" },
          { label: "Camiseta Atemporal Morada", href: "/producto/atemporal-morada-mujer" },
        ],
      },
      {
        title: "Polos Crop",
        items: [
          { label: "Polo Modernista Crop", href: "/producto/polo-modernista-crop-mujer" },
          { label: "Polo Retro Crop", href: "/producto/polo-retro-crop-mujer" },
        ],
      },
      {
        title: "Estilo",
        items: [
          { label: "Atemporales", href: "/tienda?cat=mujer" },
          { label: "Crop", href: "/tienda?cat=mujer" },
        ],
      },
    ],
    ctaLabel: "Ver Todo Mujer",
    ctaHref: "/tienda?cat=mujer",
  },
  "NIÑOS": {
    empty: true,
    message: "La colección para los más pequeños llega pronto.",
  },
  "NUEVO Y EN TENDENCIA": {
    columns: [
      {
        title: "Lo Más Nuevo",
        items: [
          { label: "Visitante 1986 Coca-Cola Hombre", href: "/producto/visitante-1986-hombre" },
          { label: "Visitante 1986 Coca-Cola Mujer", href: "/producto/visitante-1986-mujer" },
          { label: "Adidas Local", href: "/producto/adidas-local-maroon" },
          { label: "Camiseta Atemporal Morada", href: "/producto/atemporal-morada-mujer" },
        ],
      },
      {
        title: "Por Categoría",
        items: [
          { label: "Hombre", href: "/tienda?cat=hombre" },
          { label: "Mujer", href: "/tienda?cat=mujer" },
        ],
      },
    ],
    ctaLabel: "Ver Toda la Tienda",
    ctaHref: "/tienda",
  },
};

export default function Header() {
  const { data: session } = useSession();
  const { itemCount, setIsOpen } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const showTransparent = isHome && !scrolled && !hovered && !mobileOpen && !activeMenu;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="bg-black text-white text-[10px] md:text-[11px] font-light tracking-[0.15em] uppercase text-center py-2 border-b border-white/10">
        Envio gratis en pedidos mayores a ₡25 000
      </div>

      {/* Main nav + mega menu wrapper */}
      <div
        className={`transition-colors duration-300 border-b border-white/10 ${showTransparent ? "bg-transparent" : "bg-black"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActiveMenu(null); }}
      >
        <div className="flex items-center justify-between px-4 md:px-10 py-3">
          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white hover:text-gold transition-colors -ml-1 p-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo / Crest — centered on mobile, left on desktop */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 z-10">
            <Image
              src="/gladiador-logo.png"
              alt="Gladiador 16"
              width={44}
              height={44}
              className="md:w-[56px] md:h-[56px] w-11 h-11"
            />
          </Link>

          {/* Navigation — Adidas-style: bold, wider, centered desktop */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setActiveMenu(link.label)}
                className={`text-[13px] font-bold tracking-wide uppercase whitespace-nowrap transition-colors py-1 border-b-2 ${
                  activeMenu === link.label
                    ? "text-white border-gold"
                    : "text-white border-transparent hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons + CTA */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* Search — desktop only to keep mobile bar clean */}
            <button aria-label="Buscar" className="hidden md:block text-white hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Cart */}
            <button
              aria-label="Carrito"
              onClick={() => setIsOpen(true)}
              className="text-white hover:text-gold transition-colors relative"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User / Login */}
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-white text-xs font-light tracking-[0.15em] hover:text-gold transition-colors"
                >
                  Ingreso
                </Link>
                <Link
                  href="/registro"
                  className="bg-white text-black text-xs font-medium tracking-[0.1em] px-5 py-2 rounded-full hover:bg-white/80 transition-colors"
                >
                  Registro
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mega menu panel — desktop only, slides under the nav */}
        {activeMenu && megaMenus[activeMenu] && (
          <div className="hidden md:block bg-white text-black border-t border-black/10 shadow-xl">
            <div className="max-w-7xl mx-auto px-10 py-10">
              {"empty" in megaMenus[activeMenu] ? (
                <div className="py-6">
                  <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/40 mb-3">Próximamente</p>
                  <p className="text-base text-black/70">{(megaMenus[activeMenu] as { message: string }).message}</p>
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-10">
                  <div className="col-span-9 grid grid-cols-3 gap-10">
                    {(megaMenus[activeMenu] as { columns: MenuColumn[] }).columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-[11px] font-bold tracking-[0.25em] uppercase text-black mb-4">
                          {col.title}
                        </h3>
                        <ul className="space-y-2.5">
                          {col.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setActiveMenu(null)}
                                className="text-sm text-black/70 hover:text-black hover:underline transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-3 flex items-end">
                    <Link
                      href={(megaMenus[activeMenu] as { ctaHref: string }).ctaHref}
                      onClick={() => setActiveMenu(null)}
                      className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-black border-b-2 border-black pb-1 hover:text-maroon-light hover:border-maroon-light transition-colors"
                    >
                      {(megaMenus[activeMenu] as { ctaLabel: string }).ctaLabel}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[82%] max-w-sm bg-black border-r border-white/10 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <Image src="/gladiador-logo.png" alt="Gladiador 16" width={36} height={36} />
              <button
                aria-label="Cerrar menu"
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-3.5 text-white text-sm font-light tracking-[0.2em] uppercase hover:bg-white/5 hover:text-gold transition-colors border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {!session && (
              <div className="px-5 py-5 mt-auto border-t border-white/10 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="border border-white/30 text-white text-xs font-medium tracking-[0.15em] uppercase text-center py-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMobileOpen(false)}
                  className="bg-white text-black text-xs font-medium tracking-[0.15em] uppercase text-center py-3 rounded-full hover:bg-white/80 transition-colors"
                >
                  Crear Cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
