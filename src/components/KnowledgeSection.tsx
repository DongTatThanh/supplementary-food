import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const KnowledgeSection = () => {
  const supplementArticles = [
    {
      title: "Kiến thức về sử dụng Whey Protein và Tác dụng phụ không mong muốn",
      date: "04/10/2024",
      views: "2.1k views",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Nhìn nhận đúng về tác dụng của Tăng cường - Hậu quả của việc lạm dụng",
      date: "04/10/2024", 
      views: "1.8k views",
      image: "https://images.unsplash.com/photo-1571019613540-58ca50ac7fb6?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const nutritionArticles = [
    {
      title: "Làm thế nào để tăng cơ một cách tự nhiên đúng kỹ thuật và an toàn",
      date: "04/10/2024",
      views: "3.2k views", 
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Lợi ích của món ăn là gì? Thực đơn Eat Clean một tuần dành cho nam",
      date: "04/10/2024",
      views: "2.5k views",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Supplement Knowledge */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">KIẾN THỨC SUPPLEMENT</h2>
            <div className="space-y-6">
              {supplementArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-24 h-20 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          <span>{article.date}</span> • <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" size="sm">Xem tất cả →</Button>
            </div>
          </div>

          {/* Nutrition Knowledge */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">KIẾN THỨC DINH DƯỠNG</h2>
            <div className="space-y-6">
              {nutritionArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-24 h-20 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{article.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          <span>{article.date}</span> • <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" size="sm">Xem tất cả →</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;