
import { useState } from "react";
import { 
  BarChart, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sliders, 
  Search,
  SlidersHorizontal,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "@/components/charts/PieChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockPortfolio, portfolioPerformance, portfolioValue, sectorAllocation } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Portfolio = () => {
  const [sortBy, setSortBy] = useState<string>("value");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<string>("");
  const [scenarioValue, setScenarioValue] = useState([0]);
  const [scenarioStock, setScenarioStock] = useState("AAPL");
  
  // Calculate potential portfolio changes
  const scenarioChange = scenarioValue[0] / 100; // -1 to 1, representing -100% to +100%
  const scenarioStock_obj = mockPortfolio.find(s => s.symbol === scenarioStock);
  const scenarioValueChange = scenarioStock_obj ? scenarioStock_obj.value * scenarioChange : 0;
  const scenarioNewPortfolioValue = portfolioValue + scenarioValueChange;
  const scenarioPercentChange = (scenarioValueChange / portfolioValue) * 100;
  
  // Filter and sort holdings
  const sortedAndFilteredHoldings = [...mockPortfolio]
    .filter(holding => 
      holding.name.toLowerCase().includes(filter.toLowerCase()) || 
      holding.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      
      // Determine which property to sort by
      switch (sortBy) {
        case "symbol": 
          aValue = a.symbol;
          bValue = b.symbol;
          break;
        case "price":
          aValue = a.currentPrice;
          bValue = b.currentPrice;
          break;
        case "change":
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case "value":
        default:
          aValue = a.value;
          bValue = b.value;
          break;
      }
      
      // Handle string vs number comparisons
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" 
          ? (aValue as number) - (bValue as number) 
          : (bValue as number) - (aValue as number);
      }
    });

  const handleBuySell = (action: "buy" | "sell", symbol: string, shares: number, price: number) => {
    toast.success(
      `Successfully ${action === "buy" ? "purchased" : "sold"} ${shares} shares of ${symbol}`,
      {
        description: `${action === "buy" ? "Total cost" : "Total proceeds"}: $${(shares * price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      }
    );
  };
    
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <h1 className="text-3xl font-bold">Portfolio Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main content - left side */}
        <div className="md:col-span-8 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Your Holdings</CardTitle>
              <div className="flex items-center gap-2">
                <Input
                  className="w-48 apple-input"
                  placeholder="Search..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="symbol">Symbol</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="change">% Change</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Buy Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Buy Stock</DialogTitle>
                      <DialogDescription>
                        Add a new stock to your portfolio or increase an existing position.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="symbol" className="text-sm font-medium">Symbol</label>
                        <Input id="symbol" placeholder="e.g., AAPL" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="shares" className="text-sm font-medium">Number of Shares</label>
                        <Input id="shares" type="number" min={1} placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium">Price per Share ($)</label>
                        <Input id="price" type="number" min={0.01} step={0.01} placeholder="0.00" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleBuySell("buy", "AAPL", 5, 182.52)}>
                        Complete Purchase
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-medium text-muted-foreground text-sm py-3">Symbol</th>
                      <th className="text-left font-medium text-muted-foreground text-sm py-3">Shares</th>
                      <th className="text-right font-medium text-muted-foreground text-sm py-3">Avg. Cost</th>
                      <th className="text-right font-medium text-muted-foreground text-sm py-3">Price</th>
                      <th className="text-right font-medium text-muted-foreground text-sm py-3">Change</th>
                      <th className="text-right font-medium text-muted-foreground text-sm py-3">Value</th>
                      <th className="text-right font-medium text-muted-foreground text-sm py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sortedAndFilteredHoldings.map((holding) => (
                      <tr key={holding.symbol} className="hover:bg-muted/50 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {holding.logoUrl ? (
                              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-white/90 p-1 shadow-sm">
                                <img src={holding.logoUrl} alt={holding.name} className="w-6 h-6 object-contain" />
                              </div>
                            ) : (
                              <div 
                                className="w-8 h-8 rounded-md flex items-center justify-center text-white font-semibold text-sm"
                                style={{ backgroundColor: holding.color }}
                              >
                                {holding.symbol.substring(0, 2)}
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{holding.symbol}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-[120px]">{holding.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-left">{holding.shares}</td>
                        <td className="py-3 text-right">${holding.averageCost.toFixed(2)}</td>
                        <td className="py-3 text-right">${holding.currentPrice.toFixed(2)}</td>
                        <td className="py-3 text-right">
                          <div className={cn(
                            "flex items-center justify-end gap-0.5",
                            holding.change >= 0 ? "text-apple-gain" : "text-apple-loss"
                          )}>
                            {holding.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span>{Math.abs(holding.changePercent).toFixed(2)}%</span>
                          </div>
                        </td>
                        <td className="py-3 text-right">${holding.value.toLocaleString('en-US')}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-apple-gain"
                              onClick={() => handleBuySell("buy", holding.symbol, 1, holding.currentPrice)}
                            >
                              Buy
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-apple-loss"
                              onClick={() => handleBuySell("sell", holding.symbol, 1, holding.currentPrice)}
                            >
                              Sell
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Scenario Simulator</CardTitle>
              <Sliders size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Simulate how your portfolio would be affected if a particular stock changes in value.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Stock</label>
                    <Select
                      value={scenarioStock}
                      onValueChange={setScenarioStock}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select stock" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPortfolio.map((holding) => (
                          <SelectItem key={holding.symbol} value={holding.symbol}>
                            {holding.symbol} - {holding.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">
                      Adjust Value: {scenarioValue[0] > 0 ? "+" : ""}{scenarioValue[0]}%
                    </label>
                    <Slider
                      defaultValue={[0]}
                      min={-100}
                      max={100}
                      step={1}
                      value={scenarioValue}
                      onValueChange={setScenarioValue}
                      className="py-4"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Current Portfolio Value</h3>
                    <p className="text-xl font-semibold">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Scenario Portfolio Value</h3>
                    <p className="text-xl font-semibold">${scenarioNewPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Potential Impact</h3>
                    <div className={cn(
                      "text-xl font-semibold flex items-center gap-1",
                      scenarioPercentChange >= 0 ? "text-apple-gain" : "text-apple-loss"
                    )}>
                      {scenarioPercentChange >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                      <span>{Math.abs(scenarioPercentChange).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - right side */}
        <div className="md:col-span-4 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Allocation</CardTitle>
              <BarChart size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <PieChart data={sectorAllocation} height={250} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Summary</CardTitle>
              <Wallet size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Total Value</dt>
                  <dd className="font-medium">
                    ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </dd>
                </div>
                
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Total Invested</dt>
                  <dd className="font-medium">
                    ${portfolioPerformance.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </dd>
                </div>
                
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Total Gain/Loss</dt>
                  <dd className={cn(
                    "font-medium flex items-center gap-1",
                    portfolioPerformance.totalGainLoss >= 0 ? "text-apple-gain" : "text-apple-loss"
                  )}>
                    {portfolioPerformance.totalGainLoss >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>
                      ${Math.abs(portfolioPerformance.totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </dd>
                </div>
                
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Return %</dt>
                  <dd className={cn(
                    "font-medium",
                    portfolioPerformance.totalGainLossPercent >= 0 ? "text-apple-gain" : "text-apple-loss"
                  )}>
                    {portfolioPerformance.totalGainLossPercent >= 0 ? "+" : ""}
                    {portfolioPerformance.totalGainLossPercent.toFixed(2)}%
                  </dd>
                </div>
                
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Holdings</dt>
                  <dd className="font-medium">{mockPortfolio.length}</dd>
                </div>
                
                <div className="flex justify-between py-2">
                  <dt className="text-muted-foreground">Most Valuable</dt>
                  <dd className="font-medium">{mockPortfolio.sort((a, b) => b.value - a.value)[0].symbol}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
