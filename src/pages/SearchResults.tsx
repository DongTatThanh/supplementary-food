import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import ProductCard from '@/components/ui/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductsService from '@/services/products.service';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/api-client';
import PriceFilterproducts from '@/components/PriceFilterproducts';
import BrandFilter from '@/components/BrandFilter';
import { ProductSort } from '@/components/ProductSort';

const productsService = new ProductsService();

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const queryParam = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [brandId, setBrandId] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<string>('');
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setSearchTerm(queryParam);
    setPage(1); // Reset về trang 1 khi search term thay đổi
  }, [queryParam]);

  const fetchResults = useCallback(async () => {
    if (!queryParam.trim()) {
      setProducts([]);
      setError(null);
      setTotal(0);
      setTotalPages(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Map sort values từ ProductSort component sang backend format
      const sortMap: Record<string, string> = {
        priceAsc: 'price_asc',
        priceDesc: 'price_desc',
        nameAsc: 'name_asc',
        nameDesc: 'name_desc',
      };
      
      const sortValue = sort ? sortMap[sort] || '' : '';
      
      const result = await productsService.searchProducts({
        search: queryParam.trim(),
        brandId: brandId ?? undefined,
        priceMin: minPrice ?? undefined,
        priceMax: maxPrice ?? undefined,
        sort: sortValue || undefined,
        page,
        limit,
      });
      
      setProducts(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể tìm kiếm. Vui lòng thử lại.';
      setError(message);
      setProducts([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [queryParam, brandId, minPrice, maxPrice, sort, page, limit]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      toast({
        title: 'Vui lòng nhập từ khóa',
        description: 'Bạn chưa nhập nội dung tìm kiếm.',
        variant: 'destructive',
      });
      return;
    }

    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1); // Reset về trang 1 khi filter thay đổi
  };

  const handleBrandChange = (brand: number | null) => {
    setBrandId(brand);
    setPage(1); // Reset về trang 1 khi filter thay đổi
  };

  const handleSortChange = (sortParam: string) => {
    setSort(sortParam);
    setPage(1); // Reset về trang 1 khi sort thay đổi
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3"
        >
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nhập từ khóa cần tìm..."
            className="flex-1"
          />
          <Button type="submit" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Tìm kiếm
          </Button>
        </form>

        {queryParam && (
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Kết quả cho "{queryParam}"
            </h1>
            <p className="text-sm text-gray-500">
              {loading
                ? 'Đang tìm kiếm...'
                : total > 0
                ? `Tìm thấy ${total} sản phẩm`
                : 'Không tìm thấy kết quả nào'}
            </p>
          </div>
        )}

        {queryParam && (
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg p-4 sticky top-4 space-y-6">
                {/* Price Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Lọc theo giá</h3>
                  <PriceFilterproducts onChange={handlePriceChange} />
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Hãng sản xuất</h3>
                  <BrandFilter onChange={handleBrandChange} />
                </div>
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
                  {total > 0 && (
                    <span className="text-sm text-gray-600">
                      Trang {page} / {totalPages} ({total} sản phẩm)
                    </span>
                  )}
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="bg-white rounded-lg p-6 text-center text-red-600">
                  {error}
                </div>
              ) : products.length === 0 ? (
                <div className="bg-white rounded-lg p-6 text-center text-gray-600">
                  Không tìm thấy kết quả nào cho "{queryParam}". Bạn hãy thử từ khóa khác hoặc điều chỉnh bộ lọc nhé.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Trước
                      </button>
                      <span className="px-4 py-2 text-gray-700">
                        Trang {page} / {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        Sau
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {!queryParam && (
          <div className="bg-white rounded-lg p-8 text-center text-gray-600">
            <p>Vui lòng nhập từ khóa tìm kiếm để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

