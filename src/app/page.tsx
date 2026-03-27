import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HistoryReveal from "@/components/HistoryReveal";
import Exclusivas from "@/components/Exclusivas";
import ProductGrid from "@/components/ProductGrid";
import NewArrivals from "@/components/NewArrivals";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <HistoryReveal />
        <Exclusivas />
        <NewArrivals />
      </main>
      <Footer />
    </>
  );
}
