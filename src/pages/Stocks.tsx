
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  TrendingUp,
  Building,
  Clock,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stockSectors = [
  "All", "Technology", "Healthcare", "Financial", "Consumer", "Energy", "Industrial"
];

const popularStocks = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    price: 173.72, 
    change: +1.12, 
    changePercent: +0.65, 
    sector: "Technology",
    marketCap: "2.71T",
    volume: "52.4M"
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corp.", 
    price: 425.52, 
    change: +2.76, 
    changePercent: +0.65, 
    sector: "Technology",
    marketCap: "3.16T",
    volume: "18.2M"
  },
  { 
    symbol: "GOOGL", 
    name: "Alphabet Inc.", 
    price: 148.74, 
    change: +0.31, 
    changePercent: +0.21, 
    sector: "Technology",
    marketCap: "1.87T",
    volume: "15.9M"
  },
  { 
    symbol: "AMZN", 
    name: "Amazon.com Inc.", 
    price: 178.95, 
    change: +0.68, 
    changePercent: +0.38, 
    sector: "Consumer",
    marketCap: "1.86T",
    volume: "30.1M"
  },
  { 
    symbol: "NVDA", 
    name: "NVIDIA Corp.", 
    price: 880.08, 
    change: -12.30, 
    changePercent: -1.38, 
    sector: "Technology",
    marketCap: "2.17T",
    volume: "40.8M"
  },
  { 
    symbol: "META", 
    name: "Meta Platforms", 
    price: 474.99, 
    change: +1.21, 
    changePercent: +0.26, 
    sector: "Technology",
    marketCap: "1.21T",
    volume: "12.6M"
  },
  { 
    symbol: "BRK.B", 
    name: "Berkshire Hathaway", 
    price: 406.15, 
    change: -1.13, 
    changePercent: -0.28, 
    sector: "Financial",
    marketCap: "891.5B",
    volume: "3.2M"
  },
  { 
    symbol: "JPM", 
    name: "JPMorgan Chase", 
    price: 191.20, 
    change: -0.52, 
    changePercent: -0.27, 
    sector: "Financial",
    marketCap: "551.2B",
    volume: "7.1M"
  },
  { 
    symbol: "JNJ", 
    name: "Johnson & Johnson", 
    price: 151.48, 
    change: +0.87, 
    changePercent: +0.58, 
    sector: "Healthcare",
    marketCap: "364.5B",
    volume: "5.4M"
  },
  { 
    symbol: "XOM", 
    name: "Exxon Mobil Corp.", 
    price: 118.64, 
    change: -1.02, 
    changePercent: -0.85, 
    sector: "Energy",
    marketCap: "471.8B",
    volume: "13.2M"
  }
];

const trendingStocks = [
  { 
    symbol: "TSLA", 
    name: "Tesla Inc.", 
    price: 171.05, 
    change: -4.32, 
    changePercent: -2.46, 
    sector: "Consumer",
    marketCap: "544.7B",
    volume: "96.3M"
  },
  { 
    symbol: "AMD", 
    name: "Advanced Micro Devices", 
    price: 164.17, 
    change: +3.61, 
    changePercent: +2.25, 
    sector: "Technology",
    marketCap: "265.2B",
    volume: "57.8M"
  },
  { 
    symbol: "CRM", 
    name: "Salesforce Inc.", 
    price: 301.91, 
    change: +4.56, 
    changePercent: +1.53, 
    sector: "Technology",
    marketCap: "292.4B",
    volume: "8.7M"
  },
  { 
    symbol: "PFE", 
    name: "Pfizer Inc.", 
    price: 26.63, 
    change: -0.22, 
    changePercent: -0.82, 
    sector: "Healthcare",
    marketCap: "150.4B",
    volume: "34.5M"
  }
];

const Stocks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredStocks = popularStocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "All" || stock.sector === selectedSector;
    return matchesSearch && matchesSector;
  });
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <h1 className="heading-lg text-gradient">Stocks</h1>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search stocks by name or symbol..."
          className="pl-10 pr-4 apple-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto no-scrollbar">
        {stockSectors.map((sector) => (
          <Button
            key={sector}
            variant={selectedSector === sector ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSector(sector)}
            className="text-nowrap whitespace-nowrap premium-shadow-sm"
          >
            {sector}
          </Button>
        ))}
      </div>
      
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="popular">
            <Star className="h-4 w-4 mr-2" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredStocks.map((stock) => (
                <Link to={`/stocks/${stock.symbol}`} key={stock.symbol}>
                  <Card className="premium-card overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">{stock.symbol}</h2>
                                <Badge variant="outline" className="badge-premium">{stock.sector}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground font-text">{stock.name}</p>
                            </div>
                            <div className={`flex items-center ${
                              stock.changePercent >= 0 ? "text-apple-gain" : "text-apple-loss"
                            }`}>
                              {stock.changePercent >= 0 ? (
                                <ArrowUpRight size={16} />
                              ) : (
                                <ArrowDownRight size={16} />
                              )}
                              <span className="font-medium">
                                {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-xl font-bold mb-1 tracking-tight">${stock.price.toFixed(2)}</div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                              <Building className="h-3.5 w-3.5 text-muted-foreground hidden xs:block" />
                              <span className="text-muted-foreground">Cap:</span>
                              <span>{stock.marketCap}</span>
                            </div>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground hidden xs:block" />
                              <span className="text-muted-foreground">Vol:</span>
                              <span>{stock.volume}</span>
                            </div>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                              <DollarSign className="h-3.5 w-3.5 text-muted-foreground hidden xs:block" />
                              <span className={`${
                                stock.changePercent >= 0 ? "text-apple-gain" : "text-apple-loss"
                              }`}>
                                {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredStocks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No stocks match your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-2 premium-shadow-sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSector("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="trending" className="mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {trendingStocks.map((stock) => (
                <Link to={`/stocks/${stock.symbol}`} key={stock.symbol}>
                  <Card className="premium-card overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">{stock.symbol}</h2>
                                <Badge variant="outline" className="badge-premium">{stock.sector}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground font-text">{stock.name}</p>
                            </div>
                            <div className={`flex items-center ${
                              stock.changePercent >= 0 ? "text-apple-gain" : "text-apple-loss"
                            }`}>
                              {stock.changePercent >= 0 ? (
                                <ArrowUpRight size={16} />
                              ) : (
                                <ArrowDownRight size={16} />
                              )}
                              <span className="font-medium">
                                {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="text-xl font-bold mb-1 tracking-tight">${stock.price.toFixed(2)}</div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                              <Building className="h-3.5 w-3.5 text-muted-foreground hidden xs:block" />
                              <span className="text-muted-foreground">Cap:</span>
                              <span>{stock.marketCap}</span>
                            </div>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground hidden xs:block" />
                              <span className="text-muted-foreground">Vol:</span>
                              <span>{stock.volume}</span>
                            </div>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                              <DollarSign className="h-3.5 w-3.5 text-muted-foreground hidden xs:block" />
                              <span className={`${
                                stock.changePercent >= 0 ? "text-apple-gain" : "text-apple-loss"
                              }`}>
                                {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Stocks;
