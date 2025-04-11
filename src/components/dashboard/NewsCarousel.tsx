
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { mockArticles } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NewsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % mockArticles.length);
  };
  
  const goToPrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? mockArticles.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Market News</CardTitle>
        <Globe size={20} className="text-primary" />
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {mockArticles.map((article) => (
              <div 
                key={article.id}
                className="min-w-full space-y-3"
              >
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-1 bg-primary text-white text-xs rounded-md mb-2">
                      {article.source}
                    </span>
                    <h3 className="text-white font-medium line-clamp-2">{article.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <a href={article.url} className="text-sm text-primary hover:underline">Read more</a>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background shadow-sm"
            onClick={() => {
              goToPrev();
              setIsAutoPlaying(false);
            }}
          >
            <ChevronLeft size={18} />
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background shadow-sm"
            onClick={() => {
              goToNext();
              setIsAutoPlaying(false);
            }}
          >
            <ChevronRight size={18} />
          </Button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {mockArticles.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex ? "bg-primary w-4" : "bg-background/80"
                )}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCarousel;
