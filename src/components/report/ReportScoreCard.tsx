import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface ReportScoreCardProps {
  score: number;
  issues: { type: string }[];
}

const ReportScoreCard = ({ score, issues }: ReportScoreCardProps) => {
  const critical = issues.filter((i) => i.type === "critical").length;
  const warning = issues.filter((i) => i.type === "warning").length;
  const good = issues.filter((i) => i.type === "good").length;

  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-blue-500" />
        <h2 className="font-semibold text-gray-700 dark:text-gray-300">
          Accessibility Score
        </h2>
      </div>

      <div className="flex items-center gap-8">
        {/* Score Ring */}
        <div className="relative flex items-center justify-center w-36 h-36 flex-shrink-0">
          <svg width="144" height="144" className="-rotate-90">
            <circle
              cx="72"
              cy="72"
              r={radius}
              fill="none"
              stroke="currentColor"
              className="text-gray-100 dark:text-gray-800"
              strokeWidth="10"
            />
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute text-center">
            <motion.span
              className="text-3xl font-bold"
              style={{ color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score}
            </motion.span>
            <p className="text-xs text-gray-500 dark:text-gray-400">/100</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 grid grid-cols-3 gap-3">
          <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-3 text-center border border-red-100 dark:border-red-900">
            <AlertCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {critical}
            </p>
            <p className="text-xs text-red-500 font-medium">Critical</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-3 text-center border border-amber-100 dark:border-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {warning}
            </p>
            <p className="text-xs text-amber-500 font-medium">Warnings</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-3 text-center border border-green-100 dark:border-green-900">
            <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {good}
            </p>
            <p className="text-xs text-green-500 font-medium">Passing</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportScoreCard;
