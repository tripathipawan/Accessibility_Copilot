import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { setAuditResult, clearHistory } from "@/store/slices/auditSlice";
import { toast } from "sonner";
import type { AuditResult } from "@/components/audit/types";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardAuditList from "@/components/dashboard/DashboardAuditList";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// ─── Date Helpers ─────────────────────────────────────────────────────────────

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

const formatShortDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return iso;
  }
};

// ─── Dashboard Page ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.audit);

  // ── Derived values ──────────────────────────────────────────────────────────
  const avgScore = history.length
    ? Math.round(history.reduce((acc, a) => acc + a.score, 0) / history.length)
    : 0;

  const totalCritical = history.reduce(
    (acc, a) => acc + a.issues.filter((i) => i.type === "critical").length,
    0,
  );

  const lastAuditDate = history.length ? formatDate(history[0].date) : "None";

  const chartData = [...history]
    .reverse()
    .slice(-7)
    .map((a, i) => ({
      name: formatShortDate(a.date),
      score: a.score,
      index: i,
    }));

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleViewReport = (audit: AuditResult) => {
    dispatch(setAuditResult(audit));
    navigate("/report");
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
    toast.success("Audit history cleared.");
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07070f] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader firstName={user?.firstName} />

        <DashboardStats
          totalAudits={history.length}
          totalCritical={totalCritical}
          avgScore={avgScore}
          lastAuditDate={lastAuditDate}
        />

        <DashboardChart chartData={chartData} />

        <div className="grid lg:grid-cols-3 gap-6">
          <DashboardAuditList
            history={history}
            onViewReport={handleViewReport}
            onClearHistory={handleClearHistory}
          />
          <DashboardSidebar history={history} avgScore={avgScore} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
