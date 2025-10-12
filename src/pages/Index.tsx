import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromoBanner from "@/components/PromoBanner";
import BrandShowcase from "@/components/BrandShowcase";
import CategorySection from "@/components/CategorySection";
import KnowledgeSection from "@/components/KnowledgeSection";
import VitaminSection from "@/components/VitaminSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection />
      
      {/* Deal banners */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
                <div className="text-sm font-bold mb-1">NHẬT BẢN GIẢM</div>
                <div className="text-lg font-bold">ĐẾN 50%</div>
                <div className="text-xs mt-1">Thực phẩm bổ sung Nhật Bản chính hãng</div>
                <Button size="sm" variant="secondary" className="mt-2 bg-white text-primary hover:bg-gray-100">
                  Mua ngay
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

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
