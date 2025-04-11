import { useMemo } from "react";
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { format, parseISO } from "date-fns";
import { TimeSeriesData } from "@/utils/mockData";

interface LineChartProps {
  data: TimeSeriesData[];
  lineColor?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  showTooltip?: boolean;
  valuePrefix?: string;
  isPositive?: boolean;
  customTooltip?: boolean;
}

const CustomTooltip = ({ active, payload, label, valuePrefix }: any) => {
  if (active && payload && payload.length) {
    const date = parseISO(label);
    const formattedDate = format(date, 'MMM d, yyyy');
    const value = payload[0].value;
    
    return (
      <div className="bg-background/95 border rounded-lg shadow-lg p-3 backdrop-blur-sm border-border">
        <p className="text-sm text-muted-foreground mb-1">{formattedDate}</p>
        <p className="text-base font-semibold">
          {valuePrefix}{typeof value === 'number' ? value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}
        </p>
      </div>
    );
  }

  return null;
};

const LineChart = ({
  data,
  lineColor = "#9b87f5",
  height = 300,
  showGrid = true,
  showAxis = true,
  showTooltip = true,
  valuePrefix = "$",
  isPositive = true,
  customTooltip = true
}: LineChartProps) => {
  const chartColor = isPositive ? lineColor : "#ea384c";
  
  const formatXAxis = (tickItem: string) => {
    const date = parseISO(tickItem);
    
    // If the data span is one day, format as time
    if (data.length <= 24) {
      return format(date, 'h:mm a');
    }
    
    // If the data span is less than a month, format as day
    if (data.length <= 31) {
      return format(date, 'MMM d');
    }
    
    // If the data span is less than a year, format as month
    if (data.length <= 365) {
      return format(date, 'MMM');
    }
    
    // Otherwise, format as year
    return format(date, 'yyyy');
  };
  
  // Calculate min and max values for the y-axis with a margin
  const yDomain = useMemo(() => {
    if (!data.length) return [0, 0];
    
    const values = data.map(item => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const margin = (max - min) * 0.1; // 10% margin
    
    return [Math.max(0, min - margin), max + margin];
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: showAxis ? 30 : 0,
          bottom: showAxis ? 20 : 0
        }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(148, 163, 184, 0.15)"
          />
        )}
        
        {showAxis && (
          <>
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              minTickGap={20}
            />
            <YAxis
              domain={yDomain}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(value) => `${valuePrefix}${value.toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })}`}
            />
          </>
        )}
        
        {showTooltip && (
          <Tooltip
            content={customTooltip ? <CustomTooltip valuePrefix={valuePrefix} /> : undefined}
            cursor={{ stroke: "rgba(148, 163, 184, 0.2)" }}
          />
        )}
        
        <Line
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: chartColor, strokeWidth: 0 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
