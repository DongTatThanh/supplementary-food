import { apiClient, Banner } from '@/lib/api-client';

export class BannerService {
  /**
   * Lấy banner theo ID
   */
  async getBannerById(id: number): Promise<Banner> {
    try {
      const response = await apiClient.get<Banner>(`/banners/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching banner by ID:', error);
      throw error;
    }
  }

  /**
   * Lấy tất cả banners
   */
  async getAllBanners(): Promise<Banner[]> {
    try {
      const response = await apiClient.get<Banner[]>('/banners');
      return response;
    } catch (error) {
      console.error('Error fetching all banners:', error);
      throw error;
    }
  }

  /**
   * Lấy banners active (is_active = 1)
   */
  async getActiveBanners(): Promise<Banner[]> {
    try {
      const response = await apiClient.get<Banner[]>('/banners?is_active=1');
      return response;
    } catch (error) {
      console.error('Error fetching active banners:', error);
      throw error;
    }
  }

  /**
   * Lấy banners theo vị trí (position)
   * @param position - 'homepage_hero', 'sidebar', 'footer', etc.
   */
  async getBannersByPosition(position: string): Promise<Banner[]> {
    try {
      const response = await apiClient.get<Banner[]>(`/banners?position=${position}`);
      return response;
    } catch (error) {
      console.error(`Error fetching banners for position ${position}:`, error);
      throw error;
    }
  }

  /**
   * Lấy banners active theo vị trí
   * @param position 
   */
  async getActiveBannersByPosition(position: string): Promise<Banner[]> {
    try {
      const response = await apiClient.get<Banner[]>(`/banners?position=${position}&is_active=1`);
      return response;
    } catch (error) {
      console.error(`Error fetching active banners for position ${position}:`, error);
      throw error;
    }
  }

  /**
   * Kiểm tra xem banner có đang trong thời gian hiển thị không
   */
  isBannerActive(banner: Banner): boolean {
    if (banner.is_active !== 1) return false;

    const now = new Date();
    
    if (banner.start_date) {
      const startDate = new Date(banner.start_date);
      if (now < startDate) return false;
    }

    if (banner.end_date) {
      const endDate = new Date(banner.end_date);
      if (now > endDate) return false;
    }

    return true;
  }

  /**
   * Lọc banners đang active và trong thời gian hiển thị
   */
  filterActiveBanners(banners: Banner[]): Banner[] {
    return banners.filter(banner => this.isBannerActive(banner));
  }
}
