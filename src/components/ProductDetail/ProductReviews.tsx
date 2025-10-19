import { ProductReview } from '@/lib/api-client';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductReviewsProps {
  reviews?: ProductReview[];
}

export const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này</p>
      </div>
    );
  }

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-800">{averageRating}</div>
          <div className="flex items-center justify-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Number(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{reviews.length} đánh giá</p>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border rounded-lg p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">
                    U{review.user_id}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {review.is_verified_purchase === 1 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        ✓ Đã mua hàng
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-bold text-gray-800 text-lg mb-2">{review.title}</h4>
            <p className="text-gray-700 mb-4">{review.comment}</p>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-green-600"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Hữu ích
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-red-600"
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Không hữu ích
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
