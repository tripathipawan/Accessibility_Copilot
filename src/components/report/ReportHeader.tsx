import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportHeaderProps {
  fileName: string;
  date: string;
  score: number;
}

const ReportHeader = ({ fileName, date, score }: ReportHeaderProps) => {
  const navigate = useNavigate();
  const formatted = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const scoreLabel =
    score >= 80
      ? "Excellent"
      : score >= 50
        ? "Needs Improvement"
        : "Critical Issues";
  const scoreBg =
    score >= 80
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      : score >= 50
        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/audit")}
        className="mb-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 -ml-2"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Audit
      </Button>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Accessibility Report
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5" />
              {fileName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatted}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${scoreBg}`}
        >
          {scoreLabel}
        </span>
      </div>
    </motion.div>
  );
};

export default ReportHeader;
