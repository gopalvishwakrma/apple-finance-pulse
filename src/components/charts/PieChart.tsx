
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 border rounded-lg shadow-lg p-3 backdrop-blur-sm border-border">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-base font-semibold">{payload[0].value}%</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <ul className="flex flex-wrap gap-4 justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <li key={`legend-${index}`} className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}: {entry.payload.value}%</span>
        </li>
      ))}
    </ul>
  );
};

const PieChart = ({
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 90,
  showLegend = true
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
          strokeWidth={2}
          stroke="#ffffff"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend content={<CustomLegend />} />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
