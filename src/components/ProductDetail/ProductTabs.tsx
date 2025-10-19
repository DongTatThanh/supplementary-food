import { ProductDetailData } from '@/lib/api-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductInfoTable } from './ProductInfoTable';
import { ProductReviews } from './ProductReviews';
import { Badge } from '@/components/ui/badge';

interface ProductTabsProps {
  product: ProductDetailData;
  selectedVariant: any;
}

export const ProductTabs = ({ product, selectedVariant }: ProductTabsProps) => {
  return (
    <div className="bg-white rounded-lg mt-8 overflow-hidden">
      <Tabs defaultValue="description" className="w-full">
        <div className="border-b px-6">
          <TabsList className="bg-transparent h-auto p-0 gap-8">
            <TabsTrigger 
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-red-600 py-4 px-2"
            >
              Mục lục nội dung
            </TabsTrigger>
            
            {product.ingredients && (
              <TabsTrigger 
                value="ingredients"
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-red-600 py-4 px-2"
              >
                Thành phần
              </TabsTrigger>
            )}
            
            {product.usage_instructions && (
              <TabsTrigger 
                value="usage"
                className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-red-600 py-4 px-2"
              >
                Hướng dẫn sử dụng
              </TabsTrigger>
            )}
            
            <TabsTrigger 
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-red-600 py-4 px-2"
            >
              Đánh giá ({product.reviews?.length || 0})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="description" className="mt-0">
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {product.description}
              </p>
              
              <ProductInfoTable product={product} selectedVariant={selectedVariant} />

              {product.warnings && (
                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                    ⚠️ Cảnh báo:
                  </h3>
                  <p className="text-gray-700">{product.warnings}</p>
                </div>
              )}
            </div>
          </TabsContent>

          {product.ingredients && (
            <TabsContent value="ingredients" className="mt-0">
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thành phần</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                  <p className="text-gray-700 leading-relaxed">{product.ingredients}</p>
                </div>
              </div>
            </TabsContent>
          )}

          {product.usage_instructions && (
            <TabsContent value="usage" className="mt-0">
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Hướng dẫn sử dụng</h3>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {product.usage_instructions}
                  </p>
                </div>
              </div>
            </TabsContent>
          )}

          <TabsContent value="reviews" className="mt-0">
            <ProductReviews reviews={product.reviews} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
