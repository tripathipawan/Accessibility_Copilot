import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

interface DashboardHeaderProps {
  firstName: string | null | undefined;
}

const DashboardHeader = ({ firstName }: DashboardHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
  >
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome back, {firstName || "Developer"} 👋
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
);

export default DashboardHeader;
