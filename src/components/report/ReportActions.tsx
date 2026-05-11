import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Share2, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatFixedCode } from "@/components/audit/aiService";

interface ReportActionsProps {
  audit: {
    fileName: string;
    date: string;
    score: number;
    fixedCode: string;
    categories: Record<string, number>;
    issues: {
      type: string;
      title: string;
      description: string;
      wcag: string;
      fix: string;
    }[];
  };
}

const ReportActions = ({ audit }: ReportActionsProps) => {
  const [exporting, setExporting] = useState(false);
  const [shared, setShared] = useState(false);

  const handlePDFExport = async () => {
    setExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const pageW = doc.internal.pageSize.getWidth();
      let y = 20;

      const addText = (
        text: string,
        size: number,
        bold = false,
        color = [30, 30, 30],
      ) => {
        doc.setFontSize(size);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setTextColor(color[0], color[1], color[2]);
        const lines = doc.splitTextToSize(text, pageW - 40);
        doc.text(lines, 20, y);
        y += lines.length * size * 0.45 + 4;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      };

      const addLine = () => {
        doc.setDrawColor(220, 220, 220);
        doc.line(20, y, pageW - 20, y);
        y += 6;
      };

      // Title
      addText("AccessCopilot — Accessibility Report", 18, true, [59, 130, 246]);
      addLine();

      // Meta
      addText("File: " + audit.fileName, 11);
      addText("Date: " + new Date(audit.date).toLocaleDateString(), 11);
      addText(
        "Overall Score: " + audit.score + "/100",
        13,
        true,
        audit.score >= 80
          ? [34, 197, 94]
          : audit.score >= 50
            ? [245, 158, 11]
            : [239, 68, 68],
      );
      y += 4;
      addLine();

      // Categories
      addText("Category Scores", 13, true);
      y += 2;
      Object.entries(audit.categories).forEach(([key, val]) => {
        addText(
          `  ${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}/100`,
          10,
        );
      });
      y += 4;
      addLine();

      // Issues
      addText("Issues Found (" + audit.issues.length + ")", 13, true);
      y += 2;

      audit.issues.forEach((issue, idx) => {
        const typeColor: [number, number, number] =
          issue.type === "critical"
            ? [239, 68, 68]
            : issue.type === "warning"
              ? [245, 158, 11]
              : [34, 197, 94];

        addText(idx + 1 + ". " + issue.title, 11, true, typeColor);
        addText("   " + issue.description, 10, false, [80, 80, 80]);
        addText("   WCAG: " + issue.wcag, 9, false, [120, 120, 120]);
        if (issue.type !== "good") {
          addText("   Fix: " + issue.fix, 10, false, [60, 60, 60]);
        }
        y += 3;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      addLine();

      // Fixed Code (first 50 lines)
      addText("AI Fixed Code (Preview)", 13, true);
      y += 2;
      const fixedLines = formatFixedCode(audit.fixedCode)
        .split("\n")
        .slice(0, 50);
      doc.setFont("courier", "normal");
      doc.setFontSize(8);
      doc.setTextColor(40, 40, 40);
      fixedLines.forEach((line) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 20, y);
        y += 4;
      });

      doc.save(
        "accesscopilot-report-" +
          audit.fileName.replace(/\.[^.]+$/, "") +
          ".pdf",
      );
      toast.success("PDF exported successfully!");
    } catch (err) {
      toast.error("PDF export failed. Try again.");
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      toast.success("Report link copied!");
      setTimeout(() => setShared(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 flex-wrap"
    >
      <Button
        onClick={handlePDFExport}
        disabled={exporting}
        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20"
      >
        {exporting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Exporting PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </>
        )}
      </Button>
      <Button variant="outline" onClick={handleShare} className="flex-1">
        {shared ? (
          <>
            <Check className="w-4 h-4 mr-2 text-green-500" />
            Link Copied!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 mr-2" />
            Share Report
          </>
        )}
      </Button>
    </motion.div>
  );
};

export default ReportActions;
