import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromoBanner from "@/components/PromoBanner";
import BrandShowcase from "@/components/BrandShowcase";
import CategorySection from "@/components/CategorySection";
import KnowledgeSection from "@/components/KnowledgeSection";
import VitaminSection from "@/components/VitaminSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import DiscountCodeList from "@/components/DiscountCodeList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />
      
      {/* Deal banners */}
      <DiscountCodeList />
      
      <PromoBanner />
      <CategorySection />
      <BrandShowcase />
      <VitaminSection />
      <KnowledgeSection />
      <Footer />
    </div>
  );
};

export default Index;
