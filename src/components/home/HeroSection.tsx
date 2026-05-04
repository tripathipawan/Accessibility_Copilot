/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";

const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="#6366f1"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" opacity="0.06" />
    </svg>
    <div
      className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.3), transparent 65%)",
        filter: "blur(60px)",
      }}
    />
    <div
      className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(168,85,247,0.3), transparent 65%)",
        filter: "blur(60px)",
      }}
    />
    <div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
      style={{ animation: "scanLine 6s ease-in-out infinite" }}
    />
    <style>{`
      @keyframes scanLine {
        0% { top: 0%; opacity: 0; }
        5% { opacity: 0.4; }
        95% { opacity: 0.4; }
        100% { top: 100%; opacity: 0; }
      }
    `}</style>
  </div>
);

const useTypingEffect = (text: string, speed = 18, start = false) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
};

const beforeCode = `<div onclick="submit()">
  Submit Form
</div>
<img src="hero.jpg">
<input placeholder="Email" />`;

const afterCode = `<button type="submit">
  Submit Form
</button>
<img src="hero.jpg"
  alt="Hero banner" />
<input
  aria-label="Email"
  placeholder="Email" />`;

const issueItems = [
  {
    label: "Missing keyboard handler",
    color: "text-red-500 dark:text-red-400",
  },
  { label: "No alt text on image", color: "text-red-500 dark:text-red-400" },
  {
    label: "Missing aria-label",
    color: "text-yellow-600 dark:text-yellow-400",
  },
];

const stats = [
  { value: "6+", label: "WCAG Checks" },
  { value: "99%", label: "Accuracy" },
  { value: "<2s", label: "Audit Time" },
];

const HeroSection = () => {
  const [typed, setTyped] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [score, setScore] = useState(45);
  const afterTyped = useTypingEffect(afterCode, 18, typed);

  useEffect(() => {
    const t = setTimeout(() => setTyped(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!typed) return;
    const t = setTimeout(
      () => {
        setScoreVisible(true);
        let s = 45;
        const inc = setInterval(() => {
          s += 2;
          setScore(s);
          if (s >= 92) {
            setScore(92);
            clearInterval(inc);
          }
        }, 40);
      },
      afterCode.length * 18 + 300,
    );
    return () => clearTimeout(t);
  }, [typed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-white dark:bg-[#060612]">
      <AnimatedGrid />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── LEFT ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              AI-Powered Accessibility Auditing
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.1] text-gray-900 dark:text-white mb-5">
              Fix Accessibility
              <span className="block mt-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Issues Instantly
              </span>
            </h1>

            <p className="text-base text-gray-600 dark:text-gray-400 mb-9 leading-relaxed max-w-md">
              Paste your HTML or React code — AI detects accessibility
              violations and generates fixed code in seconds. WCAG compliant,
              every time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-12">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
              >
                Start Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                See How It Works
              </a>
            </div>

            <div className="flex gap-8 pt-6 border-t border-gray-200 dark:border-gray-800 w-full justify-center lg:justify-start">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Code Card (ALL screens) ── */}
          <div className="flex flex-col gap-3 w-full min-w-0">
            {/* Code Card */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl bg-white dark:bg-gray-950">
              {/* Mac bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-[11px] text-gray-500 font-mono">
                  component.tsx
                </span>
                <div className="ml-auto flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                    <CheckCircle className="w-3 h-3" />
                    <span>WCAG AA</span>
                  </div>
                  <span className="text-gray-300 dark:text-gray-700">|</span>
                  <div className="flex items-center gap-1 text-[10px] font-mono">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Score
                    </span>
                    <span className="text-red-400 line-through ml-1">45</span>
                    <span className="text-gray-400">→</span>
                    <span
                      className="font-bold transition-all duration-500"
                      style={{ color: scoreVisible ? "#10b981" : "#9ca3af" }}
                    >
                      {scoreVisible ? score : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Code columns */}
              <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-800">
                <div className="p-3 sm:p-4 overflow-hidden">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-[10px] text-red-500 dark:text-red-400 font-mono font-medium">
                      Before
                    </span>
                  </div>
                  <pre className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed font-mono whitespace-pre-wrap break-all">
                    {beforeCode}
                  </pre>
                </div>
                <div className="p-3 sm:p-4 overflow-hidden">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      After
                    </span>
                  </div>
                  <pre className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 leading-relaxed font-mono whitespace-pre-wrap break-all">
                    {afterTyped}
                    <span className="animate-pulse">|</span>
                  </pre>
                </div>
              </div>

              {/* Issues */}
              <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 px-3 sm:px-4 py-3">
                <p className="text-[9px] text-gray-400 font-mono uppercase tracking-widest mb-2">
                  Issues Detected & Fixed
                </p>
                <div className="flex flex-col gap-1.5">
                  {issueItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2"
                    >
                      <span
                        className={`text-[10px] sm:text-[11px] font-mono truncate ${item.color}`}
                      >
                        ● {item.label}
                      </span>
                      <div className="flex items-center gap-0.5 text-[10px] text-emerald-500 dark:text-emerald-400 font-mono flex-shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        Fixed
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BOTTOM STATS ROW ── */}
            <div className="grid grid-cols-3 gap-2">
              {/* Card 1 — Audit Speed */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 p-3 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mb-2">
                    <svg
                      className="w-3.5 h-3.5 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                    &lt;2s
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Instant Audit
                  </p>
                </div>
              </div>

              {/* Card 2 — Issues Fixed */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 p-3 group hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mb-2">
                    <svg
                      className="w-3.5 h-3.5 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                    10k+
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Issues Fixed
                  </p>
                </div>
              </div>

              {/* Card 3 — WCAG Rules */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 p-3 group hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center mb-2">
                    <svg
                      className="w-3.5 h-3.5 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white font-mono">
                    6+
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    WCAG Rules
                  </p>
                </div>
              </div>
            </div>

            {/* ── AI PROCESSING BAR ── */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                  AI Processing
                </span>
                <span className="text-[11px] text-emerald-500 font-mono font-medium">
                  Complete
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000"
                  style={{ width: scoreVisible ? "100%" : "0%" }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-3">
                  <span className="text-[9px] text-gray-400 font-mono">
                    ● Semantic
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono">
                    ● ARIA
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono">
                    ● Contrast
                  </span>
                </div>
                <span className="text-[9px] text-emerald-500 font-mono">
                  ✓ All Passed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
