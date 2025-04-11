
import { useEffect } from "react";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import TopStocks from "@/components/dashboard/TopStocks";
import WatchlistCard from "@/components/dashboard/WatchlistCard";
import PortfolioPulse from "@/components/dashboard/PortfolioPulse";
import NewsCarousel from "@/components/dashboard/NewsCarousel";
import { toast } from "sonner";

const Dashboard = () => {
  useEffect(() => {
    // Simulate a welcome toast
    setTimeout(() => {
      toast.success("Welcome back, Jane! Your portfolio is up 1.23% today.", {
        description: "Check out your latest performance metrics."
      });
    }, 1000);
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main content - left side */}
        <div className="md:col-span-8 space-y-6">
          <PortfolioSummary />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <TopStocks />
            <WatchlistCard />
          </div>
          
          <NewsCarousel />
        </div>
        
        {/* Sidebar - right side */}
        <div className="md:col-span-4 space-y-6">
          <PortfolioPulse />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
