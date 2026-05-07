import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppDispatch";
import {
  Shield,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Zap,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const { history } = useAppSelector((state) => state.audit);

  const quickStats = [
    {
      label: "Total Audits",
      value: history.length || 0,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      label: "Issues Fixed",
      value: history.reduce(
        (acc, a) => acc + a.issues.filter((i) => i.type === "critical").length,
        0,
      ),
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      label: "Avg Score",
      value: history.length
        ? Math.round(
            history.reduce((acc, a) => acc + a.score, 0) / history.length,
          )
        : 0,
      icon: Shield,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      label: "Last Audit",
      value: history.length ? "Today" : "None",
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07070f] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || "Developer"} 👋
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Here's your accessibility audit overview
            </p>
          </div>
          <Link
            to="/audit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
          >
            <Zap className="w-4 h-4" />
            New Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Audits */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Recent Audits
              </h2>
              <span className="text-xs text-gray-400">
                {history.length} total
              </span>
            </div>

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  No audits yet. Run your first audit!
                </p>
                <Link
                  to="/audit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all"
                >
                  Start First Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {history.slice(0, 5).map((audit) => (
                  <div
                    key={audit.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        audit.score >= 80
                          ? "bg-emerald-50 dark:bg-emerald-950/30"
                          : audit.score >= 50
                            ? "bg-yellow-50 dark:bg-yellow-950/30"
                            : "bg-red-50 dark:bg-red-950/30"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          audit.score >= 80
                            ? "text-emerald-600"
                            : audit.score >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {audit.score}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {audit.fileName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {audit.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {audit.issues.filter((i) => i.type === "critical")
                        .length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-0.5 rounded-lg">
                          <AlertTriangle className="w-3 h-3" />
                          {
                            audit.issues.filter((i) => i.type === "critical")
                              .length
                          }
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Start */}
          <div className="flex flex-col gap-4">
            {/* Start Audit Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <Shield className="w-8 h-8 text-white/80 mb-3" />
              <h3 className="font-bold text-lg mb-2">Run New Audit</h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                Paste your HTML or React code and get AI-powered accessibility
                fixes.
              </p>
              <Link
                to="/audit"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 transition-all"
              >
                Start Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Plan Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
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
                    {history.length}/5
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                    style={{
                      width: `${Math.min((history.length / 5) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <Link
                to="/#pricing"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Upgrade to Pro →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
