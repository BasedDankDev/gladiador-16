import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Exclusivas from "@/components/Exclusivas";
import ShopByCategory from "@/components/ShopByCategory";
import NewArrivals from "@/components/NewArrivals";
import MujerSection from "@/components/MujerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NewArrivals />
        <MujerSection />
        <Exclusivas />
        <ShopByCategory />
      </main>
      <Footer />
    </>
  );
}
