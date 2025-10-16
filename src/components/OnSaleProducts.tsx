import { useEffect, useState } from 'react';
import { Product } from '@/lib/api-client';
import { ProductsService } from '@/services/products.service';
import ProductCard from './ui/ProductCard';
import { Clock } from 'lucide-react';

const productService = new ProductsService();

const OnSaleProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOnSaleProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching on-sale products...');
        
        const response = await productService.getOnSaleProducts();
        console.log('On-sale products:', response);
        
        setProducts(response);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching on-sale products:', err);
        setError(err.message || 'Không thể tải danh sách sản phẩm khuyến mại');
      } finally {
        setLoading(false);
      }
    };

    fetchOnSaleProducts();
  }, []);

  if (loading) {
    return (
      <section className="bg-blue-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
            <span className="ml-4 text-white text-lg">Đang tải sản phẩm khuyến mại...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-blue-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
              <p className="text-red-600 font-medium">⚠️ {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="text-red-600 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center p-8">
            <p className="text-white text-lg">Hiện không có sản phẩm khuyến mại nào</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-gradient-to-r from-red-500 to-red-500 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            SẢN PHẨM KHUYẾN MÃI
          </h2>
          <div className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg">
            <Clock className="h-5 w-5" />
            <div className="text-center">
              <p className="text-xs">Kết thúc trong</p>
              <p className="text-lg font-bold">0d 0h 0m 0s</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Xem tất cả
          </button>
        </div>
      </div>
    </section>
  );
};

export default OnSaleProducts;