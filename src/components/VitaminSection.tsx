import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const VitaminSection = () => {
  const vitamins = [
    {
      id: "v1",
      name: "Californium Magnesium Zinc 3000mg",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop&crop=center",
      originalPrice: 949000,
      salePrice: 729000,
      rating: 4.9,
      reviews: 87,
      brand: "Californium"
    },
    {
      id: "v2", 
      name: "NOW Magnesium Glycinate 400",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop&crop=center",
      originalPrice: 919000,
      salePrice: 799000,
      rating: 4.8,
      reviews: 124,
      brand: "NOW Foods",
      isFreeShip: true
    },
    {
      id: "v3",
      name: "Doctor's Best High Absorption Magnesium",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop&crop=center",
      originalPrice: 890000,
      salePrice: 729000,
      rating: 4.7,
      reviews: 156,
      brand: "Doctor's Best"
    },
    {
      id: "v4",
      name: "Natural Magnesium Malate 1500mg",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop&crop=center",
      originalPrice: 680000,
      salePrice: 549000,
      rating: 4.6,
      reviews: 89,
      brand: "Natural Factors",
      isFreeShip: true
    },
    {
      id: "v5",
      name: "Nutritional Magnesium Glycinate",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop&crop=center",
      originalPrice: 560000,
      salePrice: 449000,
      rating: 4.8,
      reviews: 203,
      brand: "Nutritional"
    }
  ];

  const categories = ["Magnesium", "Vitamin D3 K2", "Vitamin C Tổng Hợp", "Zinc", "Vitamin E", "ZMA"];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">TỔNG HỢP</h2>
          <h3 className="text-2xl font-bold mb-2">VITAMIN & KHOÁNG CHẤT</h3>
          <p className="text-green-100 mb-4">CHÍNH HÃNG 100%</p>
          <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
            MUA NGAY
          </Button>
        </div>

        <h2 className="text-2xl font-bold mb-6">VITAMIN & KHOÁNG CHẤT</h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant={index === 0 ? "destructive" : "outline"} 
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {vitamins.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Xem thêm sản phẩm
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VitaminSection;