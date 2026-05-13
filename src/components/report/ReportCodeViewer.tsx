import { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Wand2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { formatFixedCode } from "@/components/audit/aiService";

interface ReportCodeViewerProps {
  originalCode: string;
  fixedCode: string;
  originalScore: number;
  fixedScore: number;
}

const CodePanel = ({
  title,
  code,
  icon,
  score,
  isDark,
  badge,
  scoreColor,
}: {
  title: string;
  code: string;
  icon: React.ReactNode;
  score: number;
  isDark: boolean;
  badge?: string;
  scoreColor: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
          {badge && (
            <span className="text-xs hidden sm:block px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold ${scoreColor}`}>{score}/100</span>
          <button
            onClick={handleCopy}
            className="text-xs flex items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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
      </div>
      {/* Code */}
      <div className="max-h-72 overflow-auto">
        <SyntaxHighlighter
          language="html"
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            fontSize: "11px",
            background: "transparent",
            padding: "12px",
            overflowX: "auto",
          }}
          showLineNumbers
          wrapLines
          wrapLongLines
        >
          {code || "// No code available"}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const getScoreColor = (score: number) =>
  score >= 80
    ? "text-green-500"
    : score >= 50
      ? "text-amber-500"
      : "text-red-500";

const ReportCodeViewer = ({
  originalCode,
  fixedCode,
  originalScore,
  fixedScore,
}: ReportCodeViewerProps) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const formatted = formatFixedCode(fixedCode);
  const diff = fixedScore - originalScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-1">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 text-sm">
          <Code2 className="w-4 h-4 text-blue-500" />
          Code Comparison
        </h2>
        {diff > 0 && (
          <span className="text-xs text-green-500 font-semibold">
            +{diff} score improvement after fix
          </span>
        )}
      </div>

      {/* Panels — stacked on mobile, side by side on lg */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <CodePanel
            title="Original Code"
            code={originalCode}
            icon={<Code2 className="w-3.5 h-3.5 text-gray-400" />}
            score={originalScore}
            scoreColor={getScoreColor(originalScore)}
            isDark={isDark}
          />
        </div>
        <div className="flex-1 min-w-0">
          <CodePanel
            title="AI Fixed Code"
            code={formatted}
            icon={<Wand2 className="w-3.5 h-3.5 text-green-500" />}
            score={fixedScore}
            scoreColor={getScoreColor(fixedScore)}
            isDark={isDark}
            badge="AI Fixed"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCodeViewer;
