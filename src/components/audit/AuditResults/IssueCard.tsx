import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from "lucide-react";
import type { AuditIssue } from "../types";

const ISSUE_STYLES = {
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

interface IssueCardProps {
  issue: AuditIssue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const styles = ISSUE_STYLES[issue.type];

  const copyFix = () => {
    navigator.clipboard.writeText(issue.fix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      className={`rounded-xl border ${styles.bg} ${styles.border} overflow-hidden`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <button
        className="w-full px-3 py-3 flex items-start gap-2 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Icon */}
        <div className="mt-0.5 flex-shrink-0">{styles.icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100 leading-snug">
              {issue.title}
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles.badge}`}
            >
              {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
            </span>
            {issue.wcag && (
              <span className="text-xs px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 break-words">
                {issue.wcag}
              </span>
            )}
          </div>

          {/* Element snippet */}
          {issue.element && (
            <code className="text-xs text-gray-400 dark:text-gray-500 mt-1 block truncate">
              {issue.element}
            </code>
          )}
        </div>
      </button>

      {/* Expanded Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-current/10">
              <p className="text-sm text-gray-600 dark:text-gray-300 pt-3 leading-relaxed">
                {issue.description}
              </p>
              {issue.type !== "good" && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Suggested Fix
                    </span>
                    <button
                      onClick={copyFix}
                      className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 flex-shrink-0"
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
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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

export default IssueCard;
