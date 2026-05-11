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
}: {
  title: string;
  code: string;
  icon: React.ReactNode;
  score: number;
  isDark: boolean;
  badge?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const scoreColor =
    score >= 80
      ? "text-green-500"
      : score >= 50
        ? "text-amber-500"
        : "text-red-500";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {title}
          </span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
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
      <div className="max-h-96 overflow-auto">
        <SyntaxHighlighter
          language="html"
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            fontSize: "12px",
            background: "transparent",
            padding: "16px",
          }}
          showLineNumbers
          wrapLines
        >
          {code || "// No code available"}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

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
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-500" />
          Code Comparison
        </h2>
        {diff > 0 && (
          <span className="text-sm text-green-500 font-semibold">
            +{diff} score improvement after fix
          </span>
        )}
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        <CodePanel
          title="Original Code"
          code={originalCode}
          icon={<Code2 className="w-3.5 h-3.5 text-gray-400" />}
          score={originalScore}
          isDark={isDark}
        />
        <CodePanel
          title="AI Fixed Code"
          code={formatted}
          icon={<Wand2 className="w-3.5 h-3.5 text-green-500" />}
          score={fixedScore}
          isDark={isDark}
          badge="AI Fixed"
        />
      </div>
    </motion.div>
  );
};

export default ReportCodeViewer;
