import { apiClient, BlogCategory, BlogPost } from "@/lib/api-client";

export class PostService {
  private normalizeList<T>(payload: any): T[] {
    if (Array.isArray(payload)) {
      return payload;
    }
    if (payload?.data && Array.isArray(payload.data)) {
      return payload.data as T[];
    }
    return [];
  }

  // lấy các blog nổi bật
  async getFeaturedPosts(): Promise<BlogPost[]> {
    const response = await apiClient.get<any>("/posts/featured");
    return this.normalizeList<BlogPost>(response);
  }

  // lấy tất cả danh mục của blog
  async getAllBlogCategories(): Promise<BlogCategory[]> {
    const response = await apiClient.get<any>("/posts/blog/categories");
    return this.normalizeList<BlogCategory>(response);
  }

  async getBlogCategoryBySlug(slug: string): Promise<BlogCategory> {
    return apiClient.get<BlogCategory>(`/posts/blog/categories/slug/${slug}`);
  }

  async getBlogCategoryById(id: number): Promise<BlogCategory> {
    return apiClient.get<BlogCategory>(`/posts/blog/categories/id/${id}`);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    return apiClient.get<BlogPost>(`/posts/slug/${slug}`);
  }

  async getBlogPostById(id: number): Promise<BlogPost> {
    return apiClient.get<BlogPost>(`/posts/id/${id}`);
  }

  async getPostsByCategory(
    categoryId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<BlogPost[]> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const response = await apiClient.get<any>(
      `/posts/category/${categoryId}?${params}`
    );
    return this.normalizeList<BlogPost>(response);
  }

  async getAllBlogPosts(page: number = 1, limit: number = 10): Promise<BlogPost[]> {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const response = await apiClient.get<any>(`/posts?${params}`);
    return this.normalizeList<BlogPost>(response);
  }
}