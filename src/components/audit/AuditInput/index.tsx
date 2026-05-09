import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Upload, Link2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PasteTab from "./PasteTab";
import UploadTab from "./UploadTab";
import UrlTab from "./UrlTab";

interface AuditInputProps {
  code: string;
  fileName: string;
  isLoading: boolean;
  onCodeChange: (code: string) => void;
  onFileLoad: (code: string, fileName: string) => void;
  onRunAudit: () => void;
}

type InputTab = "paste" | "upload" | "url";

const TABS: { id: InputTab; label: string; icon: React.ReactNode }[] = [
  { id: "paste", label: "Paste Code", icon: <Code2 className="w-4 h-4" /> },
  { id: "upload", label: "Upload File", icon: <Upload className="w-4 h-4" /> },
  { id: "url", label: "From URL", icon: <Link2 className="w-4 h-4" /> },
];

const AuditInput = ({
  code,
  fileName,
  isLoading,
  onCodeChange,
  onFileLoad,
  onRunAudit,
}: AuditInputProps) => {
  const [activeTab, setActiveTab] = useState<InputTab>("paste");
  const [url, setUrl] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
    >
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "paste" && (
        <PasteTab code={code} onChange={onCodeChange} />
      )}
      {activeTab === "upload" && (
        <UploadTab code={code} fileName={fileName} onFileLoad={onFileLoad} />
      )}
      {activeTab === "url" && <UrlTab url={url} onChange={setUrl} />}

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          {code
            ? `${code.split("\n").length} lines · ${(code.length / 1024).toFixed(1)} KB`
            : "No code loaded"}
        </p>
        <Button
          onClick={onRunAudit}
          disabled={isLoading || !code.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Run Audit
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default AuditInput;
