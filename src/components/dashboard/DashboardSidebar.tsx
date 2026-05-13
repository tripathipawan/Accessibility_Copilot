import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import type { AuditResult } from "@/components/audit/types";

// ─── RunAuditCard ─────────────────────────────────────────────────────────────

const RunAuditCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
  >
    <Shield className="w-8 h-8 text-white/80 mb-3" />
    <h3 className="font-bold text-lg mb-2">Run New Audit</h3>
    <p className="text-white/70 text-sm mb-4 leading-relaxed">
      Paste your HTML or React code and get AI-powered accessibility fixes
      instantly.
    </p>
    <Link
      to="/audit"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 transition-all"
    >
      Start Audit
      <ArrowRight className="w-4 h-4" />
    </Link>
  </motion.div>
);

// ─── PlanCard ─────────────────────────────────────────────────────────────────

interface PlanCardProps {
  auditCount: number;
}

const PlanCard = ({ auditCount }: PlanCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.45 }}
    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
        Free Plan
      </h3>
      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg">
        Current
      </span>
    </div>
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-500">Daily Audits</span>
        <span className="text-gray-900 dark:text-white font-medium">
          {auditCount}/5
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((auditCount / 5) * 100, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        />
      </div>
    </div>
    <Link
      to="/#pricing"
      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
    >
      Upgrade to Pro →
    </Link>
  </motion.div>
);

// ─── ScoreSummaryCard ─────────────────────────────────────────────────────────

interface ScoreSummaryCardProps {
  history: AuditResult[];
  avgScore: number;
}

const ScoreSummaryCard = ({ history, avgScore }: ScoreSummaryCardProps) => {
  if (history.length === 0) return null;

  const items = [
    {
      label: "Best Score",
      value: Math.max(...history.map((a) => a.score)),
      color: "text-green-500",
    },
    {
      label: "Worst Score",
      value: Math.min(...history.map((a) => a.score)),
      color: "text-red-500",
    },
    {
      label: "Average",
      value: avgScore,
      color: "text-blue-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
        Score Breakdown
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className={`font-bold ${item.color}`}>{item.value}/100</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── DashboardSidebar ─────────────────────────────────────────────────────────

interface DashboardSidebarProps {
  history: AuditResult[];
  avgScore: number;
}

const DashboardSidebar = ({ history, avgScore }: DashboardSidebarProps) => (
  <div className="flex flex-col gap-4">
    <RunAuditCard />
    <PlanCard auditCount={history.length} />
    <ScoreSummaryCard history={history} avgScore={avgScore} />
  </div>
);

export default DashboardSidebar;
