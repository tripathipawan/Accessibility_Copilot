/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppDispatch";
import ReportHeader from "@/components/report/ReportHeader";
import ReportScoreCard from "@/components/report/ReportScoreCard";
import ReportCategories from "@/components/report/ReportCategories";
import ReportIssues from "@/components/report/ReportIssues";
import ReportCodeViewer from "@/components/report/ReportCodeViewer";
import ReportActions from "@/components/report/ReportActions";

// Estimate fixed score
const estimateFixedScore = (score: number) =>
  Math.min(100, score + Math.round((100 - score) * 0.75));

const NoDataState = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060612] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          No Audit Data Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Run an audit first to generate a report.
        </p>
        <Button
          onClick={() => navigate("/audit")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          Go to Audit
        </Button>
      </motion.div>
    </div>
  );
};

const Report = () => {
  const navigate = useNavigate();
  const { currentAudit } = useAppSelector((state) => state.audit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!currentAudit) return <NoDataState />;

  const fixedScore = estimateFixedScore(currentAudit.score);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060612] pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ReportHeader
          fileName={currentAudit.fileName}
          date={currentAudit.date}
          score={currentAudit.score}
        />

        <div className="space-y-6">
          {/* Score + Categories Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportScoreCard
              score={currentAudit.score}
              issues={currentAudit.issues}
            />
            <ReportCategories categories={currentAudit.categories} />
          </div>

          {/* Actions */}
          <ReportActions audit={currentAudit} />

          {/* Code Comparison */}
          <ReportCodeViewer
            originalCode={currentAudit.originalCode}
            fixedCode={currentAudit.fixedCode}
            originalScore={currentAudit.score}
            fixedScore={fixedScore}
          />

          {/* All Issues */}
          <ReportIssues issues={currentAudit.issues} />

          {/* Bottom Actions */}
          <ReportActions audit={currentAudit} />
        </div>
      </div>
    </div>
  );
};

export default Report;
