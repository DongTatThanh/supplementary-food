import { getImageUrl } from '@/lib/api-client';

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
  return (
    <div className="bg-white rounded-lg p-6">
      {/* Main Image */}
      <div className="relative mb-4 bg-gray-50 border rounded-lg p-8">
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
          className="w-full h-[500px] object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onImageSelect(img)}
              className={`border-2 rounded-lg p-2 hover:border-red-600 transition ${
                selectedImage === img ? 'border-red-600' : 'border-gray-200'
              }`}
            >
              <img
                src={getImageUrl(img)}
                alt={`${productName} ${idx + 1}`}
                className="w-full h-16 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
