
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, CartItem } from '@/lib/api-client';
import { CartService } from '@/services/cart.service';
import FlashSaleService from '@/services/fashSale.service';

import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/api-client';
import { Trash2, Plus, Minus } from 'lucide-react';

const cartService = new CartService();
const flashSaleService = new FlashSaleService();

interface FlashSalePriceMap {
    [key: string]: {
        sale_price: string;
        original_price: string;
        discount_percent: number;
    };
}

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [flashSalePrices, setFlashSalePrices] = useState<FlashSalePriceMap>({});

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const cartData = await cartService.getUserCart();
            setCart(cartData);
        } catch (err) {
            setError('Không thể tải giỏ hàng');
        } finally {
            setLoading(false);
        }
    };

    const checkFlashSalePrices = useCallback(async (cartItems: CartItem[]) => {
        if (!cartItems || cartItems.length === 0) return;

        try {
            const result = await flashSaleService.getActiveFlashSale();
            if (result.success && result.data?.products) {
                const priceMap: FlashSalePriceMap = {};
                
                cartItems.forEach((item) => {
                    const flashSaleProduct = result.data.products.find(
                        (p: any) => p.id === item.product.id
                    );
                    
                    if (flashSaleProduct?.flash_sale) {
                        const flashSaleVariantId = flashSaleProduct.flash_sale.variant_id 
                            ? Number(flashSaleProduct.flash_sale.variant_id) 
                            : null;
                        
                        // Nếu flash sale không có variant_id cụ thể, áp dụng cho tất cả variant
                        // Nếu có variant_id, chỉ áp dụng khi giá trong cart khớp với giá flash sale
                        const itemPrice = parseFloat(item.price);
                        const flashSalePrice = Number(flashSaleProduct.flash_sale.sale_price);
                        
                        // Kiểm tra xem giá trong cart có khớp với giá flash sale không
                        // Hoặc nếu flash sale không có variant_id cụ thể
                        if (flashSaleVariantId === null || Math.abs(itemPrice - flashSalePrice) < 0.01) {
                            const key = `${item.product.id}_${flashSaleVariantId || 'default'}`;
                            priceMap[key] = {
                                sale_price: flashSaleProduct.flash_sale.sale_price,
                                original_price: flashSaleProduct.flash_sale.original_price,
                                discount_percent: flashSaleProduct.flash_sale.discount_percent,
                            };
                        }
                    }
                });
                
                setFlashSalePrices(priceMap);
            }
        } catch (err) {
            // Lỗi khi check flash sale, không ảnh hưởng đến hiển thị giỏ hàng
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (cart && cart.items.length > 0) {
            checkFlashSalePrices(cart.items);
        }
    }, [cart, checkFlashSalePrices]);

    const getItemPrice = (item: CartItem): { price: number; originalPrice?: number } => {
        // Tìm flash sale price cho sản phẩm này
        // Thử tìm với key có variant_id và không có variant_id
        const keys = [
            `${item.product.id}_default`,
            ...Object.keys(flashSalePrices).filter(k => k.startsWith(`${item.product.id}_`))
        ];
        
        for (const key of keys) {
            const flashSale = flashSalePrices[key];
            if (flashSale) {
                // Kiểm tra xem giá trong cart có gần với giá flash sale không
                const itemPrice = parseFloat(item.price);
                const flashSalePrice = Number(flashSale.sale_price);
                
                // Nếu giá khớp hoặc gần khớp (sai số < 0.01), sử dụng flash sale price
                if (Math.abs(itemPrice - flashSalePrice) < 0.01 || itemPrice === flashSalePrice) {
                    return {
                        price: Number(flashSale.sale_price),
                        originalPrice: Number(flashSale.original_price),
                    };
                }
            }
        }
        
        return {
            price: parseFloat(item.price),
        };
    };

    const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        const result = await cartService.updateCartItem(itemId, newQuantity);
        if (result.success) {
            await fetchCart(); // Reload cart
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        const result = await cartService.removeFromCart(itemId);
        if (result.success) {
            await fetchCart(); // Reload cart
        }
    };

    const calculateTotal = () => {
        if (!cart) return 0;
        return cart.items.reduce((total, item) => {
            const { price } = getItemPrice(item);
            return total + (price * item.quantity);
        }, 0);
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-8">Đang tải giỏ hàng...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-8 text-red-600">{error}</div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
                    <p className="text-gray-600 mb-4">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                    <Button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700">
                        Tiếp tục mua sắm
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <Card key={item.id}>
                            <CardContent className="p-4">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <img
                                        src={getImageUrl(item.product.featured_image)}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    
                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {item.product.brand?.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {(() => {
                                                const { price, originalPrice } = getItemPrice(item);
                                                return (
                                                    <>
                                        <p className="text-red-600 font-bold">
                                                            {price.toLocaleString('vi-VN')}₫
                                                        </p>
                                                        {originalPrice && originalPrice > price && (
                                                            <>
                                                                <p className="text-gray-500 line-through text-sm">
                                                                    {originalPrice.toLocaleString('vi-VN')}₫
                                        </p>
                                                                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-bold">
                                                                    FLASH SALE
                                                                </span>
                                                            </>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                    
                                    {/* Quantity Controls */}
                                    <div className="flex flex-col items-end justify-between">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        
                                        <div className="flex items-center gap-2 border rounded">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="px-3 font-semibold">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        
                                        <p className="font-bold text-lg">
                                            {(() => {
                                                const { price } = getItemPrice(item);
                                                return (price * item.quantity).toLocaleString('vi-VN');
                                            })()}₫
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng đơn hàng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tạm tính:</span>
                                <span className="font-semibold">
                                    {calculateTotal().toLocaleString('vi-VN')}₫
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phí vận chuyển:</span>
                                <span className="font-semibold">Miễn phí</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Tổng cộng:</span>
                                    <span className="text-red-600">
                                        {calculateTotal().toLocaleString('vi-VN')}₫
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button 
                                className="w-full bg-red-600 hover:bg-red-700"
                                onClick={() => navigate('/checkout')}
                            >
                                Tiến hành thanh toán
                            </Button>
                            <Button 
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate('/')}
                            >
                                Tiếp tục mua sắm
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CartPage;