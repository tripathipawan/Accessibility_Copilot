import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  setLoading,
  setAuditResult,
  setError,
  clearCurrentAudit,
} from "@/store/slices/auditSlice";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";

import AuditInput from "@/components/audit/AuditInput";
import AuditResults from "@/components/audit/AuditResults";
import CategoryBreakdown from "@/components/audit/AuditResults/CategoryBreakdown";
import { runGeminiAudit } from "@/components/audit/aiService";
import type { AuditResult } from "@/components/audit/types";

const Audit = () => {
  const dispatch = useAppDispatch();
  const { currentAudit, isLoading, error } = useAppSelector(
    (state) => state.audit,
  );

  const [code, setCode] = useState("");
  const [fileName, setFileName] = useState("untitled.html");

  const handleFileLoad = (fileCode: string, name: string) => {
    setCode(fileCode);
    setFileName(name);
  };

  const handleReset = useCallback(() => {
    dispatch(clearCurrentAudit());
    setCode("");
    setFileName("untitled.html");
  }, [dispatch]);

  const handleRunAudit = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Please provide some code to audit.");
      return;
    }

    dispatch(setLoading(true));
    dispatch(clearCurrentAudit());

    try {
      const result = await runGeminiAudit(code);
      const auditResult: AuditResult = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        fileName,
        originalCode: code,
        ...result,
      };
      dispatch(setAuditResult(auditResult));
      toast.success(`Audit complete! Score: ${result.score}/100`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Audit failed";
      dispatch(setError(message));
      toast.error(message);
    }
  }, [code, fileName, dispatch]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-[#060612] pt-20 pb-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Accessibility Audit
              </h1>
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                Powered by Gemini AI
              </Badge>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Paste your HTML or React code to get instant WCAG 2.1 compliance
              analysis and auto-fixes.
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left: Input + Category Breakdown */}
            <div className="space-y-4">
              <AuditInput
                code={code}
                fileName={fileName}
                isLoading={isLoading}
                onCodeChange={setCode}
                onFileLoad={handleFileLoad}
                onRunAudit={handleRunAudit}
              />
              <AnimatePresence>
                {currentAudit && !isLoading && (
                  <CategoryBreakdown categories={currentAudit.categories} />
                )}
              </AnimatePresence>
            </div>

            {/* Right: Results */}
            <AuditResults
              result={currentAudit}
              isLoading={isLoading}
              error={error}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Audit;
