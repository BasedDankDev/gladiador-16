import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedGrid from "@/components/FeaturedGrid";
import DeliveryBanner from "@/components/DeliveryBanner";
import RelatedResources from "@/components/RelatedResources";
import StillInterested from "@/components/StillInterested";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedGrid />
        <StillInterested />
        <DeliveryBanner />
        <RelatedResources />
      </main>
      <Footer />
    </>
  );
}
