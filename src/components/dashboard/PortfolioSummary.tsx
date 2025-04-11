
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LineChart from "@/components/charts/LineChart";
import { portfolioPerformance, generatePeriodData } from "@/utils/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

const PortfolioSummary = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1M");
  const [chartData, setChartData] = useState(() => 
    generatePeriodData(selectedRange, portfolioPerformance.totalValue)
  );
  
  const isPositive = portfolioPerformance.totalGainLoss >= 0;
  const gainLossClass = isPositive ? "text-apple-gain" : "text-apple-loss";
  const gainLossIcon = isPositive ? (
    <ArrowUpRight className="text-apple-gain" size={20} />
  ) : (
    <ArrowDownRight className="text-apple-loss" size={20} />
  );
  
  const changeTimeRange = (range: TimeRange) => {
    setSelectedRange(range);
    setChartData(generatePeriodData(range, portfolioPerformance.totalValue));
  };
  
  const getChangeDisplay = () => {
    switch (selectedRange) {
      case "1D":
        return {
          change: portfolioPerformance.dailyChange,
          percent: portfolioPerformance.dailyChangePercent
        };
      case "1W":
        return {
          change: portfolioPerformance.weeklyChange,
          percent: portfolioPerformance.weeklyChangePercent
        };
      case "1M":
        return {
          change: portfolioPerformance.monthlyChange,
          percent: portfolioPerformance.monthlyChangePercent
        };
      case "1Y":
      case "5Y":
        return {
          change: portfolioPerformance.yearlyChange,
          percent: portfolioPerformance.yearlyChangePercent
        };
      default:
        return {
          change: portfolioPerformance.dailyChange,
          percent: portfolioPerformance.dailyChangePercent
        };
    }
  };
  
  const changeDisplay = getChangeDisplay();
  const changeIsPositive = changeDisplay.change >= 0;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Portfolio Value</CardTitle>
        <TrendingUp size={20} className="text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">
              ${portfolioPerformance.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center gap-2 mt-1.5">
              <div className={cn("flex items-center font-medium", changeIsPositive ? "text-apple-gain" : "text-apple-loss")}>
                {changeIsPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>
                  ${Math.abs(changeDisplay.change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({Math.abs(changeDisplay.percent).toFixed(2)}%)
                </span>
              </div>
              <span className="text-muted-foreground text-sm">
                {selectedRange === "1D" ? "Today" : 
                 selectedRange === "1W" ? "Past week" : 
                 selectedRange === "1M" ? "Past month" : 
                 selectedRange === "3M" ? "Past 3 months" : 
                 selectedRange === "1Y" ? "Past year" : "Past 5 years"}
              </span>
            </div>
          </div>
          
          <div className="h-[200px] mt-6">
            <LineChart 
              data={chartData} 
              isPositive={changeIsPositive}
            />
          </div>
          
          {/* Fixed the time period buttons layout for better responsiveness */}
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {(["1D", "1W", "1M", "3M", "1Y"] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={selectedRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => changeTimeRange(range)}
                className={cn(
                  selectedRange === range ? "" : "text-muted-foreground",
                  "px-1 sm:px-3 text-xs sm:text-sm"
                )}
              >
                {range}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
              <div className="flex items-center gap-1">
                {gainLossIcon}
                <p className={cn("font-semibold", gainLossClass)}>
                  ${Math.abs(portfolioPerformance.totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <p className={cn("text-sm", gainLossClass)}>
                ({Math.abs(portfolioPerformance.totalGainLossPercent).toFixed(2)}%)
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Initial Investment</p>
              <p className="font-semibold">
                ${portfolioPerformance.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
