import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PostService } from '@/services/post.service';
import { BlogPost, BlogCategory } from '@/lib/api-client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Eye, ArrowLeft, BookOpen } from 'lucide-react';
import { getImageUrl } from '@/lib/api-client';

const BlogPages = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const postService = new PostService();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, [slug]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      if (slug) {
        const categoryData = await postService.getBlogCategoryBySlug(slug);
        setCategory(categoryData);
        const postsData = await postService.getPostsByCategory(categoryData.id);
        setPosts(postsData);
      } else {
        const postsData = await postService.getAllBlogPosts();
        setPosts(postsData);
        setCategory(null);
      }
    } catch (err: any) {
      setError(err.message || 'Không thể tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postSlug: string) => {
    navigate(`/blog/${postSlug}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-lg">
                <Skeleton className="h-56 w-full rounded-t-lg" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-red-500 mb-6 text-lg font-semibold">{error}</p>
          <Button onClick={loadPosts} className="bg-red-600 hover:bg-red-700 text-white">
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          {category ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate('/blog')}
                className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại tất cả bài viết
              </Button>
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 shadow-xl">
                <h1 className="text-5xl font-bold mb-3">{category.name}</h1>
                {category.description && (
                  <p className="text-red-50 text-lg leading-relaxed">{category.description}</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-3">Blog & Tin Tức</h1>
              <p className="text-gray-600 text-lg">Khám phá những bài viết mới nhất về thể hình và dinh dưỡng</p>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl font-medium">Chưa có bài viết nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white rounded-2xl transform hover:-translate-y-2"
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Thumbnail */}
                {post.thumbnail_url && (
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={getImageUrl(post.thumbnail_url)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {post.is_featured && (
                      <Badge className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                        ⭐ Nổi bật
                      </Badge>
                    )}
                  </div>
                )}

                <CardHeader className="p-6 pb-4">
                  <CardTitle className="line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-4">
                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 line-clamp-3 mb-5 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="font-medium">{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5" />
                      <span className="font-medium">{post.views || 0} lượt xem</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold transition-all duration-200 rounded-lg"
                  >
                    Đọc thêm
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPages;