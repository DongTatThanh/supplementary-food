import { useEffect, useState } from 'react';
import { Product, apiClient  } from '@/lib/api-client';
import ProductCard from './ui/ProductCard';
import { Category } from '../lib/api-client';
import { useNavigate } from 'react-router-dom';


const AllCategoriesWithProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


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
   const handleCategoryClick = (categoryId: number) => {

    navigate(`/category/${categoryId}`);
    };

  return (
   
    <div className="w-full bg-gradient-to-b from-white to-red-50">
      {categories.map((category, index) => (
        <section key={category.id} className="py-10">
          <div className="container mx-auto px-4">
          {/* Header danh mục */}
          <div className="mb-6">
            <div onClick={() => handleCategoryClick(category.id)} className="cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-600 h-8 w-1 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {category.name.toUpperCase()}
                </h2>
            </div>
            {/* Đường kẻ đỏ dưới text */}
            <div className="h-[2px] bg-red-600 w-full"></div>
          </div>          
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
            </div>



            {/* Nút xem tất cả */}
            <div className="text-center mt-8">
            <div onClick={() => handleCategoryClick(category.id)} className="inline-block cursor-pointer">
               <button className="bg-red-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-red-700 transition-colors border-destructive">
                Xem Thêm 
              </button>
            </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AllCategoriesWithProducts;
