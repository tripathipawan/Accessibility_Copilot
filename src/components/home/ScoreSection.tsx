import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Semantic HTML",
    weight: 20,
    score: 18,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
  },
  {
    label: "Image Alt Text",
    weight: 15,
    score: 15,
    color: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
  },
  {
    label: "Form Labels",
    weight: 20,
    score: 14,
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.12)",
  },
  {
    label: "Keyboard Access",
    weight: 20,
    score: 16,
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
  },
  {
    label: "Color Contrast",
    weight: 15,
    score: 9,
    color: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
  },
  {
    label: "ARIA Roles",
    weight: 10,
    score: 10,
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
  },
];

const TOTAL = categories.reduce((sum, c) => sum + c.score, 0);
const CIRCUMFERENCE = 2 * Math.PI * 40;

const ScoreSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="scoring-system"
      ref={sectionRef}
      className="py-16 scroll-mt-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute -top-20 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 px-3 py-1 rounded-full mb-3">
            Scoring System
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            How Your Score is Calculated
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
            Each audit gives a score out of 100 — broken down across 6 weighted
            categories.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left — Ring + Legend */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-52 flex-shrink-0 flex flex-col items-center gap-4"
          >
            {/* Score Ring */}
            <div className="relative w-28 h-28">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                }}
              />
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id="ringGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700/60"
                  stroke="currentColor"
                  strokeWidth="7"
                />
                {/* Progress */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${visible ? (TOTAL / 100) * CIRCUMFERENCE : 0} ${CIRCUMFERENCE}`}
                  style={{
                    transition:
                      "stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.2s",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">
                  {TOTAL}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  / 100
                </span>
              </div>
            </div>
            <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400">
              Sample Score
            </p>

            {/* Legend */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1.5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 rounded-xl px-3 py-3">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="flex items-center gap-2 min-w-0"
                >
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bars */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {categories.map((cat, i) => {
              const pct = Math.round((cat.score / cat.weight) * 100);
              return (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 rounded-xl px-4 py-3 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Color dot */}
                      <span
                        className="flex-shrink-0 w-2 h-2 rounded-full"
                        style={{ background: cat.color }}
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: cat.color }}
                      >
                        {cat.score}
                        <span className="text-gray-400 dark:text-gray-500 font-normal">
                          /{cat.weight}
                        </span>
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 w-8 text-right">
                        {pct}%
                      </span>
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700/60 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: visible ? `${pct}%` : "0%",
                        background: `linear-gradient(90deg, ${cat.color}88, ${cat.color})`,
                        boxShadow: visible ? `0 0 6px ${cat.color}55` : "none",
                        transition: `width 0.8s cubic-bezier(0.34,1.1,0.64,1) ${i * 60 + 300}ms`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoreSection;
