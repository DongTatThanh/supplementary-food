const BrandShowcase = () => {
  const brands = [
    { name: "Optimum Nutrition", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" },
    { name: "NOW Sports", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" },
    { name: "MuscleTech", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" },
    { name: "PVL", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" },
    { name: "Dymatize", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" },
    { name: "BPI Sports", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" },
    { name: "Body Beast", logo: "https://images.unsplash.com/photo-1611077418763-d6c7d8e5bdb4?w=120&h=60&fit=crop&crop=center" }
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">THƯƠNG HIỆU NỔI BẬT</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {brands.map((brand, index) => (
            <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;