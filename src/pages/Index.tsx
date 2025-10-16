import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromoBanner from "@/components/PromoBanner";
import BrandShowcase from "@/components/BrandShowcase";
import CategorySection from "@/components/CategorySection";
import KnowledgeSection from "@/components/KnowledgeSection";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import DiscountCodeList from "@/components/DiscountCodeList";
import ProductCard from "@/components/ui/ProductCard";
import OnSaleProducts from "@/components/OnSaleProducts";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header /> 
      <HeroSection />
      {/* Deal banners */}
      <DiscountCodeList />

      
      <OnSaleProducts />
      <CategorySection />
      <BrandShowcase />
 
      <KnowledgeSection />
      <Footer />
    </div>
  );
};

export default Index;
