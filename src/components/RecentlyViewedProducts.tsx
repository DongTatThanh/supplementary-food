import { useState, useEffect } from 'react';
import productViewService, { ProductView } from '@/services/productView.service';
import ProductCard from '@/components/ui/ProductCard';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const RecentlyViewedProducts = () => {
    const { toast } = useToast();
    const [viewHistory, setViewHistory] = useState<ProductView[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadViewHistory();
    }, []);

    const loadViewHistory = async () => {
        try {
            const history = await productViewService.getUserViewHistory(6); // Lấy 6 sản phẩm
            setViewHistory(history);
        } catch (error) {
            console.error('Error loading view history:', error);
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
                <div className="flex items-center gap-2">
                    <Eye className="w-6 h-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Sản phẩm đã xem</h2>
                </div>
                
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
