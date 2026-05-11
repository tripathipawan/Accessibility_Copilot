import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

interface ReportCategoriesProps {
  categories: {
    semantic: number;
    images: number;
    forms: number;
    keyboard: number;
    aria: number;
    contrast: number;
  };
}

const CategoryBar = ({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) => {
  const color =
    value >= 80 ? "bg-green-500" : value >= 50 ? "bg-amber-500" : "bg-red-500";
  const textColor =
    value >= 80
      ? "text-green-600 dark:text-green-400"
      : value >= 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-1.5"
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400 capitalize font-medium">
          {label}
        </span>
        <span className={`font-bold ${textColor}`}>{value}/100</span>
      </div>
      <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay }}
        />
      </div>
    </motion.div>
  );
};

const ReportCategories = ({ categories }: ReportCategoriesProps) => {
  const entries = Object.entries(categories);
  const avg = Math.round(
    entries.reduce((s, [, v]) => s + v, 0) / entries.length,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-500" />
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">
            Category Breakdown
          </h2>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Avg: <strong className="text-gray-900 dark:text-white">{avg}</strong>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([key, val], i) => (
          <CategoryBar key={key} label={key} value={val} delay={i * 0.1} />
        ))}
      </div>
    </motion.div>
  );
};

export default ReportCategories;
