import { useEffect, useState } from 'react';
import { BannersResponse,  Product, apiClient } from '@/lib/api-client';
import ProductCard from '../components/ui/ProductCard';
import { Category } from '../lib/api-client';
import { useParams } from 'react-router-dom';
import { Ban } from 'lucide-react';
import Banner from '@/components/Banner';






import PriceFilterproducts from '../components/PriceFilterproducts'
import PriceRangesService from '@/services/priceRanges.service';

const ProductByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const { id } = useParams<{ id: string }>();
  
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const priceRangesService = new PriceRangesService();

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<Category>(`/categories/${id}/products`);

        setCategory(response);

        let productsData: Product[] = [];
        if (response?.products && Array.isArray(response.products)) {
          productsData = response.products;
        }
        setProducts(productsData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải sản phẩm';
        setError(errorMessage);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProducts();
  }, [id]);




  const handlePriceChange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
    // Fetch filtered products from backend
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const products = await priceRangesService.getProductsByCategory(id, min ?? undefined, max ?? undefined);
        setProducts(products);
        setError(null);
      } catch (err) {
        console.error('Error fetching filtered products:', err);
        setError('Không thể tải sản phẩm theo filter');
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">
          Sản phẩm: {category?.name || 'Danh mục không xác định'}
        </h2>

        <div className='mb-8'>
          <Banner />
        </div>

        {/* Layout với Sidebar */}
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Giá</h3>
              <aside className="col-span-1 bg-white p-4 rounded-lg shadow">
                <PriceFilterproducts onChange={handlePriceChange} />
              </aside>

            </div>
        </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">Sắp xếp:</span>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    Tên A → Z
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    Tên Z → A
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    Giá tăng dần
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors">
                    Giá giảm dần
                  </button>
                  <button className="px-4 py-2 text-sm border-2 border-blue-500 bg-blue-50 text-blue-600 rounded-md font-medium">
                    Hàng mới
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
