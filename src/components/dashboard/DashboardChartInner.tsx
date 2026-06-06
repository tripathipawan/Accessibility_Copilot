import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { ChartDataPoint } from "./DashboardChart";

// ─── Custom Tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
      <p className="font-bold text-blue-600 dark:text-blue-400">
        {payload[0].value}/100
      </p>
    </div>
  );
};

export const ChartInner = ({ chartData }: { chartData: ChartDataPoint[] }) => (
  <ResponsiveContainer width="100%" height={180}>
    <AreaChart
      data={chartData}
      margin={{ top: 5, right: 10, bottom: 0, left: -20 }}
    >
      <defs>
        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#f0f0f0"
        className="dark:opacity-20"
      />
      <XAxis
        dataKey="name"
        tick={{ fontSize: 11, fill: "#9ca3af" }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        domain={[0, 100]}
        tick={{ fontSize: 11, fill: "#9ca3af" }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip content={<CustomTooltip />} />
      <Area
        type="monotone"
        dataKey="score"
        stroke="#3b82f6"
        strokeWidth={2.5}
        fill="url(#scoreGrad)"
        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, fill: "#6366f1" }}
      />
    </AreaChart>
  </ResponsiveContainer>
);
