import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const VALID_TABS = ["nuevo", "hombre", "mujer", "todos"];

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const initialTab = cat && VALID_TABS.includes(cat) ? cat : "todos";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-28 md:pt-32">
        <div className="px-4 sm:px-6 md:px-16 mb-2">
          <p className="text-[10px] sm:text-[11px] font-bold text-black/40 uppercase tracking-[0.3em] mb-2">
            Coleccion 2026
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic text-black tracking-tight leading-none">
            Tienda
          </h1>
        </div>
        <ProductGrid initialTab={initialTab} />
      </main>
      <Footer />
    </>
  );
}
