"use client";

import Image from "next/image";
import Link from "next/link";

export default function DeliveryBanner() {
  return (
    <section className="bg-white pt-10 pb-4">
      <div className="px-4 md:px-10">
        <div className="bg-[#7BC242] text-[#0E2A4F] rounded-sm overflow-hidden">
          <div className="flex flex-col items-center justify-center text-center px-6 md:px-10 py-16 md:py-24 gap-6">
            <Image
              src="/correos-cr-logo.webp"
              alt="Correos de Costa Rica"
              width={260}
              height={84}
              className="object-contain h-14 md:h-20 w-auto bg-white px-6 py-3 rounded-sm"
              priority
            />

            <p className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
              Envío rápido a todo el país
            </p>

            <Link
              href="/tienda"
              className="group relative inline-block mt-2"
            >
              <span className="absolute inset-0 translate-x-[5px] translate-y-[5px] bg-[#0E2A4F]" aria-hidden="true" />
              <span className="relative inline-flex items-center gap-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase px-9 py-4 border border-black">
                Comprar Ahora
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
