import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import ProductCard from '@/components/ui/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchService, { SearchResultPayload } from '@/services/search.service';
import { useToast } from '@/hooks/use-toast';
import { getImageUrl } from '@/lib/api-client';

const searchService = new SearchService();

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const queryParam = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [results, setResults] = useState<SearchResultPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchTerm(queryParam);

    if (queryParam.trim()) {
      fetchResults(queryParam);
    } else {
      setResults(null);
      setError(null);
    }
  }, [queryParam]);

  const fetchResults = async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchService.search({
        query: keyword.trim(),
        limit: 24,
      });
      setResults(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Không thể tìm kiếm. Vui lòng thử lại.';
      setError(message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

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

  const hasResults =
    (results?.products && results.products.length > 0) ||
    (results?.categories && results.categories.length > 0) ||
    (results?.brands && results.brands.length > 0) ||
    (results?.stores && results.stores.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-8">
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
              Kết quả cho “{queryParam}”
            </h1>
            <p className="text-sm text-gray-500">
              {loading
                ? 'Đang tìm kiếm...'
                : hasResults
                ? 'Chúng tôi đã tìm thấy một số kết quả phù hợp'
                : 'Không tìm thấy kết quả nào'}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg p-6 text-center text-red-600">
            {error}
          </div>
        ) : queryParam && !hasResults ? (
          <div className="bg-white rounded-lg p-6 text-center text-gray-600">
            Không tìm thấy kết quả nào cho “{queryParam}”. Bạn hãy thử từ khóa khác nhé.
          </div>
        ) : (
          <>
            {results?.products && results.products.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Sản phẩm
                  </h2>
                  <span className="text-sm text-gray-500">
                  {results.products.length} sản phẩm
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {results.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}

            {results?.categories && results.categories.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">Danh mục</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {results.categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results?.brands && results.brands.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">Thương hiệu</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {results.brands.map((brand) => (
                    <Link
                      key={brand.id}
                      to={`/brand/${brand.id}`}
                      className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                    >
                      {brand.logo_url && (
                        <img
                          src={getImageUrl(brand.logo_url)}
                          alt={brand.name}
                          className="h-12 w-12 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {brand.name}
                        </h3>
                        {brand.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {brand.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results?.stores && results.stores.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">Cửa hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.stores.map((store, index) => (
                    <div
                      key={store.id || index}
                      className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {store.name}
                      </h3>
                      {store.address && (
                        <p className="text-sm text-gray-500 mt-1">
                          Địa chỉ: {store.address}
                        </p>
                      )}
                      {store.phone && (
                        <p className="text-sm text-gray-500">
                          Điện thoại: {store.phone}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

