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
      throw error;
    }
  }

  /**
   * Lấy banners theo vị trí (position)
   * @param position - 'homepage_hero', 'sidebar', 'footer', etc.
   */
  async getBannersByPosition(position: string): Promise<Banner[]> {
    try {
      // Dùng query param vì endpoint /banners/position/:position có thể không hỗ trợ
      const response = await apiClient.get<Banner[]>(`/banners?position=${encodeURIComponent(position)}`);
      
      // Xử lý response có thể là array hoặc object với data property
      let banners: Banner[] = [];
      if (Array.isArray(response)) {
        banners = response;
      } else if (response && typeof response === 'object' && 'data' in response) {
        banners = Array.isArray((response as any).data) ? (response as any).data : [];
      }
      
      return banners;
    } catch (error: any) {
      // Nếu query param không work, thử endpoint /banners/position/:position (không có query)
      if (error.message?.includes('400') || error.message?.includes('Bad Request')) {
        try {
          const response = await apiClient.get<Banner[]>(`/banners/position/${encodeURIComponent(position)}`);
          if (Array.isArray(response)) {
            return response;
          }
          if (response && typeof response === 'object' && 'data' in response) {
            return Array.isArray((response as any).data) ? (response as any).data : [];
          }
        } catch (fallbackError) {
          // Ignore fallback error
        }
      }
      return [];
    }
  }

  /**
   * Lấy banners active theo vị trí
   * @param position 
   */
  async getActiveBannersByPosition(position: string): Promise<Banner[]> {
    try {
      // Dùng query param với is_active=1
      const response = await apiClient.get<Banner[]>(`/banners?position=${encodeURIComponent(position)}&is_active=1`);
      
      // Xử lý response có thể là array hoặc object với data property
      let banners: Banner[] = [];
      if (Array.isArray(response)) {
        banners = response;
      } else if (response && typeof response === 'object' && 'data' in response) {
        banners = Array.isArray((response as any).data) ? (response as any).data : [];
      }
      
      // Filter thêm ở client side để đảm bảo chỉ lấy active banners
      return banners.filter(banner => banner.is_active === 1);
    } catch (error: any) {
      // Nếu query param với is_active không work, thử không có is_active và filter ở client
      if (error.message?.includes('400') || error.message?.includes('Bad Request')) {
        try {
          // Thử endpoint /banners/position/:position (không có query params)
          const response = await apiClient.get<Banner[]>(`/banners/position/${encodeURIComponent(position)}`);
          let banners: Banner[] = [];
          if (Array.isArray(response)) {
            banners = response;
          } else if (response && typeof response === 'object' && 'data' in response) {
            banners = Array.isArray((response as any).data) ? (response as any).data : [];
          }
          // Filter active banners ở client side
          return banners.filter(banner => banner.is_active === 1);
        } catch (fallbackError) {
          // Nếu vẫn fail, thử query param không có is_active
          try {
            const response = await apiClient.get<Banner[]>(`/banners?position=${encodeURIComponent(position)}`);
            let banners: Banner[] = [];
            if (Array.isArray(response)) {
              banners = response;
            } else if (response && typeof response === 'object' && 'data' in response) {
              banners = Array.isArray((response as any).data) ? (response as any).data : [];
            }
            // Filter active banners ở client side
            return banners.filter(banner => banner.is_active === 1);
          } catch (finalError) {
            return [];
          }
        }
      }
      return [];
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
export const bannerService = new BannerService();