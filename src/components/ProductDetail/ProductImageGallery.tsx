import { getImageUrl } from '@/lib/api-client';
import { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: string;
  onImageSelect: (image: string) => void;
  productName: string;
  discount?: number;
  isOnSale?: boolean;
  isBestseller?: boolean;
}

export const ProductImageGallery = ({
  images,
  selectedImage,
  onImageSelect,
  productName,
  discount = 0,
  isOnSale = false,
  isBestseller = false,
}: ProductImageGalleryProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  // Functions to navigate images
  const currentIndex = images.indexOf(selectedImage);
  
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onImageSelect(images[newIndex]);
  };
  
  const goToNext = () => {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      onImageSelect(images[newIndex]);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images, isLightboxOpen]);
  
  return (
    <>
      <div className="bg-white rounded-lg p-6">
        {/* Main Image */}
        <div className="relative mb-4 bg-gray-50 border rounded-lg p-8 group">
          {isOnSale && discount > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">-{discount}%</div>
                </div>
              </div>
            </div>
          )}
          
          {isBestseller && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-bold z-10">
              BEST SELLER
            </div>
          )}
          
          <img
            src={getImageUrl(selectedImage)}
            alt={productName}
            className="w-full h-[500px] object-contain cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                title="Ảnh trước"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110"
                title="Ảnh tiếp theo"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </>
          )}
          
          {/* Zoom button overlay */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            title="Xem ảnh phóng to"
          >
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
        </div>

      {/* Thumbnails - Gallery ảnh */}
      {images.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">
            Gallery ảnh: ({images.length} ảnh)
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => onImageSelect(img)}
                className={`border-2 rounded-lg p-1.5 hover:border-red-600 transition-all hover:shadow-md ${
                  selectedImage === img ? 'border-red-600 shadow-md ring-2 ring-red-200' : 'border-gray-200'
                }`}
                title={`Xem ảnh ${idx + 1}/${images.length}`}
              >
                <img
                  src={getImageUrl(img)}
                  alt={`${productName} - Ảnh ${idx + 1}`}
                  className="w-full h-14 sm:h-16 object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      )}
      </div>

      {/* Lightbox Modal - Xem ảnh phóng to */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Navigation arrows in lightbox */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                title="Ảnh trước"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                title="Ảnh tiếp theo"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
          
          <div className="max-w-6xl max-h-[90vh] w-full flex flex-col">
            {/* Main large image */}
            <div className="flex-1 flex items-center justify-center mb-4 relative">
              <img
                src={getImageUrl(selectedImage)}
                alt={productName}
                className="max-w-full max-h-[75vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* Thumbnail navigation in lightbox */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center overflow-x-auto pb-2 px-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onImageSelect(img);
                    }}
                    className={`flex-shrink-0 border-2 rounded-lg p-1 transition ${
                      selectedImage === img 
                        ? 'border-red-500 ring-2 ring-red-300' 
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`${productName} - Ảnh ${idx + 1}`}
                      className="w-16 h-16 object-contain bg-white/10 rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
