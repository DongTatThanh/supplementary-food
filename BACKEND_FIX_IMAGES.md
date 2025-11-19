# Hướng dẫn Fix Backend để hiển thị nhiều ảnh sản phẩm

## Vấn đề hiện tại
Backend có 2 cách lưu ảnh:
1. `image_gallery` - JSON column (array of strings)
2. `images` - relation OneToMany với ProductImage entity

Frontend đang mong đợi `image_gallery` là array các đường dẫn ảnh.

## Giải pháp

### Option 1: Sử dụng `image_gallery` column (JSON)

#### 1. Trong Products Service/Controller (NestJS)

```typescript
// products.service.ts hoặc products.controller.ts

async getProductById(id: number) {
  const product = await this.productRepository.findOne({
    where: { id },
    relations: ['brand', 'category', 'variants', 'reviews', 'attributes']
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  // Parse image_gallery nếu nó là string
  let imageGallery = [];
  if (product.image_gallery) {
    if (typeof product.image_gallery === 'string') {
      try {
        imageGallery = JSON.parse(product.image_gallery);
      } catch (e) {
        imageGallery = [];
      }
    } else if (Array.isArray(product.image_gallery)) {
      imageGallery = product.image_gallery;
    }
  }

  return {
    ...product,
    image_gallery: imageGallery // Đảm bảo trả về array
  };
}
```

### Option 2: Sử dụng relation `images` (ProductImage)

#### 1. Populate relation `images`

```typescript
// products.service.ts

async getProductById(id: number) {
  const product = await this.productRepository.findOne({
    where: { id },
    relations: ['brand', 'category', 'variants', 'reviews', 'attributes', 'images'] // Thêm 'images'
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  // Map images từ relation thành array string
  const imageGallery = product.images?.map(img => img.image_url) || [];

  return {
    ...product,
    image_gallery: imageGallery // Tạo image_gallery từ relation images
  };
}
```

#### 2. Tạo ProductImage Entity (nếu chưa có)

```typescript
// product-image.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({ length: 255 })
  image_url: string;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @Column({ type: 'varchar', length: 50, default: 'gallery' })
  image_type: string; // 'featured', 'gallery', 'thumbnail'

  @Column({ type: 'tinyint', width: 1, default: 1 })
  is_active: boolean;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
```

### Option 3: Kết hợp cả 2 (Khuyến nghị)

```typescript
// products.service.ts

async getProductById(id: number) {
  const product = await this.productRepository.findOne({
    where: { id },
    relations: ['brand', 'category', 'variants', 'reviews', 'attributes', 'images']
  });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  // Ưu tiên lấy từ relation images
  let imageGallery = [];
  
  if (product.images && product.images.length > 0) {
    // Lấy từ relation, sắp xếp theo sort_order
    imageGallery = product.images
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(img => img.image_url);
  } else if (product.image_gallery) {
    // Fallback: Lấy từ JSON column
    if (typeof product.image_gallery === 'string') {
      try {
        imageGallery = JSON.parse(product.image_gallery);
      } catch (e) {
        imageGallery = [];
      }
    } else if (Array.isArray(product.image_gallery)) {
      imageGallery = product.image_gallery;
    }
  }

  return {
    ...product,
    image_gallery: imageGallery
  };
}
```

## Test để kiểm tra

### 1. Test API response
```bash
curl http://localhost:3201/products/1
```

Response mong đợi:
```json
{
  "id": 1,
  "name": "Whey Blend ON",
  "featured_image": "/uploads/products/whey-main.jpg",
  "image_gallery": [
    "/uploads/products/whey-1.jpg",
    "/uploads/products/whey-2.jpg",
    "/uploads/products/whey-3.jpg",
    "/uploads/products/whey-4.jpg"
  ],
  ...
}
```

### 2. Kiểm tra trong database

```sql
-- Kiểm tra image_gallery column
SELECT id, name, featured_image, image_gallery 
FROM products 
WHERE id = 1;

-- Kiểm tra product_images table (nếu dùng relation)
SELECT * FROM product_images WHERE product_id = 1 ORDER BY sort_order;
```

## Migration để thêm product_images table (nếu chưa có)

```sql
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `sort_order` int DEFAULT 0,
  `image_type` varchar(50) DEFAULT 'gallery',
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Cách thêm ảnh qua Admin

### Nếu dùng JSON column (`image_gallery`)
```typescript
// Trong form upload
const imageUrls = [
  '/uploads/products/img1.jpg',
  '/uploads/products/img2.jpg',
  '/uploads/products/img3.jpg',
];

// Save vào database
await productRepository.update(productId, {
  image_gallery: JSON.stringify(imageUrls) // hoặc trực tiếp array nếu TypeORM hỗ trợ
});
```

### Nếu dùng relation (`images`)
```typescript
// Trong form upload
for (const imageUrl of imageUrls) {
  await productImageRepository.save({
    product_id: productId,
    image_url: imageUrl,
    sort_order: index++,
    image_type: 'gallery'
  });
}
```

## Lưu ý quan trọng

1. ✅ Đảm bảo API trả về `image_gallery` là **array of strings**
2. ✅ Parse JSON nếu lưu dưới dạng string trong database
3. ✅ Populate relation `images` khi query product
4. ✅ Sắp xếp ảnh theo `sort_order` nếu dùng relation
5. ✅ Xử lý case khi không có ảnh (return empty array)

## Frontend đã sẵn sàng!

Component `ProductImageGallery` đã được update để:
- ✅ Hiển thị tất cả ảnh trong gallery (responsive grid)
- ✅ Lightbox zoom để xem ảnh phóng to
- ✅ Thumbnail navigation
- ✅ Hover effects và transitions

Bạn chỉ cần đảm bảo backend trả về đúng format là được!
