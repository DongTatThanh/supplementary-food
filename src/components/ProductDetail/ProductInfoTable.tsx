import { ProductDetailData, ProductVariant, ProductAttribute } from '@/lib/api-client';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

interface ProductInfoTableProps {
  product: ProductDetailData;
  selectedVariant: ProductVariant | null;
}

export const ProductInfoTable = ({ product, selectedVariant }: ProductInfoTableProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin sản phẩm</h3>
      <div className="bg-white border rounded-lg overflow-hidden">
        <Table>
          <TableBody>
            {product.brand && (
              <TableRow>
                <TableCell className="font-semibold w-1/3">Thương hiệu</TableCell>
                <TableCell className="text-blue-600 hover:underline cursor-pointer">
                  {product.brand.name}
                </TableCell>
              </TableRow>
            )}
            
            {selectedVariant?.size && (
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">Trọng lượng</TableCell>
                <TableCell>{selectedVariant.size}</TableCell>
              </TableRow>
            )}

            {product.variants && product.variants.length > 0 && (
              <TableRow>
                <TableCell className="font-semibold">Serving Size</TableCell>
                <TableCell>2 muỗng (336g)</TableCell>
              </TableRow>
            )}

           

            {selectedVariant?.flavor && (
              <TableRow>
                <TableCell className="font-semibold">Hương vị</TableCell>
                <TableCell>{selectedVariant.flavor}</TableCell>
              </TableRow>
            )}

            {product.attributes && product.attributes.length > 0 && product.attributes.map((attr, idx) => (
              <TableRow key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                <TableCell className="font-semibold capitalize">
                  {attr.attribute_name.replace(/_/g, ' ')}
                </TableCell>
                <TableCell>
                  {attr.attribute_value}{attr.unit}
                  {attr.attribute_name.toLowerCase().includes('calor') && ' / lần dùng'}
                  {attr.attribute_name.toLowerCase().includes('protein') && ' / lần dùng'}
                </TableCell>
              </TableRow>
            ))}

            {product.ingredients && (
              <TableRow>
                <TableCell className="font-semibold">Thành phần tinh bột</TableCell>
                <TableCell>
                  <span className="text-blue-600 hover:underline cursor-pointer">Maltodextrin</span>
                </TableCell>
              </TableRow>
            )}

            {product.ingredients && (
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">Thành phần protein</TableCell>
                <TableCell>
                  <span className="text-blue-600 hover:underline cursor-pointer">Whey Protein Concentrate</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> Calcium Caseinate</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> Egg Albumen</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> Sweet Dairy Whey</span>
                </TableCell>
              </TableRow>
            )}

            {product.ingredients && (
              <TableRow>
                <TableCell className="font-semibold">Thành phần khác</TableCell>
                <TableCell>
                  <span className="text-blue-600 hover:underline cursor-pointer">Vitamin A</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> C</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> D</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> E</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> B6</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> B12</span>; 
                  <span className="text-blue-600 hover:underline cursor-pointer"> Magie</span>, 
                  <span className="text-blue-600 hover:underline cursor-pointer"> ZinC</span>...
                </TableCell>
              </TableRow>
            )}

            {product.origin_country && (
              <TableRow>
                <TableCell className="font-semibold">Xuất xứ</TableCell>
                <TableCell>{product.origin_country}</TableCell>
              </TableRow>
            )}

            {product.manufacturer && (
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">Nhà sản xuất</TableCell>
                <TableCell>{product.manufacturer}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
