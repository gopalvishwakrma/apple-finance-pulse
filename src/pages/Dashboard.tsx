
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, BarChart, TrendingUp, CreditCard, DollarSign, Info, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import PortfolioPulse from "@/components/dashboard/PortfolioPulse";
import TopStocks from "@/components/dashboard/TopStocks";
import WatchlistCard from "@/components/dashboard/WatchlistCard";
import NewsCarousel from "@/components/dashboard/NewsCarousel";
import MarketOverview from "@/components/dashboard/MarketOverview";

// Mock data for quick stats
const quickStats = [
  {
    title: "Top Gainer",
    value: "NVDA",
    change: "+4.25%",
    isPositive: true,
  },
  {
    title: "Top Loser",
    value: "TSLA",
    change: "-2.87%",
    isPositive: false,
  },
  {
    title: "Total Assets",
    value: "$124,592.05",
    change: "+2.4%",
    isPositive: true,
  },
  {
    title: "Cash Balance",
    value: "$14,350.23",
    change: "+$1,200",
    isPositive: true,
  },
];

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") as "light" | "dark" || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex items-center justify-between">
        <h1 className="heading-lg text-gradient">Financial Overview</h1>
        <div className="flex items-center gap-2">
          <Toggle pressed={theme === "dark"} onPressedChange={toggleTheme} className="premium-shadow-sm">
            {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Toggle>
          <Button variant="outline" size="sm" className="gap-1.5 premium-shadow-sm">
            <TrendingUp className="h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <Card key={i} className="premium-card overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground font-text">{stat.title}</p>
                {stat.isPositive ? (
                  <ArrowUpRight className="text-apple-gain" size={18} />
                ) : (
                  <ArrowDownRight className="text-apple-loss" size={18} />
                )}
              </div>
              <p className="text-2xl font-semibold mt-1 tracking-tight">{stat.value}</p>
              <p className={cn("text-sm mt-1 font-medium", stat.isPositive ? "text-apple-gain" : "text-apple-loss")}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioSummary />
          <MarketOverview />
          <WatchlistCard />
        </div>
        <div className="space-y-6">
          <PortfolioPulse />
          <TopStocks />
        </div>
      </div>

      <div className="pt-4">
        <NewsCarousel />
      </div>
    </div>
  );
};

export default Dashboard;
