/* eslint-disable react-hooks/purity */
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

// ─── Types
export interface ChartDataPoint {
  name: string;
  score: number;
  index: number;
}

interface DashboardChartProps {
  chartData: ChartDataPoint[];
}

const LazyAreaChart = lazy(() =>
  import("./DashboardChartInner").then((mod) => ({ default: mod.ChartInner })),
);

const ChartSkeleton = () => (
  <div className="w-full h-[180px] flex items-end gap-1 px-2 pb-2">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="flex-1 rounded-t bg-gray-100 dark:bg-gray-800 animate-pulse"
        style={{ height: `${30 + Math.random() * 70}%` }}
      />
    ))}
  </div>
);

// ─── DashboardChart — main export
const DashboardChart = ({ chartData }: DashboardChartProps) => {
  if (chartData.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-blue-500" />
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Score History
        </h2>
        <span className="text-xs text-gray-400 ml-auto">
          Last {chartData.length} audits
        </span>
      </div>

      {/* ✅ Suspense fallback = skeleton chart */}
      <Suspense fallback={<ChartSkeleton />}>
        <LazyAreaChart chartData={chartData} />
      </Suspense>
    </motion.div>
  );
};

export default DashboardChart;
