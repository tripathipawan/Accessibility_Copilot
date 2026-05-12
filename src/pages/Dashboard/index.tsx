import { useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { setAuditResult, clearHistory } from "@/store/slices/auditSlice";
import {
  Shield,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Zap,
  TrendingUp,
  ExternalLink,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

const scoreColor = (score: number) =>
  score >= 80
    ? "text-emerald-600 dark:text-emerald-400"
    : score >= 50
      ? "text-amber-600 dark:text-amber-400"
      : "text-red-600 dark:text-red-400";

const scoreBg = (score: number) =>
  score >= 80
    ? "bg-emerald-50 dark:bg-emerald-950/30"
    : score >= 50
      ? "bg-amber-50 dark:bg-amber-950/30"
      : "bg-red-50 dark:bg-red-950/30";

// ─── Custom Tooltip for Chart ─────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="text-gray-500 dark:text-gray-400 mb-0.5">{label}</p>
      <p className="font-bold text-blue-600 dark:text-blue-400">
        {payload[0].value}/100
      </p>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
  delay,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
  >
    <div
      className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}
    >
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
  </motion.div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.audit);

  const avgScore = history.length
    ? Math.round(history.reduce((acc, a) => acc + a.score, 0) / history.length)
    : 0;

  const totalCritical = history.reduce(
    (acc, a) => acc + a.issues.filter((i) => i.type === "critical").length,
    0,
  );

  const lastAuditDate = history.length ? formatDate(history[0].date) : "None";

  const quickStats = [
    {
      label: "Total Audits",
      value: history.length,
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      delay: 0.1,
    },
    {
      label: "Critical Issues Found",
      value: totalCritical,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      delay: 0.15,
    },
    {
      label: "Avg Score",
      value: avgScore || 0,
      icon: Shield,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      delay: 0.2,
    },
    {
      label: "Last Audit",
      value: lastAuditDate,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      delay: 0.25,
    },
  ];

  // Chart data — last 7 audits reversed
  const chartData = [...history]
    .reverse()
    .slice(-7)
    .map((a, i) => ({
      name: formatShortDate(a.date),
      score: a.score,
      index: i,
    }));

  const handleViewReport = (audit: (typeof history)[0]) => {
    dispatch(setAuditResult(audit));
    navigate("/report");
  };

  const handleClearHistory = () => {
    dispatch(clearHistory());
    toast.success("Audit history cleared.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07070f] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
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
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Score Chart — only if history exists */}
        {history.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Score History
              </h2>
              <span className="text-xs text-gray-400 ml-auto">
                Last {chartData.length} audits
              </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 10, bottom: 0, left: -20 }}
              >
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  className="dark:opacity-20"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#scoreGrad)"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#6366f1" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Audits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Recent Audits
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {history.length} total
                </span>
                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>
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
                {history.slice(0, 6).map((audit, i) => (
                  <motion.div
                    key={audit.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    {/* Score badge */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${scoreBg(audit.score)}`}
                    >
                      <span
                        className={`text-sm font-bold ${scoreColor(audit.score)}`}
                      >
                        {audit.score}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {audit.fileName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(audit.date)}
                      </p>
                    </div>

                    {/* Issue badges */}
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

                    {/* View Report */}
                    {/* View Report — mobile pe hamesha dikhao */}
                    <button
                      onClick={() => handleViewReport(audit)}
                      className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 flex-shrink-0
  opacity-100 sm:group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="hidden sm:inline">Report</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Start Audit Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
            >
              <Shield className="w-8 h-8 text-white/80 mb-3" />
              <h3 className="font-bold text-lg mb-2">Run New Audit</h3>
              <p className="text-white/70 text-sm mb-4 leading-relaxed">
                Paste your HTML or React code and get AI-powered accessibility
                fixes instantly.
              </p>
              <Link
                to="/audit"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 transition-all"
              >
                Start Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Plan Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
            >
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
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min((history.length / 5) * 100, 100)}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
              </div>
              <Link
                to="/#pricing"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Upgrade to Pro →
              </Link>
            </motion.div>

            {/* Score Summary (if audits exist) */}
            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                  Score Breakdown
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      label: "Best Score",
                      value: Math.max(...history.map((a) => a.score)),
                      color: "text-green-500",
                    },
                    {
                      label: "Worst Score",
                      value: Math.min(...history.map((a) => a.score)),
                      color: "text-red-500",
                    },
                    {
                      label: "Average",
                      value: avgScore,
                      color: "text-blue-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        {item.label}
                      </span>
                      <span className={`font-bold ${item.color}`}>
                        {item.value}/100
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
