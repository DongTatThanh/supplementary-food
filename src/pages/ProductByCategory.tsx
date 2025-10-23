import { useEffect, useState } from 'react';
import { BannersResponse, Product, apiClient } from '@/lib/api-client';
import ProductCard from '../components/ui/ProductCard';
import { Category } from '../lib/api-client';
import { useParams } from 'react-router-dom';
import { Ban } from 'lucide-react';
import Banner from '@/components/Banner';

const ProductByCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const { id } = useParams<{ id: string }>();

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
  if (!products.length) {
    return (
      <div className="w-full py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-lg">Không có sản phẩm trong danh mục này</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">
          Sản phẩm trong danh mục: {category?.name || 'Danh mục không xác định'}
        </h2>
        <div className='mt-8 mb-12'>
        <Banner />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
