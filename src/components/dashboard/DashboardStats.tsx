import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle, FileText } from "lucide-react";

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
  delay: number;
}

const StatCard = ({ label, value, icon: Icon, color, bg, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
  >
    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
  </motion.div>
);

// ─── DashboardStats ───────────────────────────────────────────────────────────

interface DashboardStatsProps {
  totalAudits: number;
  totalCritical: number;
  avgScore: number;
  lastAuditDate: string;
}

const DashboardStats = ({
  totalAudits,
  totalCritical,
  avgScore,
  lastAuditDate,
}: DashboardStatsProps) => {
  const stats: StatCardProps[] = [
    {
      label: "Total Audits",
      value: totalAudits,
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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
