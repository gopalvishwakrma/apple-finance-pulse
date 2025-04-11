
import { ArrowDownRight, ArrowUpRight, Briefcase, TrendingUp, LineChart, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const marketIndices = [
  { 
    name: "S&P 500", 
    value: 5203.85, 
    change: +0.87, 
    changePercent: +1.22, 
  },
  { 
    name: "Dow Jones", 
    value: 39368.07, 
    change: +227.24, 
    changePercent: +0.58, 
  },
  { 
    name: "Nasdaq", 
    value: 16429.52, 
    change: +183.02, 
    changePercent: +1.12, 
  },
  { 
    name: "Russell 2000", 
    value: 2058.54, 
    change: -3.26, 
    changePercent: -0.16, 
  }
];

const marketSentiment = {
  overall: "Bullish",
  trends: [
    { name: "Momentum", score: 78, status: "Positive" },
    { name: "Volatility", score: 42, status: "Low" },
    { name: "Breadth", score: 65, status: "Positive" },
    { name: "Seasonality", score: 58, status: "Neutral" }
  ]
};

const MarketOverview = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Market Overview</CardTitle>
        <TrendingUp size={20} className="text-primary" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="indices" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="indices">
              <LineChart className="h-4 w-4 mr-2" />
              Major Indices
            </TabsTrigger>
            <TabsTrigger value="sentiment">
              <Bell className="h-4 w-4 mr-2" />
              Market Sentiment
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="indices" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {marketIndices.map((index, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{index.name}</h3>
                    {index.changePercent >= 0 ? (
                      <ArrowUpRight className="text-apple-gain" size={18} />
                    ) : (
                      <ArrowDownRight className="text-apple-loss" size={18} />
                    )}
                  </div>
                  <p className="text-xl font-bold mt-1">{index.value.toLocaleString()}</p>
                  <div className={`flex items-center mt-1 text-sm ${
                    index.changePercent >= 0 ? "text-apple-gain" : "text-apple-loss"
                  }`}>
                    <span>
                      {index.changePercent >= 0 ? "+" : ""}{index.change.toFixed(2)} 
                      ({index.changePercent >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-2">
              <Button variant="outline" size="sm">
                <Briefcase className="h-4 w-4 mr-2" />
                View All Markets
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sentiment" className="space-y-4 pt-4">
            <div className="flex flex-col items-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-primary mb-2">
                <span className="text-xl font-bold">
                  {marketSentiment.overall === "Bullish" ? "🐂" : "🐻"}
                </span>
              </div>
              <h3 className="text-lg font-medium">{marketSentiment.overall}</h3>
              <p className="text-sm text-muted-foreground">Current Market Sentiment</p>
            </div>
            
            <div className="space-y-3">
              {marketSentiment.trends.map((trend, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{trend.name}</p>
                    <p className="text-xs text-muted-foreground">{trend.status}</p>
                  </div>
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${trend.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{trend.score}%</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
