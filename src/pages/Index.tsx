import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromoBanner from "@/components/PromoBanner";
import ProductCard from "@/components/ProductCard";
import BrandShowcase from "@/components/BrandShowcase";
import CategorySection from "@/components/CategorySection";
import KnowledgeSection from "@/components/KnowledgeSection";
import VitaminSection from "@/components/VitaminSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductService, Product } from "@/services/product.service";

const Index = () => {
  const [wheyProducts, setWheyProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('bestseller');

  // Fetch Whey Protein products from API với filter
  const fetchWheyProducts = async (filter = 'bestseller') => {
    try {
      setLoading(true);
      console.log('Fetching Whey Protein products with filter:', filter);
      
      let sortBy: 'name' | 'price' | 'created_at' | 'rating' = 'created_at';
      let sortOrder: 'asc' | 'desc' = 'desc';
      let filterOptions: any = {
        search: 'whey protein',
        status: 'active',
        limit: 10
      };

      // Apply filter logic
      switch (filter) {
        case 'bestseller':
          filterOptions.is_bestseller = true;
          sortBy = 'created_at';
          break;
        case 'popular':
          sortBy = 'rating';
          sortOrder = 'desc';
          break;
        case 'newest':
          sortBy = 'created_at';
          sortOrder = 'desc';
          break;
        case 'high_rating':
          sortBy = 'rating';
          sortOrder = 'desc';
          break;
        case 'price_asc':
          sortBy = 'price';
          sortOrder = 'asc';
          break;
      }

      filterOptions.sort_by = sortBy;
      filterOptions.sort_order = sortOrder;

      // Gọi API với filter cho Whey Protein - updated for new response format
      const response = await ProductService.getProducts(filterOptions);
      
      // ProductService.getProducts now returns { products: Product[], meta: PaginationMeta }
      if (response.products && response.products.length > 0) {
        console.log('API Response:', response.products);
        setWheyProducts(response.products);
        setError(null);
      } else {
        console.log('No products found, using mock data');
        setWheyProducts(mockProducts);
      }
    } catch (error: any) {
      console.error('Error fetching whey products:', error);
      setError(error.message);
      // Fallback to mock data nếu API lỗi
      setWheyProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    fetchWheyProducts(filter);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchWheyProducts(currentFilter);
  }, []);

  // Mock data as fallback - formatted to match Product interface
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "NutraBio 100% Whey Protein Isolate Chocolate",
      slug: "nutrabio-whey-protein-chocolate",
      price: 1990000,
      compare_price: 2390000,
      inventory_quantity: 50,
      featured_image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop&crop=center",
      is_featured: true,
      is_new_arrival: false,
      is_bestseller: true,
      is_on_sale: true,
      status: 'active' as const,
      brand_name: "NutraBio",
      avg_rating: 4.8,
      review_count: 127,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Serious Isomass Whey Protein Isolate 5.5kg",
      slug: "serious-mass-whey-protein-isolate",
      price: 2990000,
      compare_price: 3500000,
      inventory_quantity: 30,
      featured_image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=300&fit=crop&crop=center",
      is_featured: true,
      is_new_arrival: false,
      is_bestseller: true,
      is_on_sale: true,
      status: 'active' as const,
      brand_name: "Serious Mass",
      avg_rating: 4.9,
      review_count: 89,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

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

      {/* Product section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">WHEY PROTEIN</h2>
            <div className="flex gap-2">
              <Button 
                variant={currentFilter === 'bestseller' ? "destructive" : "outline"} 
                size="sm"
                onClick={() => handleFilterChange('bestseller')}
              >
                Bán chạy
              </Button>
              <Button 
                variant={currentFilter === 'popular' ? "destructive" : "outline"} 
                size="sm"
                onClick={() => handleFilterChange('popular')}
              >
                Phổ biến
              </Button>
              <Button 
                variant={currentFilter === 'newest' ? "destructive" : "outline"} 
                size="sm"
                onClick={() => handleFilterChange('newest')}
              >
                Mới nhất
              </Button>
              <Button 
                variant={currentFilter === 'high_rating' ? "destructive" : "outline"} 
                size="sm"
                onClick={() => handleFilterChange('high_rating')}
              >
                Đánh giá cao
              </Button>
              <Button 
                variant={currentFilter === 'price_asc' ? "destructive" : "outline"} 
                size="sm"
                onClick={() => handleFilterChange('price_asc')}
              >
                Giá tăng dần
              </Button>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Đang tải sản phẩm...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8 text-red-600">
              <p>Lỗi khi tải sản phẩm: {error}</p>
              <p className="text-sm text-gray-600 mt-2">Hiển thị dữ liệu mẫu</p>
            </div>
          )}

          {/* Products grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {wheyProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  name={product.name}
                  image={product.featured_image || "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop&crop=center"}
                  originalPrice={product.compare_price || product.price}
                  salePrice={product.price}
                  rating={product.avg_rating || 0}
                  reviews={product.review_count || 0}
                  brand={product.brand_name || "Unknown"}
                  isFreeShip={product.price >= 1500000}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Xem thêm sản phẩm
            </Button>
          </div>
        </div>
      </section>

      <VitaminSection />
      <KnowledgeSection />
      <Footer />
    </div>
  );
};

export default Index;
