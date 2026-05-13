import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";

interface Issue {
  id: string;
  type: "critical" | "warning" | "good";
  title: string;
  description: string;
  element: string;
  line?: number;
  fix: string;
  wcag: string;
}

const STYLES = {
  critical: {
    bg: "bg-red-50 dark:bg-red-950/20",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    icon: <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />,
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    icon: <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />,
  },
  good: {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    icon: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />,
  },
};

type Filter = "all" | "critical" | "warning" | "good";

const IssueRow = ({ issue }: { issue: Issue }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const s = STYLES[issue.type];

  const copyFix = () => {
    navigator.clipboard.writeText(issue.fix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      className={`rounded-xl border ${s.bg} ${s.border} overflow-hidden`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        className="w-full px-4 py-3 flex items-start gap-3 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="mt-0.5">{s.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {issue.title}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badge}`}
            >
              {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
            </span>
            {issue.wcag && (
              <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {issue.wcag}
              </span>
            )}
          </div>
          {issue.element && (
            <code className="text-xs text-gray-400 mt-1 block truncate">
              {issue.element}
            </code>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-current/10">
              <p className="text-sm text-gray-600 dark:text-gray-300 pt-3">
                {issue.description}
              </p>
              {issue.type !== "good" && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Suggested Fix
                    </span>
                    <button
                      onClick={copyFix}
                      className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {issue.fix}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ReportIssues = ({ issues }: { issues: Issue[] }) => {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = issues.filter((i) => filter === "all" || i.type === filter);

  const counts = {
    all: issues.length,
    critical: issues.filter((i) => i.type === "critical").length,
    warning: issues.filter((i) => i.type === "warning").length,
    good: issues.filter((i) => i.type === "good").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-blue-500" />
          <h2 className="font-semibold text-gray-700 dark:text-gray-300">
            Issues ({filtered.length})
          </h2>
        </div>
        <div className="flex gap-1 flex-wrap">
          {(["all", "critical", "warning", "good"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {f} ({counts[f]})
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-2">
        {filtered.length > 0 ? (
          filtered.map((issue) => <IssueRow key={issue.id} issue={issue} />)
        ) : (
          <p className="text-center text-sm text-gray-400 py-8">
            No issues in this category.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ReportIssues;
