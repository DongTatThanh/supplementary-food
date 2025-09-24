const CategorySection = () => {
  const categories = [
    { name: "Găng tay", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-pink-100" },
    { name: "Dây tập", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-red-100" },
    { name: "Máy massage", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-blue-100" },
    { name: "Áo gym", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-green-100" },
    { name: "Bình nước", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-gray-100" },
    { name: "Thắt lưng", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-orange-100" },
    { name: "Băng tay", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-yellow-100" },
    { name: "Dụng cụ", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-purple-100" },
    { name: "Phụ kiện khác", image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=100&h=100&fit=crop&crop=center", color: "bg-red-100" }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">PHỤ KIỆN THỂ THAO</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className={`${category.color} rounded-lg p-4 mb-2 group-hover:shadow-lg transition-all`}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-12 h-12 mx-auto object-cover rounded"
                />
              </div>
              <span className="text-sm font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;