
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { cart } from '@/lib/api-client';
import { CartService } from '@/services/cart.service';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

const cartService = new CartService();

const Cart: React.FC = () => {  //React Functional Component 
    const { user_id } = useParams<{ user_id: string }>();  // lấy tham số user_id truyền từ bên header về 
    const userId = user_id ? parseInt(user_id) : NaN;

    const [carts, setCarts] = useState<cart[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            const cart = await cartService.getUserCart(userId);
            setCarts(cart);
        };

        fetchCart();
    }, [userId]);

    if (loading) return <div className="p-4">Loading cart...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Giỏ hàng của người dùng {user_id}</h2>
            {carts.length === 0 ? (
                <div>Không có giỏ hàng nào.</div>
            ) : (
                <div className="space-y-4">
                    {carts.map((c) => (
                        <Card key={c.id}>
                            <CardHeader>
                                <CardTitle>Cart #{c.id}</CardTitle>
                                <CardDescription>Session: {c.session_id}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>Created: {c.created_at}</div>
                                <div>Updated: {c.updated_at}</div>
                            </CardContent>
                            <CardFooter />
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;