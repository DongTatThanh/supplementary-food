import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth.service';
import { apiClient } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';

interface UserProfile {
  id: number;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  created_at?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!AuthService.isAuthenticated()) {
        toast({
          title: "Yêu cầu đăng nhập",
          description: "Vui lòng đăng nhập để xem thông tin cá nhân",
          variant: "destructive",
        });
        navigate('/auth?redirect=/profile');
        return;
      }

      try {
        setLoading(true);
        const user = AuthService.getCurrentUser();
        if (!user?.id) {
          throw new Error('Không tìm thấy thông tin người dùng');
        }

        const response = await apiClient.get<UserProfile>(`/users/${user.id}`);
        setProfile(response);
      } catch (error: any) {
        toast({
          title: "Lỗi",
          description: error.message || "Không thể tải thông tin cá nhân",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy thông tin</h2>
          <Button onClick={() => navigate('/')}>Quay về trang chủ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Thông tin cá nhân</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Thông tin tài khoản</CardTitle>
                <CardDescription>Xem và quản lý thông tin cá nhân của bạn</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Họ và tên</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.full_name || 'Chưa cập nhật'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Số điện thoại</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.phone || 'Chưa cập nhật'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
                <p className="text-lg font-semibold text-gray-800">
                  {profile.address || 'Chưa cập nhật'}
                </p>
              </div>
            </div>

            {profile.created_at && (
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Thành viên từ: {new Date(profile.created_at).toLocaleDateString('vi-VN')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
