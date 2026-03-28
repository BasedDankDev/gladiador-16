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

  const initial = session.user?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-maroon-light rounded-full flex items-center justify-center text-xs font-bold text-white">
          {initial}
        </div>
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
    </header>
  );
}
