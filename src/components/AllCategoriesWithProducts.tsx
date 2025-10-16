import { useEffect, useState } from 'react';
import { Product, apiClient } from '@/lib/api-client';
import ProductCard from './ui/ProductCard';

interface Category {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

const AllCategoriesWithProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Màu nền cho các danh mục (xoay vòng các màu)
  const backgroundColors = [
    'bg-blue-900',
    'bg-purple-900',
    'bg-indigo-900',
    'bg-slate-800',
    'bg-cyan-900',
    'bg-teal-900',
  ];

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
        console.log('Fetching all categories with products...');

        const response = await apiClient.get('/categories/all/with-products');

        console.log('All categories response:', response);

        // Lọc ra các danh mục có sản phẩm
        let categoriesData: Category[] = [];
        
        // API trả về array trực tiếp
        if (Array.isArray(response)) {
          categoriesData = response.filter((cat: Category) => cat.products && cat.products.length > 0);
        } else {
          console.warn('Response is not an array:', response);
          categoriesData = [];
        }

        console.log('Filtered categories:', categoriesData);
        setCategories(categoriesData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching all categories:', err);
        setError(err.message || 'Không thể tải danh sách danh mục');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-900 border-t-transparent"></div>
            <span className="ml-4 text-blue-900 text-lg font-semibold">Đang tải danh mục...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
              <p className="text-red-600 font-medium">⚠️ {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center p-8">
            <p className="text-gray-600 text-lg">Không có danh mục nào có sản phẩm</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {categories.map((category, index) => (
        <section
          key={category.id}
          className={`${backgroundColors[index % backgroundColors.length]} py-8`}
        >
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className={`flex items-center justify-between mb-6 p-4 rounded-lg bg-opacity-50 bg-black`}>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">📦</span>
                {category.name.toUpperCase()}
              </h2>
              <p className="text-white text-sm font-semibold bg-black/30 px-4 py-2 rounded-full">
                {category.products.length} sản phẩm
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-6">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Xem tất cả {category.name}
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AllCategoriesWithProducts;
