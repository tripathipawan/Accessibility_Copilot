import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import ScoreRing from "./ScoreRing";
import type { AuditIssue } from "../types";

interface ScoreCardProps {
  score: number;
  issues: AuditIssue[];
}

const ScoreCard = ({ score, issues }: ScoreCardProps) => {
  const critical = issues.filter((i) => i.type === "critical").length;
  const warning = issues.filter((i) => i.type === "warning").length;
  const good = issues.filter((i) => i.type === "good").length;

  const message =
    score >= 80
      ? "Excellent! Minor improvements possible."
      : score >= 50
        ? "Moderate issues found. Review warnings."
        : "Critical issues detected. Immediate fixes recommended.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <ScoreRing score={score} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Accessibility Score
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {message}
          </p>
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
            <div className="bg-red-50 dark:bg-red-950/20 rounded-lg px-2 py-1.5 text-center">
              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                {critical}
              </p>
              <p className="text-xs text-red-500">Critical</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg px-2 py-1.5 text-center">
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {warning}
              </p>
              <p className="text-xs text-amber-500">Warnings</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg px-2 py-1.5 text-center">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {good}
              </p>
              <p className="text-xs text-green-500">Passing</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
