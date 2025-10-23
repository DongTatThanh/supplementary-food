import { useState, useEffect } from 'react';
import { BannerService } from '@/services/banner.service';
import { Banner, getImageUrl } from '@/lib/api-client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerService = new BannerService();

const HeroBanner = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        // Lấy banners cho homepage hero
        const data = await bannerService.getActiveBannersByPosition('homepage_hero');
        
        // Lọc banners đang trong thời gian hiển thị
        const activeBanners = bannerService.filterActiveBanners(data);
        
        // Sort theo sort_order
        const sortedBanners = activeBanners.sort((a, b) => 
          (a.sort_order || 0) - (b.sort_order || 0)
        );
        
        setBanners(sortedBanners);
      } catch (error) {
        console.error('Error loading banners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto slide
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // Chuyển slide mỗi 5 giây

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleBannerClick = (banner: Banner) => {
    if (banner.link_url) {
      if (banner.link_target === '_blank') {
        window.open(banner.link_url, '_blank');
      } else {
        window.location.href = banner.link_url;
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
      <div className="container mx-auto px-4 py-4">
        <div className="relative w-full h-[50px] md:h-[700px] overflow-hidden rounded-lg group">
        {/* Banners */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full h-full relative cursor-pointer"
              onClick={() => handleBannerClick(banner)}
            >
              <img
                src={getImageUrl(banner.image_url)}
                alt={banner.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-banner.jpg';
                }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        </div>
      </div>
    );
  };

  export default HeroBanner;
