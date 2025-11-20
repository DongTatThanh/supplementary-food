import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PostService } from '@/services/post.service';
import { BlogPost, BlogCategory } from '@/lib/api-client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';
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
        // Load posts by category
        const categoryData = await postService.getBlogCategoryBySlug(slug);
        setCategory(categoryData);
        const postsData = await postService.getPostsByCategory(categoryData.id);
        setPosts(postsData);
      } else {
        // Load all posts
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-48 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadPosts}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        {category ? (
          <>
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại tất cả bài viết
            </Button>
            <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-muted-foreground text-lg">{category.description}</p>
            )}
          </>
        ) : (
          <h1 className="text-4xl font-bold">Tất cả bài viết</h1>
        )}
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Chưa có bài viết nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePostClick(post.slug)}
            >
              {/* Thumbnail */}
              {post.thumbnail_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(post.thumbnail_url)}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {post.is_featured && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Nổi bật
                    </Badge>
                  )}
                </div>
              )}

              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views || 0} lượt xem</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full">
                  Đọc thêm
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPages;