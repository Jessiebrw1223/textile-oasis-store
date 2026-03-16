import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import B2BSection from "@/components/B2BSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <CategoriesSection />
      <FeaturedProducts />
      <B2BSection />
      <Footer />
    </div>
  );
};

export default Index;
