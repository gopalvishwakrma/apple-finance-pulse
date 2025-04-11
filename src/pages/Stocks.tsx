import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronDown, 
  BarChart4,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStocks } from "@/utils/mockData";
import { cn } from "@/lib/utils";

type StockSector = "Technology" | "Healthcare" | "Finance" | "Consumer" | "Energy" | "All";
type SortOption = "name" | "price" | "change" | "marketCap";
type SortDirection = "asc" | "desc";

const Stocks = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<StockSector>("All");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const sectors: StockSector[] = ["All", "Technology", "Healthcare", "Finance", "Consumer", "Energy"];
  
  const toggleFavorite = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol) 
        : [...prev, symbol]
    );
  };
  
  const filteredStocks = mockStocks
    .filter(stock => {
      // Filter by search query
      const matchesQuery = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by sector
      const matchesSector = selectedSector === "All" || stock.sector === selectedSector;
      
      return matchesQuery && matchesSector;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "name") {
        return sortDirection === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "price") {
        return sortDirection === "asc"
          ? a.price - b.price
          : b.price - a.price;
      } else if (sortBy === "change") {
        return sortDirection === "asc"
          ? a.changePercent - b.changePercent
          : b.changePercent - a.changePercent;
      } else { // marketCap
        return sortDirection === "asc"
          ? a.marketCap - b.marketCap
          : b.marketCap - a.marketCap;
      }
    });
  
  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortDirection("asc");
    }
  };
  
  const getSectorStocks = (sector: StockSector) => {
    if (sector === "All") return filteredStocks;
    return filteredStocks.filter(stock => stock.sector === sector);
  };
  
  const getFavoriteStocks = () => {
    return filteredStocks.filter(stock => favorites.includes(stock.symbol));
  };
  
  const renderSortIcon = (option: SortOption) => {
    if (sortBy !== option) return null;
    
    return (
      <ChevronDown 
        size={16} 
        className={cn(
          "ml-1 transition-transform", 
          sortDirection === "desc" && "transform rotate-180"
        )} 
      />
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Stocks</h1>
        
        <div className="flex w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks by name or symbol..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4 flex overflow-x-auto pb-1 scrollbar-none">
          <TabsTrigger value="all">All Stocks</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
        </TabsList>
        
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {sectors.map((sector) => (
            <Button
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSector(sector)}
              className="whitespace-nowrap"
            >
              {sector}
            </Button>
          ))}
        </div>
        
        <div className="bg-muted/30 p-2 rounded-lg mb-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium p-2">
            <div className="col-span-6 sm:col-span-5 flex items-center">
              <button 
                className="flex items-center" 
                onClick={() => toggleSort("name")}
              >
                Company {renderSortIcon("name")}
              </button>
            </div>
            <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
              <button 
                className="flex items-center" 
                onClick={() => toggleSort("price")}
              >
                Price {renderSortIcon("price")}
              </button>
            </div>
            <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
              <button 
                className="flex items-center" 
                onClick={() => toggleSort("change")}
              >
                Change {renderSortIcon("change")}
              </button>
            </div>
            <div className="hidden sm:flex sm:col-span-3 items-center justify-end">
              <button 
                className="flex items-center" 
                onClick={() => toggleSort("marketCap")}
              >
                Market Cap {renderSortIcon("marketCap")}
              </button>
            </div>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-3">
          {filteredStocks.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No stocks match your search criteria.</p>
            </div>
          ) : (
            filteredStocks.map((stock) => (
              <div 
                key={stock.symbol}
                className="grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/stocks/${stock.symbol}`)}
              >
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <button 
                    className="text-yellow-400 hover:text-yellow-500"
                    onClick={(e) => toggleFavorite(stock.symbol, e)}
                  >
                    <Star 
                      size={18} 
                      className={favorites.includes(stock.symbol) ? "fill-yellow-400" : ""} 
                    />
                  </button>
                  
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
                    <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                  </div>
                </div>
                
                <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
                  <p className="font-medium">${stock.price.toFixed(2)}</p>
                </div>
                
                <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
                  <div className={cn(
                    "flex items-center gap-1",
                    stock.change >= 0 ? "text-apple-gain" : "text-apple-loss"
                  )}>
                    {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                  </div>
                </div>
                
                <div className="hidden sm:flex sm:col-span-3 items-center justify-end">
                  <p className="font-medium">${(stock.marketCap / 1000000000).toFixed(2)}B</p>
                </div>
              </div>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="space-y-3">
          {getFavoriteStocks().length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">You haven't added any favorites yet.</p>
              <p className="text-sm text-muted-foreground mt-1">Click the star icon next to a stock to add it to your favorites.</p>
            </div>
          ) : (
            getFavoriteStocks().map((stock) => (
              <div 
                key={stock.symbol}
                className="grid grid-cols-12 gap-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => navigate(`/stocks/${stock.symbol}`)}
              >
                {/* Content is the same as the "all" tab */}
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <button 
                    className="text-yellow-400 hover:text-yellow-500"
                    onClick={(e) => toggleFavorite(stock.symbol, e)}
                  >
                    <Star size={18} className="fill-yellow-400" />
                  </button>
                  
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
                    <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                  </div>
                </div>
                
                <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
                  <p className="font-medium">${stock.price.toFixed(2)}</p>
                </div>
                
                <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
                  <div className={cn(
                    "flex items-center gap-1",
                    stock.change >= 0 ? "text-apple-gain" : "text-apple-loss"
                  )}>
                    {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                  </div>
                </div>
                
                <div className="hidden sm:flex sm:col-span-3 items-center justify-end">
                  <p className="font-medium">${(stock.marketCap / 1000000000).toFixed(2)}B</p>
                </div>
              </div>
            ))
          )}
        </TabsContent>
        
        {/* Other tabs would have similar content */}
        {["trending", "gainers", "losers"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3">
            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <BarChart4 className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">This feature is under development.</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Stocks;
