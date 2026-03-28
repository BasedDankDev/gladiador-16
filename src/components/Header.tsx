"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

function UserDropdown({ session }: { session: { user?: { name?: string | null; email?: string | null } } }) {
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

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Cuenta"
        onClick={() => setOpen(!open)}
        className="text-gold hover:text-white transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-[#111] border border-white/10 py-2 px-4 min-w-[160px] z-50">
          <p className="text-xs text-white/60 mb-2 truncate">{session.user?.name}</p>
          <Link href="/perfil" onClick={() => setOpen(false)} className="block text-xs text-white/80 hover:text-gold py-1 transition-colors">
            Mi perfil
          </Link>
          <Link href="/pedidos" onClick={() => setOpen(false)} className="block text-xs text-white/80 hover:text-gold py-1 transition-colors">
            Mis pedidos
          </Link>
          <button
            onClick={() => signOut()}
            className="block text-xs text-white/80 hover:text-red-400 py-1 transition-colors w-full text-left"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { label: "INICIO", href: "/" },
  { label: "TIENDA", href: "/#productos" },
  { label: "MUJER", href: "/#productos" },
  { label: "HOMBRE", href: "/#productos" },
  { label: "CONTACTO", href: "/#productos" },
];

export default function Header() {
  const { data: session } = useSession();
  const { itemCount, setIsOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo / Crest */}
        <Link href="/" className="relative z-10">
          <Image
            src="/cool-s-logo.svg"
            alt="Gladiador 16"
            width={28}
            height={38}
            className="invert"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white text-xs font-light tracking-[0.25em] uppercase hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right icons + CTA */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button aria-label="Buscar" className="text-white hover:text-gold transition-colors">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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

          {/* CTA Button */}
          {session ? (
            <Link
              href="/perfil"
              className="hidden md:block bg-maroon-light text-white text-xs font-light tracking-[0.2em] uppercase px-6 py-2.5 border border-maroon-light hover:bg-transparent hover:border-white transition-all"
            >
              MI PERFIL
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden md:block bg-maroon-light text-white text-xs font-light tracking-[0.2em] uppercase px-6 py-2.5 border border-maroon-light hover:bg-transparent hover:border-white transition-all"
            >
              INICIAR SESIÓN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
