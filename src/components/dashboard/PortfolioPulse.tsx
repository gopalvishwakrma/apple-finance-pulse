
import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { portfolioPulseMetrics } from "@/utils/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PortfolioPulse = () => {
  const [hoveredRecommendation, setHoveredRecommendation] = useState<string | null>(null);
  
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-apple-gain";
    if (score >= 60) return "text-amber-500";
    return "text-apple-loss";
  };
  
  // Determine progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-apple-gain";
    if (score >= 60) return "bg-amber-500";
    return "bg-apple-loss";
  };
  
  const { diversificationScore, riskScore, performanceScore, overallHealth, recommendations } = portfolioPulseMetrics;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Portfolio Pulse</CardTitle>
        <Shield size={20} className="text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-primary/20 mb-2">
              <span className={cn("text-2xl font-bold", getScoreColor(overallHealth))}>
                {overallHealth}
              </span>
            </div>
            <h3 className="font-medium text-lg">Overall Health</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {overallHealth >= 80 ? "Excellent" : 
               overallHealth >= 70 ? "Very Good" : 
               overallHealth >= 60 ? "Good" : 
               overallHealth >= 50 ? "Fair" : "Needs Attention"}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Diversification</span>
                <span className={cn("text-sm font-medium", getScoreColor(diversificationScore))}>
                  {diversificationScore}/100
                </span>
              </div>
              <Progress value={diversificationScore} className="h-2" 
                style={{ 
                  '--progress-background': getProgressColor(diversificationScore)
                } as React.CSSProperties} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Risk Level</span>
                <span className={cn("text-sm font-medium", getScoreColor(100 - riskScore))}>
                  {riskScore}/100
                </span>
              </div>
              <Progress value={riskScore} className="h-2" 
                style={{ 
                  '--progress-background': riskScore <= 30 ? "var(--apple-gain)" : 
                                          riskScore <= 70 ? "rgb(245, 158, 11)" : "var(--apple-loss)"
                } as React.CSSProperties} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Performance</span>
                <span className={cn("text-sm font-medium", getScoreColor(performanceScore))}>
                  {performanceScore}/100
                </span>
              </div>
              <Progress value={performanceScore} className="h-2" 
                style={{ 
                  '--progress-background': getProgressColor(performanceScore)
                } as React.CSSProperties} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Recommendations</h3>
            <ul className="space-y-1.5">
              {recommendations.map((recommendation, index) => (
                <li 
                  key={index}
                  className={cn(
                    "text-sm py-1.5 px-2 rounded-md transition-colors",
                    hoveredRecommendation === recommendation ? "bg-primary/10" : "hover:bg-muted"
                  )}
                  onMouseEnter={() => setHoveredRecommendation(recommendation)}
                  onMouseLeave={() => setHoveredRecommendation(null)}
                >
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioPulse;
