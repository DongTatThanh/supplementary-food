import { useEffect, useState } from 'react';
import { Product, apiClient  } from '@/lib/api-client';
import ProductCard from './ui/ProductCard';
import { Category } from '../lib/api-client';
import { ShoppingBag } from 'lucide-react';


const AllCategoriesWithProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
      
        const response = await apiClient.get('/categories/all/with-products');

        // Lọc ra các danh mục có sản phẩm
        let categoriesData: Category[] = [];
        
        // API trả về array trực tiếp
        if (Array.isArray(response)) {
          categoriesData = response.filter((cat: Category) => cat.products && cat.products.length > 0);
        } else {
          categoriesData = [];
        }

        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải danh sách danh mục';
        setError(errorMessage);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

 

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center p-8">
            <p className="text-red-600 text-lg">Không có danh mục nào có sản phẩm</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-red-50">
      {categories.map((category, index) => (
        <section key={category.id} className="py-10">
          <div className="container mx-auto px-4">
            {/* Header danh mục */}
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="bg-red-600 h-10 w-1 rounded-full shadow-md"></div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-red-600" />
                  {category.name.toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  
                </p>
              </div>
              {/* Thanh nhấn bên phải */}
              
            </div>

            {/* Grid sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {category.products.slice(0, 10).map((product) => (
                <div
                  key={product.id}
                  className="transition-transform duration-200 hover:scale-[1.02]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Nút xem tất cả */}
            <div className="text-center mt-8">
              <button className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                <ShoppingBag size={18} />
                Xem tất cả {category.name}
                <span className="absolute inset-0 rounded-lg ring-2 ring-red-400/40 animate-pulse opacity-0 hover:opacity-100 transition-opacity"></span>
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AllCategoriesWithProducts;
