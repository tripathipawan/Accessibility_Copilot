import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowRight,
  AlertTriangle,
  ExternalLink,
  Trash2,
} from "lucide-react";
import type { AuditResult } from "@/components/audit/types";

// ─── Helpers

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const scoreColor = (score: number) =>
  score >= 80
    ? "text-emerald-600 dark:text-emerald-400"
    : score >= 50
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";

const scoreBg = (score: number) =>
  score >= 80
    ? "bg-emerald-50 dark:bg-emerald-950/30"
    : score >= 50
      ? "bg-amber-50 dark:bg-amber-950/30"
      : "bg-red-50 dark:bg-red-950/30";

// ─── Empty State

const EmptyAuditState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
      <Shield className="w-7 h-7 text-gray-400" />
    </div>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
      No audits yet. Run your first audit!
    </p>
    <Link
      to="/audit"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all"
    >
      Start First Audit
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

// ─── Audit Row

interface AuditRowProps {
  audit: AuditResult;
  index: number;
  onViewReport: (audit: AuditResult) => void;
}

const AuditRow = ({ audit, index, onViewReport }: AuditRowProps) => (
  <motion.div
    key={audit.id}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 * index }}
    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
  >
    {/* Score badge */}
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${scoreBg(audit.score)}`}
    >
      <span className={`text-sm font-bold ${scoreColor(audit.score)}`}>
        {audit.score}
      </span>
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
        {audit.fileName}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{formatDate(audit.date)}</p>
    </div>

    {/* Critical badge */}
    <div className="flex items-center gap-1.5">
      {audit.issues.filter((i) => i.type === "critical").length > 0 && (
        <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-lg">
          <AlertTriangle className="w-3 h-3" />
          {audit.issues.filter((i) => i.type === "critical").length}
        </span>
      )}
    </div>

    {/* View Report */}
    <button
      onClick={() => onViewReport(audit)}
      className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 flex-shrink-0 opacity-100 sm:group-hover:opacity-100 transition-opacity"
    >
      <ExternalLink className="w-3 h-3" />
      <span className="hidden sm:inline">Report</span>
    </button>
  </motion.div>
);

// ─── DashboardAuditList

interface DashboardAuditListProps {
  history: AuditResult[];
  onViewReport: (audit: AuditResult) => void;
  onClearHistory: () => void;
}

const DashboardAuditList = ({
  history,
  onViewReport,
  onClearHistory,
}: DashboardAuditListProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35 }}
    className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
  >
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
      <h2 className="font-semibold text-gray-900 dark:text-white">
        Recent Audits
      </h2>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">{history.length} total</span>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>
    </div>

    {/* Body */}
    {history.length === 0 ? (
      <EmptyAuditState />
    ) : (
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {history.slice(0, 6).map((audit, i) => (
          <AuditRow
            key={audit.id}
            audit={audit}
            index={i}
            onViewReport={onViewReport}
          />
        ))}
      </div>
    )}
  </motion.div>
);

export default DashboardAuditList;
