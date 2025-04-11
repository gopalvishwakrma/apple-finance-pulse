
import { ArrowUpRight, ArrowDownRight, Plus, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockStocks } from "@/utils/mockData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WatchlistCard = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(mockStocks.slice(0, 5));
  const [isLoading, setIsLoading] = useState(false);
  
  const refreshPrices = () => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const updatedWatchlist = watchlist.map(stock => {
        const randomChange = (Math.random() * 2 - 1) * 0.5; // Generate a random change between -0.5% and 0.5%
        const newPrice = stock.price * (1 + randomChange / 100);
        
        return {
          ...stock,
          price: newPrice,
          change: newPrice - stock.prevClose,
          changePercent: ((newPrice - stock.prevClose) / stock.prevClose) * 100
        };
      });
      
      setWatchlist(updatedWatchlist);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      refreshPrices();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [watchlist]);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Watchlist</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={refreshPrices} disabled={isLoading}>
            <RefreshCw size={18} className={cn(isLoading && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchlist.map((stock) => (
            <div 
              key={stock.symbol} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors stock-card"
              onClick={() => navigate(`/stocks/${stock.symbol}`)}
            >
              <div className="flex items-center gap-3">
                {stock.logoUrl ? (
                  <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/90 p-1 shadow-sm">
                    <img src={stock.logoUrl} alt={stock.name} className="w-6 h-6 object-contain" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold text-sm">
                    {stock.symbol.substring(0, 2)}
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{stock.symbol}</h3>
                  <p className="text-sm text-muted-foreground truncate max-w-[120px]">{stock.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${stock.price.toFixed(2)}</p>
                <div className={cn(
                  "text-sm flex items-center justify-end gap-0.5",
                  stock.change >= 0 ? "text-apple-gain" : "text-apple-loss"
                )}>
                  {stock.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{Math.abs(stock.changePercent).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistCard;
