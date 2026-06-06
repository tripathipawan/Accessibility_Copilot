import { useState, lazy, Suspense } from "react";
import {
  Eye,
  Wand2,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { formatFixedCode } from "../aiService";

const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({
    default: mod.Prism,
  })),
);
const getDarkStyle = () =>
  import("react-syntax-highlighter/dist/esm/styles/prism").then(
    (mod) => mod.oneDark,
  );
const getLightStyle = () =>
  import("react-syntax-highlighter/dist/esm/styles/prism").then(
    (mod) => mod.oneLight,
  );

import { useEffect, useState as useStateAlias } from "react";

const useHighlightStyle = (isDark: boolean) => {
  const [style, setStyle] = useStateAlias<object | null>(null);

  useEffect(() => {
    const loader = isDark ? getDarkStyle : getLightStyle;
    loader().then(setStyle);
  }, [isDark]);

  return style;
};

type ViewTab = "original" | "fixed";

interface CodeViewerProps {
  originalCode: string;
  fixedCode: string;
  originalScore: number;
  fixedScore?: number;
}

// ─── Score Badge
const ScoreBadge = ({ score, label }: { score: number; label: string }) => {
  const color =
    score >= 80
      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
      : score >= 50
        ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
        : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-semibold ${color}`}
    >
      <span>{label}</span>
      <span className="text-base font-bold">{score}</span>
      <span className="font-normal opacity-70">/100</span>
    </div>
  );
};

// ─── Score Diff
const ScoreDiff = ({ before, after }: { before: number; after: number }) => {
  const diff = after - before;
  if (diff === 0)
    return (
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Minus className="w-3 h-3" />
        <span>No change</span>
      </div>
    );
  if (diff > 0)
    return (
      <div className="flex items-center gap-1 text-xs font-semibold text-green-500">
        <TrendingUp className="w-3 h-3" />
        <span>+{diff} improvement</span>
      </div>
    );
  return (
    <div className="flex items-center gap-1 text-xs font-semibold text-red-500">
      <TrendingDown className="w-3 h-3" />
      <span>{diff} decrease</span>
    </div>
  );
};

const CodeFallback = ({ code }: { code: string }) => (
  <pre
    className="m-0 p-4 text-[12px] font-mono text-gray-700 dark:text-gray-300 
    bg-transparent overflow-auto max-h-56 whitespace-pre-wrap break-all leading-relaxed"
  >
    {code || "// No code available"}
  </pre>
);

// ─── Main Component
const CodeViewer = ({
  originalCode,
  fixedCode,
  originalScore,
  fixedScore,
}: CodeViewerProps) => {
  const [viewTab, setViewTab] = useState<ViewTab>("original");
  const [copied, setCopied] = useState(false);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const highlightStyle = useHighlightStyle(isDark);

  const formattedFixed = formatFixedCode(fixedCode);
  const displayCode = viewTab === "original" ? originalCode : formattedFixed;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      {/* ── Score Bar  */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-3 flex-wrap">
        <ScoreBadge score={originalScore} label="Before" />
        {fixedScore !== undefined && (
          <>
            <span className="text-gray-300 dark:text-gray-600 text-lg">→</span>
            <ScoreBadge score={fixedScore} label="After Fix" />
            <ScoreDiff before={originalScore} after={fixedScore} />
          </>
        )}
      </div>

      {/* ── Tab Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-1">
          <button
            onClick={() => setViewTab("original")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              viewTab === "original"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <Eye className="w-3 h-3" />
            Original
          </button>
          <button
            onClick={() => setViewTab("fixed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
              viewTab === "fixed"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <Wand2 className="w-3 h-3" />
            AI Fixed
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" /> Copy
            </>
          )}
        </button>
      </div>

      <div className="max-h-56 overflow-auto max-w-full">
        <Suspense fallback={<CodeFallback code={displayCode} />}>
          {highlightStyle ? (
            <SyntaxHighlighter
              language="html"
              style={highlightStyle as never}
              customStyle={{
                margin: 0,
                fontSize: "12px",
                background: "transparent",
                padding: "16px",
                maxWidth: "100%",
                wordBreak: "break-all",
              }}
              showLineNumbers
              wrapLines={true}
              wrapLongLines={true}
            >
              {displayCode || "// No code available"}
            </SyntaxHighlighter>
          ) : (
            <CodeFallback code={displayCode} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default CodeViewer;
