
import { useState } from "react";
import {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Search,
  Book,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Mail
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mockArticles, financialGlossary, mockStocks, portfolioPulseMetrics } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Insights = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newsFilter, setNewsFilter] = useState("all");
  const [glossaryFilter, setGlossaryFilter] = useState("");
  const navigate = useNavigate();
  
  // Filter glossary terms based on search query
  const filteredGlossary = financialGlossary.filter(item => 
    item.term.toLowerCase().includes(glossaryFilter.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossaryFilter.toLowerCase())
  );
  
  // Get top movers (top gainers and losers)
  const topGainers = [...mockStocks]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);
    
  const topLosers = [...mockStocks]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);
  
  // Filter news based on selected category
  const filteredNews = mockArticles.filter(article => {
    if (newsFilter === "all") return true;
    if (newsFilter === "market" && article.title.toLowerCase().includes("market")) return true;
    if (newsFilter === "tech" && article.title.toLowerCase().includes("tech")) return true;
    if (newsFilter === "finance" && article.title.toLowerCase().includes("finance")) return true;
    return false;
  });
  
  const simulateSubscribe = () => {
    toast.success("Successfully subscribed to insights newsletter!", {
      description: "You'll receive market updates and personalized tips every week."
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <h1 className="text-3xl font-bold">Market Insights</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="news" className="flex-1">
                <Book className="h-4 w-4 mr-2" />
                News & Articles
              </TabsTrigger>
              <TabsTrigger value="movers" className="flex-1">
                <TrendingUp className="h-4 w-4 mr-2" />
                Top Movers
              </TabsTrigger>
              <TabsTrigger value="glossary" className="flex-1">
                <Lightbulb className="h-4 w-4 mr-2" />
                Glossary
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="news" className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-medium flex space-x-2">
                  <Button 
                    variant={newsFilter === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setNewsFilter("all")}
                  >
                    All
                  </Button>
                  <Button 
                    variant={newsFilter === "market" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setNewsFilter("market")}
                  >
                    Market
                  </Button>
                  <Button 
                    variant={newsFilter === "tech" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setNewsFilter("tech")}
                  >
                    Technology
                  </Button>
                  <Button 
                    variant={newsFilter === "finance" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setNewsFilter("finance")}
                  >
                    Finance
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {filteredNews.length} {filteredNews.length === 1 ? "article" : "articles"}
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredNews.map((article) => (
                  <Card key={article.id} className="shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="mb-2">{article.source}</Badge>
                          <span className="text-sm text-muted-foreground">{article.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.summary}</p>
                        <a 
                          href={article.url} 
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          Read more
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="movers" className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-apple-gain" />
                      Top Gainers
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topGainers.map((stock) => (
                      <div 
                        key={stock.symbol}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/stocks/${stock.symbol}`)}
                      >
                        <div className="flex items-center gap-3">
                          {stock.logoUrl ? (
                            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white/90 p-1 shadow-sm">
                              <img src={stock.logoUrl} alt={stock.name} className="w-8 h-8 object-contain" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-semibold">
                              {stock.symbol.substring(0, 2)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{stock.symbol}</h3>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">{stock.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${stock.price.toFixed(2)}</p>
                          <div className="text-sm flex items-center justify-end gap-0.5 text-apple-gain">
                            <ArrowUpRight size={14} />
                            <span>{stock.changePercent.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-apple-loss" />
                      Top Losers
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topLosers.map((stock) => (
                      <div 
                        key={stock.symbol}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/stocks/${stock.symbol}`)}
                      >
                        <div className="flex items-center gap-3">
                          {stock.logoUrl ? (
                            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white/90 p-1 shadow-sm">
                              <img src={stock.logoUrl} alt={stock.name} className="w-8 h-8 object-contain" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-semibold">
                              {stock.symbol.substring(0, 2)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{stock.symbol}</h3>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">{stock.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${stock.price.toFixed(2)}</p>
                          <div className="text-sm flex items-center justify-end gap-0.5 text-apple-loss">
                            <ArrowDownRight size={14} />
                            <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="glossary" className="space-y-4">
              <div className="relative mb-6">
                <Input
                  placeholder="Search financial terms..."
                  value={glossaryFilter}
                  onChange={(e) => setGlossaryFilter(e.target.value)}
                  className="pl-10 apple-input"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Financial Glossary</CardTitle>
                  <CardDescription>Learn important financial terms and concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredGlossary.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.term}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.definition}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    
                    {filteredGlossary.length === 0 && (
                      <div className="text-center py-6">
                        <Lightbulb className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No matching terms found</h3>
                        <p className="text-muted-foreground mt-1">Try adjusting your search query</p>
                      </div>
                    )}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-4 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Smart Tips</CardTitle>
              </div>
              <CardDescription>Personalized for your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolioPulseMetrics.recommendations.map((tip, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="flex gap-3 items-start">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0",
                      index === 0 ? "bg-apple-gain" : 
                      index === 1 ? "bg-amber-500" : "bg-primary"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-3 bg-muted/30 rounded-lg border border-border">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center text-white shrink-0">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm">Consider setting up automatic investments to build your portfolio steadily over time.</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Tips
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Insights Newsletter
              </CardTitle>
              <CardDescription>Get weekly market updates and personalized tips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Enter your email" className="apple-input" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="subscribe" />
                <label
                  htmlFor="subscribe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to receive email updates
                </label>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={simulateSubscribe}>
                Subscribe
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">S&P 500</span>
                  <div className="text-sm flex items-center text-apple-gain">
                    <ArrowUpRight size={14} className="mr-1" />
                    <span>0.74%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Nasdaq</span>
                  <div className="text-sm flex items-center text-apple-gain">
                    <ArrowUpRight size={14} className="mr-1" />
                    <span>1.12%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Dow Jones</span>
                  <div className="text-sm flex items-center text-apple-gain">
                    <ArrowUpRight size={14} className="mr-1" />
                    <span>0.43%</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Russell 2000</span>
                  <div className="text-sm flex items-center text-apple-loss">
                    <ArrowDownRight size={14} className="mr-1" />
                    <span>0.21%</span>
                  </div>
                </div>
                <div className="pt-2 border-t mt-2">
                  <div className="flex justify-between">
                    <span className="text-sm">BTC/USD</span>
                    <div className="text-sm flex items-center text-apple-gain">
                      <ArrowUpRight size={14} className="mr-1" />
                      <span>2.35%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Define missing components
const Badge = ({ children, variant = "default", className }: any) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "outline" && "border border-border",
        className
      )}
    >
      {children}
    </span>
  );
};

const Checkbox = ({ id }: any) => {
  return (
    <input 
      type="checkbox" 
      id={id} 
      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
    />
  );
};

export default Insights;
