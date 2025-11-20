import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, getImageUrl } from '@/lib/api-client';
import { PostService } from '@/services/post.service';

const postService = new PostService(); // Tạo instance

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true); // true ban đầu

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await postService.getFeaturedPosts();
      setPosts(response);
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to={`/blog/${post.slug}`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {post.thumbnail && (
              <img 
                src={getImageUrl(post.thumbnail)} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.views} lượt xem</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;