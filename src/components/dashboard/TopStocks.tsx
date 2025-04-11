
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPortfolio } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const TopStocks = () => {
  const topStocks = mockPortfolio
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);
  
  const navigate = useNavigate();
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Top Holdings</CardTitle>
        <CardDescription>Your best performing investments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStocks.map((stock) => (
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
                  <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: stock.color }}
                  >
                    {stock.symbol.substring(0, 2)}
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{stock.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{stock.shares} shares</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${stock.currentPrice.toFixed(2)}</p>
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

export default TopStocks;
