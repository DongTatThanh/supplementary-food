import { apiClient, Product, Category, Brand } from '@/lib/api-client';

export interface StoreLocation {
  id?: number;
  name: string;
  address?: string;
  phone?: string;
  hotline?: string;
  support_phone?: string;
  email?: string;
  opening_hours?: string;
  image?: string;
  map_link?: string;
  latitude?: number;
  longitude?: number;
  slug?: string;
}

export interface SearchResultPayload {
  products?: Product[];
  categories?: Category[];
  brands?: Brand[];
  stores?: StoreLocation[];
}

interface SearchEntityResponse<T> {
  data?: T[];
  total: number;
}

interface SearchApiResults {
  products?: SearchEntityResponse<Product>;
  categories?: SearchEntityResponse<Category>;
  brands?: SearchEntityResponse<Brand>;
  stores?: SearchEntityResponse<StoreLocation>;
  total?: number;
}

interface SearchApiResponse {
  success: boolean;
  query: string;
  limit: number;
  types: string[];
  results?: SearchApiResults;
}

export class SearchService {
  async search(options: {
    query: string;
    limit?: number;
    types?: Array<'products' | 'categories' | 'brands' | 'stores'>;
  }): Promise<SearchResultPayload> {
    const params = new URLSearchParams();
    params.append('q', options.query);

    if (options.limit) {
      params.append('limit', options.limit.toString());
    }

    if (options.types && options.types.length > 0) {
      params.append('types', options.types.join(','));
    }

    const queryString = params.toString();

    const response = await apiClient.get<SearchApiResponse>(`/api/search?${queryString}`);

    const payload = response.results ?? {};

    return {
      products: payload.products?.data ?? [],
      categories: payload.categories?.data ?? [],
      brands: payload.brands?.data ?? [],
      stores: payload.stores?.data ?? [],
    };
  }
}

export default SearchService;

