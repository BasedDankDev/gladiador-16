"use client";

import Image from "next/image";
import Link from "next/link";

export default function DeliveryBanner() {
  return (
    <section className="bg-white pt-6 md:pt-10 pb-2 md:pb-4">
      <div className="px-3 md:px-10">
        <div className="bg-[#7BC242] text-[#0E2A4F] rounded-sm overflow-hidden">
          <div className="flex flex-col items-center justify-center text-center px-4 md:px-10 py-10 md:py-24 gap-4 md:gap-6">
            <Image
              src="/correos-cr-logo.webp"
              alt="Correos de Costa Rica"
              width={260}
              height={84}
              className="object-contain h-10 md:h-20 w-auto bg-white px-4 md:px-6 py-2 md:py-3 rounded-sm"
              priority
            />

            <p className="text-[11px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase">
              Envío rápido a todo el país
            </p>

            <Link
              href="/tienda"
              className="group relative inline-block mt-1 md:mt-2"
            >
              <span className="absolute inset-0 translate-x-[4px] translate-y-[4px] md:translate-x-[5px] md:translate-y-[5px] bg-[#0E2A4F]" aria-hidden="true" />
              <span className="relative inline-flex items-center gap-2 md:gap-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-6 md:px-9 py-3 md:py-4 border border-black">
                Comprar Ahora
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="md:w-4 md:h-4">
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
