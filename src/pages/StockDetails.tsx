
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronLeft, 
  BarChart4, 
  Layers, 
  TrendingUp,
  Info,
  Star,
  Clock,
  DollarSign,
  Plus,
  Minus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import LineChart from "@/components/charts/LineChart";
import { cn } from "@/lib/utils";
import { mockStocks, StockData, generatePeriodData } from "@/utils/mockData";
import { toast } from "sonner";

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

const StockDetails = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StockData | null>(null);
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1M");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  
  // Simulated real-time price updates
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);
  
  // Mock analyst ratings
  const analystRatings = {
    buy: 18,
    hold: 7,
    sell: 3,
    targetPrice: 0,
    highTarget: 0,
    lowTarget: 0,
  };
  
  useEffect(() => {
    // Find the stock by symbol
    const foundStock = mockStocks.find(s => s.symbol === symbol);
    
    if (foundStock) {
      setStock(foundStock);
      setCurrentPrice(foundStock.price);
      setPriceChange(foundStock.change);
      setPriceChangePercent(foundStock.changePercent);
      
      // Set analyst target prices
      analystRatings.targetPrice = parseFloat((foundStock.price * 1.15).toFixed(2));
      analystRatings.highTarget = parseFloat((foundStock.price * 1.35).toFixed(2));
      analystRatings.lowTarget = parseFloat((foundStock.price * 0.9).toFixed(2));
      
      // Generate chart data for the selected range
      setChartData(generatePeriodData(selectedRange, foundStock.price));
      
      // Simulate if it's in watchlist (random)
      setIsInWatchlist(Math.random() > 0.5);
    }
  }, [symbol]);
  
  useEffect(() => {
    if (!stock) return;
    
    // Generate new chart data when time range changes
    setChartData(generatePeriodData(selectedRange, stock.price));
  }, [selectedRange, stock]);
  
  useEffect(() => {
    if (!stock) return;
    
    // Simulate real-time price updates
    const interval = setInterval(() => {
      const randomChange = (Math.random() * 2 - 1) * 0.2; // Random change between -0.2% and 0.2%
      const newPrice = parseFloat((currentPrice * (1 + randomChange / 100)).toFixed(2));
      const newChange = parseFloat((newPrice - stock.prevClose).toFixed(2));
      const newChangePercent = parseFloat(((newChange / stock.prevClose) * 100).toFixed(2));
      
      setCurrentPrice(newPrice);
      setPriceChange(newChange);
      setPriceChangePercent(newChangePercent);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentPrice, stock]);
  
  const handleBuySell = (action: "buy" | "sell", shares: number) => {
    toast.success(
      `Successfully ${action === "buy" ? "purchased" : "sold"} ${shares} shares of ${stock?.symbol}`,
      {
        description: `${action === "buy" ? "Total cost" : "Total proceeds"}: $${(shares * currentPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      }
    );
  };
  
  // Handle watchlist toggle
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    
    if (!isInWatchlist) {
      toast.success(`Added ${stock?.symbol} to your watchlist`);
    } else {
      toast(`Removed ${stock?.symbol} from your watchlist`);
    }
  };
  
  if (!stock) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-lg">Loading stock data...</div>
      </div>
    );
  }
  
  const isPositive = priceChange >= 0;
  
  // Find related stocks (same sector)
  const relatedStocks = mockStocks
    .filter(s => s.sector === stock.sector && s.symbol !== stock.symbol)
    .slice(0, 3);
  
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={18} className="mr-1" />
        Back
      </Button>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {stock.logoUrl ? (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/90 p-1 shadow-sm">
              <img src={stock.logoUrl} alt={stock.name} className="w-10 h-10 object-contain" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary text-white">
              {stock.symbol.substring(0, 2)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {stock.symbol}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-yellow-400"
                onClick={toggleWatchlist}
              >
                <Star size={18} className={isInWatchlist ? "fill-yellow-400" : ""} />
              </Button>
            </h1>
            <p className="text-muted-foreground">{stock.name}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
          <div className={cn(
            "flex items-center gap-1",
            isPositive ? "text-apple-gain" : "text-apple-loss"
          )}>
            {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            <span>${Math.abs(priceChange).toFixed(2)} ({Math.abs(priceChangePercent).toFixed(2)}%)</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl">Price Chart</CardTitle>
              <div className="flex flex-wrap gap-2">
                {(["1D", "1W", "1M", "3M", "1Y"] as TimeRange[]).map((range) => (
                  <Button
                    key={range}
                    variant={selectedRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRange(range)}
                    className={selectedRange === range ? "" : "text-muted-foreground"}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <LineChart 
                  data={chartData} 
                  isPositive={isPositive}
                  lineColor={isPositive ? "#34c759" : "#ff3b30"}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end py-3 px-6 border-t">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-apple-gain hover:bg-apple-gain/90">
                      <Plus size={16} className="mr-1" />
                      Buy
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Buy {stock.symbol}</DialogTitle>
                      <DialogDescription>
                        Add {stock.name} shares to your portfolio
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Current Price</label>
                        <div className="px-3 py-2 border rounded-md bg-muted/30">
                          ${currentPrice.toFixed(2)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="shares" className="text-sm font-medium">Number of Shares</label>
                        <Input id="shares" type="number" min={1} placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Estimated Cost</label>
                        <div className="px-3 py-2 border rounded-md bg-muted/30">
                          ${(currentPrice * 5).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleBuySell("buy", 5)} className="bg-apple-gain hover:bg-apple-gain/90">
                        Confirm Purchase
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-apple-loss">
                      <Minus size={16} className="mr-1" />
                      Sell
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Sell {stock.symbol}</DialogTitle>
                      <DialogDescription>
                        Sell shares of {stock.name} from your portfolio
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Current Price</label>
                        <div className="px-3 py-2 border rounded-md bg-muted/30">
                          ${currentPrice.toFixed(2)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="shares" className="text-sm font-medium">Number of Shares</label>
                        <Input id="shares" type="number" min={1} placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Estimated Proceeds</label>
                        <div className="px-3 py-2 border rounded-md bg-muted/30">
                          ${(currentPrice * 3).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleBuySell("sell", 3)} className="bg-apple-loss hover:bg-apple-loss/90">
                        Confirm Sale
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">About {stock.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Layers size={14} />
                    <span>Market Cap</span>
                  </div>
                  <div className="font-medium">
                    ${(stock.marketCap / 1000000000).toFixed(2)}B
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <BarChart4 size={14} />
                    <span>Volume</span>
                  </div>
                  <div className="font-medium">
                    {(stock.volume / 1000000).toFixed(2)}M
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock size={14} />
                    <span>Avg. Volume</span>
                  </div>
                  <div className="font-medium">
                    {(stock.avgVolume / 1000000).toFixed(2)}M
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Info size={14} />
                    <span>P/E Ratio</span>
                  </div>
                  <div className="font-medium">
                    {stock.pe.toFixed(2)}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>EPS</span>
                  </div>
                  <div className="font-medium">
                    ${stock.eps.toFixed(2)}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>Dividend</span>
                  </div>
                  <div className="font-medium">
                    {stock.dividend > 0 ? `$${stock.dividend.toFixed(2)}` : 'N/A'}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <h3 className="font-medium mb-3">52-Week Range</h3>
                  <div className="relative pt-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>${stock.low52.toFixed(2)}</span>
                      <span>${stock.high52.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ 
                          width: `${((currentPrice - stock.low52) / (stock.high52 - stock.low52)) * 100}%` 
                        }}
                      />
                    </div>
                    <div 
                      className="absolute top-0 transform -translate-x-1/2"
                      style={{ 
                        left: `${((currentPrice - stock.low52) / (stock.high52 - stock.low52)) * 100}%` 
                      }}
                    >
                      <div className="text-xs font-medium bg-primary text-white px-2 py-0.5 rounded">
                        ${currentPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Price Target</h3>
                  <div className="relative pt-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>${analystRatings.lowTarget.toFixed(2)}</span>
                      <span>${analystRatings.highTarget.toFixed(2)}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-apple-gain rounded-full"
                        style={{ 
                          width: `${((analystRatings.targetPrice - analystRatings.lowTarget) / (analystRatings.highTarget - analystRatings.lowTarget)) * 100}%` 
                        }}
                      />
                    </div>
                    <div 
                      className="absolute top-0 transform -translate-x-1/2"
                      style={{ 
                        left: `${((analystRatings.targetPrice - analystRatings.lowTarget) / (analystRatings.highTarget - analystRatings.lowTarget)) * 100}%` 
                      }}
                    >
                      <div className="text-xs font-medium bg-apple-gain text-white px-2 py-0.5 rounded">
                        ${analystRatings.targetPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-4 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Analyst Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1 text-center">
                  <div className="text-xl font-bold text-apple-gain">{analystRatings.buy}</div>
                  <div className="text-sm">Buy</div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-xl font-bold text-amber-500">{analystRatings.hold}</div>
                  <div className="text-sm">Hold</div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-xl font-bold text-apple-loss">{analystRatings.sell}</div>
                  <div className="text-sm">Sell</div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-end gap-1">
                  <div 
                    className="bg-apple-gain rounded-t w-full" 
                    style={{ height: `${(analystRatings.buy / (analystRatings.buy + analystRatings.hold + analystRatings.sell)) * 100}px` }}
                  />
                  <div 
                    className="bg-amber-500 rounded-t w-full" 
                    style={{ height: `${(analystRatings.hold / (analystRatings.buy + analystRatings.hold + analystRatings.sell)) * 100}px` }}
                  />
                  <div 
                    className="bg-apple-loss rounded-t w-full" 
                    style={{ height: `${(analystRatings.sell / (analystRatings.buy + analystRatings.hold + analystRatings.sell)) * 100}px` }}
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Consensus</span>
                  <span className="text-sm font-medium">
                    {analystRatings.buy > analystRatings.hold + analystRatings.sell 
                      ? "Buy" 
                      : analystRatings.sell > analystRatings.buy + analystRatings.hold
                        ? "Sell"
                        : "Hold"
                    }
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Target Price</span>
                  <span className="text-sm font-medium">${analystRatings.targetPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Upside</span>
                  <span className={cn(
                    "text-sm font-medium",
                    analystRatings.targetPrice > currentPrice ? "text-apple-gain" : "text-apple-loss"
                  )}>
                    {((analystRatings.targetPrice / currentPrice - 1) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Related Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relatedStocks.map((relatedStock) => (
                  <div 
                    key={relatedStock.symbol}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors stock-card"
                    onClick={() => navigate(`/stocks/${relatedStock.symbol}`)}
                  >
                    <div className="flex items-center gap-3">
                      {relatedStock.logoUrl ? (
                        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/90 p-1 shadow-sm">
                          <img src={relatedStock.logoUrl} alt={relatedStock.name} className="w-6 h-6 object-contain" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold text-sm">
                          {relatedStock.symbol.substring(0, 2)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{relatedStock.symbol}</h3>
                        <p className="text-sm text-muted-foreground truncate max-w-[150px]">{relatedStock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${relatedStock.price.toFixed(2)}</p>
                      <div className={cn(
                        "text-sm flex items-center justify-end gap-0.5",
                        relatedStock.change >= 0 ? "text-apple-gain" : "text-apple-loss"
                      )}>
                        {relatedStock.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span>{Math.abs(relatedStock.changePercent).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => navigate("/stocks")}
              >
                View All {stock.sector} Stocks
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Price Mini-Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[100px]">
                <LineChart 
                  data={generatePeriodData("1D", currentPrice)} 
                  height={100}
                  showGrid={false}
                  showAxis={false}
                  isPositive={isPositive}
                  lineColor={isPositive ? "#34c759" : "#ff3b30"}
                />
              </div>
              <div className="text-center mt-2">
                <div className="text-sm text-muted-foreground">Real-Time Price</div>
                <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
                <div className={cn(
                  "text-sm flex items-center justify-center gap-1",
                  isPositive ? "text-apple-gain" : "text-apple-loss"
                )}>
                  {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>${Math.abs(priceChange).toFixed(2)} ({Math.abs(priceChangePercent).toFixed(2)}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
