import { useState, useEffect } from 'react';
import productViewService, { ProductView } from '@/services/productView.service';
import ProductCard from '@/components/ui/ProductCard';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';

const RecentlyViewedProducts = () => {
    const { toast } = useToast();
    const { id } = useParams<{ id: string }>();
    const [viewHistory, setViewHistory] = useState<ProductView[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load history khi component mount hoặc khi product id thay đổi
        const timer = setTimeout(() => {
            loadViewHistory();
        }, 500); // Giảm delay xuống 500ms
        
        return () => clearTimeout(timer);
    }, [id]);

    const loadViewHistory = async () => {
        try {
            setLoading(true);
            const history = await productViewService.getUserViewHistory(6);
            setViewHistory(history);
        } catch (error) {
            // Silent fail
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = async () => {
        try {
            await productViewService.clearViewHistory();
            setViewHistory([]);
            toast({
                title: "Đã xóa lịch sử xem",
                description: "Lịch sử xem sản phẩm đã được xóa thành công",
            });
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể xóa lịch sử xem",
                variant: "destructive"
            });
        }
    };

    if (loading) {
        return (
            <div className="py-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </div>
            </div>
        );
    }

    if (viewHistory.length === 0) {
        return null;
    }

    return (
        <div className="py-8 border-t mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Sản phẩm đã xem</h2>
                
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {viewHistory.map((view) => (
                    view.product && (
                        <ProductCard 
                            key={view.id} 
                            product={view.product}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedProducts;
