import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Exclusivas from "@/components/Exclusivas";
import ShopByCategory from "@/components/ShopByCategory";
import HombreSection from "@/components/HombreSection";
import MujerSection from "@/components/MujerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <HombreSection />
        <MujerSection />
        <Exclusivas />
        <ShopByCategory />
      </main>
      <Footer />
    </>
  );
}
