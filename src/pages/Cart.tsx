
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, CartItem } from '@/lib/api-client';
import { CartService } from '@/services/cart.service';


import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/api-client';
import { Trash2, Plus, Minus } from 'lucide-react';

const cartService = new CartService();

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const cartData = await cartService.getUserCart();
            setCart(cartData);
        } catch (err) {
            console.error(err);
            setError('Không thể tải giỏ hàng');
        } finally {
            setLoading(false);
        }
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
            return total + (parseFloat(item.price) * item.quantity);
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
                                        <p className="text-red-600 font-bold">
                                            {parseFloat(item.price).toLocaleString('vi-VN')}₫
                                        </p>
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
                                            {(parseFloat(item.price) * item.quantity).toLocaleString('vi-VN')}₫
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
                                onClick={() => navigate('/payment')}
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