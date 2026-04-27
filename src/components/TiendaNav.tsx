import Link from "next/link";

const tabs = [
  { label: "LO NUEVO", href: "/tienda?cat=nuevo" },
  { label: "HOMBRE", href: "/tienda?cat=hombre" },
  { label: "MUJER", href: "/tienda?cat=mujer" },
  { label: "VER TODO", href: "/tienda" },
];

export default function TiendaNav() {
  return (
    <section className="bg-cream text-black py-6 md:py-8">
      <div className="flex justify-start md:justify-center gap-2 sm:gap-4 md:gap-6 px-4 md:px-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase px-3 sm:px-4 py-2 whitespace-nowrap shrink-0 text-gray-500 border border-transparent hover:border-black hover:text-black transition-colors"
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
