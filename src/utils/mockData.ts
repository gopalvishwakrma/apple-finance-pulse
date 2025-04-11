
import { format, subDays, subHours, subMonths, subWeeks, subYears } from "date-fns";

// Types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  pe: number;
  dividend: number;
  eps: number;
  high52: number;
  low52: number;
  open: number;
  prevClose: number;
  sector: string;
  logoUrl?: string;
}

export interface PortfolioHolding {
  symbol: string;
  name: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  value: number;
  sector: string;
  logoUrl?: string;
  color: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  imageUrl: string;
  date: string;
  url: string;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell";
  symbol: string;
  name: string;
  shares: number;
  price: number;
  date: string;
  total: number;
}

export interface ProfileData {
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  investmentGoal: string;
  riskTolerance: "low" | "medium" | "high";
  investmentStyle: "passive" | "active" | "mixed";
  favoriteSectors: string[];
  milestones: {
    date: string;
    title: string;
    description: string;
  }[];
}

// Generate time series data from the past
export const generateTimeSeriesData = (
  days: number, 
  initialValue: number, 
  volatility: number = 0.02,
  trend: number = 0
): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  let currentValue = initialValue;

  for (let i = days; i >= 0; i--) {
    const date = format(subDays(new Date(), i), "yyyy-MM-dd");
    
    // Random walk with a trend
    const change = (Math.random() - 0.5 + trend) * volatility * currentValue;
    currentValue = Math.max(0.1, currentValue + change);
    
    data.push({
      date,
      value: parseFloat(currentValue.toFixed(2))
    });
  }

  return data;
};

// Generate intraday data (hourly)
export const generateIntradayData = (
  hours: number,
  initialValue: number,
  volatility: number = 0.005
): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  let currentValue = initialValue;

  for (let i = hours; i >= 0; i--) {
    const date = format(subHours(new Date(), i), "yyyy-MM-dd HH:mm");
    
    // Random walk for intraday
    const change = (Math.random() - 0.5) * volatility * currentValue;
    currentValue = Math.max(0.1, currentValue + change);
    
    data.push({
      date,
      value: parseFloat(currentValue.toFixed(2))
    });
  }

  return data;
};

// Generate custom period data
export const generatePeriodData = (period: "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y", initialValue: number): TimeSeriesData[] => {
  switch (period) {
    case "1D":
      return generateIntradayData(6, initialValue);
    case "1W":
      return generateTimeSeriesData(7, initialValue, 0.015);
    case "1M":
      return generateTimeSeriesData(30, initialValue, 0.02);
    case "3M":
      return generateTimeSeriesData(90, initialValue, 0.025);
    case "1Y":
      return generateTimeSeriesData(365, initialValue, 0.03, 0.001);
    case "5Y":
      return generateTimeSeriesData(365 * 5, initialValue, 0.04, 0.002);
    default:
      return generateIntradayData(6, initialValue);
  }
};

// Mock stocks data
export const mockStocks: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.52,
    change: 1.25,
    changePercent: 0.69,
    marketCap: 2850000000000,
    volume: 52500000,
    avgVolume: 60000000,
    pe: 28.5,
    dividend: 0.92,
    eps: 6.40,
    high52: 199.62,
    low52: 143.90,
    open: 181.27,
    prevClose: 181.27,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 417.88,
    change: 2.45,
    changePercent: 0.59,
    marketCap: 3100000000000,
    volume: 22300000,
    avgVolume: 26000000,
    pe: 35.8,
    dividend: 0.75,
    eps: 11.65,
    high52: 430.82,
    low52: 309.35,
    open: 415.43,
    prevClose: 415.43,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 175.98,
    change: -0.72,
    changePercent: -0.41,
    marketCap: 2200000000000,
    volume: 21000000,
    avgVolume: 28000000,
    pe: 26.4,
    dividend: 0,
    eps: 6.67,
    high52: 178.12,
    low52: 120.21,
    open: 176.70,
    prevClose: 176.70,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 186.45,
    change: 1.18,
    changePercent: 0.64,
    marketCap: 1950000000000,
    volume: 35000000,
    avgVolume: 42000000,
    pe: 59.2,
    dividend: 0,
    eps: 3.15,
    high52: 189.77,
    low52: 118.35,
    open: 185.27,
    prevClose: 185.27,
    sector: "Consumer Cyclical",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 506.78,
    change: 3.45,
    changePercent: 0.69,
    marketCap: 1300000000000,
    volume: 18500000,
    avgVolume: 22000000,
    pe: 27.3,
    dividend: 0,
    eps: 18.57,
    high52: 531.49,
    low52: 274.38,
    open: 503.33,
    prevClose: 503.33,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 172.63,
    change: -2.88,
    changePercent: -1.64,
    marketCap: 550000000000,
    volume: 103000000,
    avgVolume: 115000000,
    pe: 46.8,
    dividend: 0,
    eps: 3.69,
    high52: 299.29,
    low52: 138.80,
    open: 175.51,
    prevClose: 175.51,
    sector: "Consumer Cyclical",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 942.89,
    change: 13.56,
    changePercent: 1.46,
    marketCap: 2320000000000,
    volume: 42000000,
    avgVolume: 49000000,
    pe: 88.1,
    dividend: 0.04,
    eps: 10.70,
    high52: 974.00,
    low52: 300.95,
    open: 929.33,
    prevClose: 929.33,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg"
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 198.44,
    change: 0.75,
    changePercent: 0.38,
    marketCap: 570000000000,
    volume: 8500000,
    avgVolume: 9500000,
    pe: 12.1,
    dividend: 4.20,
    eps: 16.40,
    high52: 200.94,
    low52: 135.19,
    open: 197.69,
    prevClose: 197.69,
    sector: "Financial Services",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/J.P._Morgan_Logo_2008_1.svg"
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 273.58,
    change: 1.22,
    changePercent: 0.45,
    marketCap: 560000000000,
    volume: 5200000,
    avgVolume: 6700000,
    pe: 30.5,
    dividend: 2.08,
    eps: 8.97,
    high52: 290.96,
    low52: 227.78,
    open: 272.36,
    prevClose: 272.36,
    sector: "Financial Services",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 147.62,
    change: -0.35,
    changePercent: -0.24,
    marketCap: 355000000000,
    volume: 6800000,
    avgVolume: 7300000,
    pe: 9.2,
    dividend: 4.76,
    eps: 16.05,
    high52: 169.45,
    low52: 143.29,
    open: 147.97,
    prevClose: 147.97,
    sector: "Healthcare",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Johnson_and_Johnson_Logo.svg"
  }
];

// Mock portfolio holdings
export const mockPortfolio: PortfolioHolding[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    averageCost: 165.75,
    currentPrice: 182.52,
    change: 1.25,
    changePercent: 0.69,
    value: 4563.00,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    color: "#E35756"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 10,
    averageCost: 390.25,
    currentPrice: 417.88,
    change: 2.45,
    changePercent: 0.59,
    value: 4178.80,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    color: "#3D87FC"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 5,
    averageCost: 750.50,
    currentPrice: 942.89,
    change: 13.56,
    changePercent: 1.46,
    value: 4714.45,
    sector: "Technology",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    color: "#78B954"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 15,
    averageCost: 170.30,
    currentPrice: 186.45,
    change: 1.18,
    changePercent: 0.64,
    value: 2796.75,
    sector: "Consumer Cyclical",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    color: "#F7C75C"
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    shares: 12,
    averageCost: 180.15,
    currentPrice: 198.44,
    change: 0.75,
    changePercent: 0.38,
    value: 2381.28,
    sector: "Financial Services",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/J.P._Morgan_Logo_2008_1.svg",
    color: "#9B87F5"
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    shares: 10,
    averageCost: 152.75,
    currentPrice: 147.62,
    change: -0.35,
    changePercent: -0.24,
    value: 1476.20,
    sector: "Healthcare",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Johnson_and_Johnson_Logo.svg",
    color: "#5DD9D4"
  }
];

// Calculate portfolio value
export const portfolioValue = mockPortfolio.reduce((total, holding) => total + holding.value, 0);

// Calculate portfolio performance
export const portfolioPerformance = {
  totalValue: portfolioValue,
  totalInvested: mockPortfolio.reduce((total, holding) => total + (holding.shares * holding.averageCost), 0),
  totalGainLoss: mockPortfolio.reduce((total, holding) => total + (holding.shares * (holding.currentPrice - holding.averageCost)), 0),
  totalGainLossPercent: 0,
  dailyChange: 245.68,
  dailyChangePercent: 1.23,
  weeklyChange: 532.25,
  weeklyChangePercent: 2.75,
  monthlyChange: 1245.75,
  monthlyChangePercent: 6.65,
  yearlyChange: 3721.50,
  yearlyChangePercent: 22.89,
  historicalData: generateTimeSeriesData(365, portfolioValue * 0.75, 0.01, 0.0012)
};

// Calculate total gain/loss percentage
portfolioPerformance.totalGainLossPercent = 
  (portfolioPerformance.totalGainLoss / portfolioPerformance.totalInvested) * 100;

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    type: "buy",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 5,
    price: 168.82,
    date: format(subDays(new Date(), 55), "yyyy-MM-dd"),
    total: 844.10
  },
  {
    id: "tx-2",
    type: "buy",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 3,
    price: 395.45,
    date: format(subDays(new Date(), 43), "yyyy-MM-dd"),
    total: 1186.35
  },
  {
    id: "tx-3",
    type: "sell",
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 2,
    price: 195.21,
    date: format(subDays(new Date(), 38), "yyyy-MM-dd"),
    total: 390.42
  },
  {
    id: "tx-4",
    type: "buy",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 2,
    price: 802.75,
    date: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    total: 1605.50
  },
  {
    id: "tx-5",
    type: "buy",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 5,
    price: 175.35,
    date: format(subDays(new Date(), 22), "yyyy-MM-dd"),
    total: 876.75
  },
  {
    id: "tx-6",
    type: "buy",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    shares: 4,
    price: 185.23,
    date: format(subDays(new Date(), 15), "yyyy-MM-dd"),
    total: 740.92
  },
  {
    id: "tx-7",
    type: "buy",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 3,
    price: 180.15,
    date: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    total: 540.45
  },
  {
    id: "tx-8",
    type: "buy",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 1,
    price: 900.50,
    date: format(subDays(new Date(), 3), "yyyy-MM-dd"),
    total: 900.50
  }
];

// Mock news articles
export const mockArticles: Article[] = [
  {
    id: "article-1",
    title: "Apple Announces New AI Features for iOS 18",
    summary: "Apple unveils groundbreaking AI features coming to iOS 18, focusing on privacy and seamless integration.",
    source: "TechCrunch",
    imageUrl: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    date: format(subDays(new Date(), 1), "MMM dd, yyyy"),
    url: "#"
  },
  {
    id: "article-2",
    title: "NVIDIA Surpasses $2.3 Trillion Market Cap on AI Boom",
    summary: "NVIDIA becomes the world's most valuable company as AI demand continues to propel semiconductor stocks.",
    source: "Bloomberg",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    date: format(subDays(new Date(), 2), "MMM dd, yyyy"),
    url: "#"
  },
  {
    id: "article-3",
    title: "Fed Signals Potential Rate Cuts After Inflation Eases",
    summary: "Federal Reserve hints at possible rate cuts later this year as inflation shows signs of cooling down.",
    source: "Wall Street Journal",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    date: format(subDays(new Date(), 3), "MMM dd, yyyy"),
    url: "#"
  },
  {
    id: "article-4",
    title: "Microsoft's Cloud Revenue Surges, Boosting Quarterly Results",
    summary: "Microsoft reports strong quarterly earnings driven by continued growth in Azure cloud services and AI investments.",
    source: "CNBC",
    imageUrl: "https://images.unsplash.com/photo-1553484771-689277e6e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    date: format(subDays(new Date(), 4), "MMM dd, yyyy"),
    url: "#"
  },
  {
    id: "article-5",
    title: "Amazon Expands Healthcare Initiative with New Acquisition",
    summary: "Amazon continues healthcare push with strategic acquisition, aiming to disrupt the traditional healthcare market.",
    source: "Reuters",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    date: format(subDays(new Date(), 5), "MMM dd, yyyy"),
    url: "#"
  }
];

// Mock profile data
export const mockProfile: ProfileData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatar: "https://github.com/shadcn.png",
  joinedDate: format(subYears(new Date(), 2), "MMMM yyyy"),
  investmentGoal: "Retirement",
  riskTolerance: "medium",
  investmentStyle: "mixed",
  favoriteSectors: ["Technology", "Healthcare", "Financial Services"],
  milestones: [
    {
      date: format(subYears(new Date(), 2), "MMMM yyyy"),
      title: "Started Investing",
      description: "Made first investment in Apple (AAPL)"
    },
    {
      date: format(subMonths(subYears(new Date(), 1), 6), "MMMM yyyy"),
      title: "Portfolio Diversity",
      description: "Added first ETF to portfolio"
    },
    {
      date: format(subMonths(new Date(), 9), "MMMM yyyy"),
      title: "Reached $10K",
      description: "Portfolio value exceeded $10,000"
    },
    {
      date: format(subMonths(new Date(), 3), "MMMM yyyy"),
      title: "First Dividend",
      description: "Received first dividend payment"
    },
    {
      date: format(subWeeks(new Date(), 2), "MMMM yyyy"),
      title: "20% Return",
      description: "Achieved 20% annual return"
    }
  ]
};

// Financial glossary terms
export const financialGlossary = [
  {
    term: "Bear Market",
    definition: "A market condition in which the prices of securities are falling, and widespread pessimism causes the negative sentiment to be self-sustaining."
  },
  {
    term: "Bull Market",
    definition: "A financial market of a group of securities in which prices are rising or are expected to rise."
  },
  {
    term: "Dividend",
    definition: "A distribution of a portion of a company's earnings, decided by the board of directors, to a class of its shareholders."
  },
  {
    term: "ETF (Exchange-Traded Fund)",
    definition: "A type of investment fund and exchange-traded product, with shares that trade on stock exchanges."
  },
  {
    term: "Market Capitalization",
    definition: "The total dollar market value of a company's outstanding shares, calculated by multiplying the total number of a company's outstanding shares by the current market price of one share."
  },
  {
    term: "P/E Ratio (Price-to-Earnings Ratio)",
    definition: "A valuation ratio of a company's current share price compared to its per-share earnings."
  },
  {
    term: "Volatility",
    definition: "A statistical measure of the dispersion of returns for a given security or market index."
  },
  {
    term: "Yield",
    definition: "The income return on an investment, such as the interest or dividends received from holding a particular security."
  },
  {
    term: "Blue Chip",
    definition: "A nationally recognized, well-established, and financially sound company that typically offers reliable products or services, significant dividends, and consistent growth."
  },
  {
    term: "Capital Gain",
    definition: "An increase in the value of a capital asset that gives it a higher worth than the purchase price."
  }
];

// Create sector allocation data
export const sectorAllocation = [
  { name: "Technology", value: 70, color: "#9b87f5" },
  { name: "Consumer Cyclical", value: 15, color: "#F7C75C" },
  { name: "Financial Services", value: 10, color: "#5DD9D4" },
  { name: "Healthcare", value: 5, color: "#E35756" }
];

// Generated portfolio pulse metrics (mock health score)
export const portfolioPulseMetrics = {
  diversificationScore: 65, // 0-100, higher is better
  riskScore: 72, // 0-100, higher means more risk
  performanceScore: 85, // 0-100, higher is better
  overallHealth: 76, // 0-100, higher is better
  recommendations: [
    "Consider adding more healthcare stocks to improve diversification",
    "Your technology exposure is relatively high",
    "Add some bonds to reduce overall portfolio risk"
  ]
};
