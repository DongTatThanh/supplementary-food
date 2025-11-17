import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brand, Product, apiClient, getImageUrl } from '@/lib/api-client';
import ProductCard from '@/components/ui/ProductCard';
import PriceFilterproducts from '@/components/PriceFilterproducts';
import { ProductSort } from '@/components/ProductSort';
import RecentlyViewedProducts from '@/components/RecentlyViewedProducts';
import BrandService from '@/services/brand.service';

const BrandProducts = () => {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const brandService = new BrandService();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const brandId = parseInt(id, 10);
        
        // Lấy sản phẩm với filters (có thể bao gồm cả brand info)
        const response = await brandService.getBrandProducts(brandId, {
          page,
          limit,
          status: 'active',
          minPrice: minPrice ?? undefined,
          maxPrice: maxPrice ?? undefined,
          sortBy: sort,
          sortOrder,
        });

        // Xử lý response - có thể là { brand, products, pagination } hoặc { data: { brand, products, pagination } }
        const responseData = (response as any).data || response;
        
        if (responseData.brand) {
          setBrand(responseData.brand);
        } else {
          // Nếu không có brand trong response, lấy riêng
          const brandData = await brandService.getBrandById(brandId);
          setBrand(brandData);
        }

        if (responseData.products && Array.isArray(responseData.products)) {
          setProducts(responseData.products);
        } else {
          setProducts([]);
        }

        if (responseData.pagination) {
          setTotalPages(responseData.pagination.totalPages || 1);
        } else {
          // Tính totalPages từ số lượng products nếu không có pagination
          setTotalPages(1);
        }

        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Không thể tải dữ liệu';
        setError(errorMessage);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page, minPrice, maxPrice, sort, sortOrder]);

  const handlePriceChange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1); // Reset về trang đầu khi filter
  };

  const handleSortChange = (sortParam: string) => {
    // Map sortParam từ frontend sang backend
    const sortMap: Record<string, { sortBy: string; sortOrder: 'ASC' | 'DESC' }> = {
      priceAsc: { sortBy: 'price', sortOrder: 'ASC' },
      priceDesc: { sortBy: 'price', sortOrder: 'DESC' },
      nameAsc: { sortBy: 'name', sortOrder: 'ASC' },
      nameDesc: { sortBy: 'name', sortOrder: 'DESC' },
      newest: { sortBy: 'created_at', sortOrder: 'DESC' },
      oldest: { sortBy: 'created_at', sortOrder: 'ASC' },
    };

    const mapped = sortMap[sortParam] || { sortBy: 'created_at', sortOrder: 'DESC' };
    setSort(mapped.sortBy);
    setSortOrder(mapped.sortOrder);
    setPage(1);
  };

  if (loading && !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error && !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy thương hiệu</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Brand Header */}
        {brand && (
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-6">
              {brand.logo_url && (
                <img
                  src={getImageUrl(brand.logo_url)}
                  alt={brand.name}
                  className="h-24 w-24 object-contain"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{brand.name}</h1>
                {brand.description && (
                  <p className="text-gray-600">{brand.description}</p>
                )}
                {brand.country && (
                  <p className="text-sm text-gray-500 mt-2">
                    Xuất xứ: {brand.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Layout với Sidebar */}
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Lọc theo giá</h3>
              <PriceFilterproducts onChange={handlePriceChange} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm font-semibold text-gray-700">Sắp xếp:</span>
                  <ProductSort onChange={handleSortChange} />
                </div>
                {products.length > 0 && (
                  <span className="text-sm text-gray-600">
                    Hiển thị {products.length} sản phẩm
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-red-600">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPage(prev => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Trước
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                      Trang {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Recently Viewed Products */}
        <RecentlyViewedProducts />
      </div>
    </div>
  );
};

export default BrandProducts;

