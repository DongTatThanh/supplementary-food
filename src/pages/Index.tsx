import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandShowcase from "@/components/BrandShowcase";
import CategorySection from "@/components/CategorySection";
import KnowledgeSection from "@/components/KnowledgeSection";

import Footer from "@/components/Footer";
import DiscountCodeList from "@/components/DiscountCodeList";
import OnSaleProducts from "@/components/OnSaleProducts";

import AllCategoriesWithProducts from "@/components/AllCategoriesWithProducts";
import FlashSale from "@/components/FlashSale ";
import Banner from "@/components/Banner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      <Banner/>
      <DiscountCodeList />
      <FlashSale /> 
      
      {/* Sản phẩm khuyến mại */}

      
      {/* Tất cả danh mục với sản phẩm từ API */}
      <AllCategoriesWithProducts />
      
      {/* Sản phẩm theo category - Whey Protein (có thể comment nếu dùng AllCategoriesWithProducts) */}
      {/* <CategoryProducts 
        categoryId={1} 
        categoryName="Whey Protein"
        backgroundColor="bg-blue-900"
      /> */}
           <BrandShowcase />
      <CategorySection />
   
     
      <KnowledgeSection />
 
    </div>
  );
};

export default Index;