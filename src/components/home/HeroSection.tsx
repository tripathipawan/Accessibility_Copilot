import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Shield, CheckCircle } from "lucide-react";

const codeSnippet = `<div onclick="submit()">
  Submit Form
</div>
<img src="hero.jpg">
<input placeholder="Email" />`;

const fixedSnippet = `<button type="submit"
  onKeyDown={handleKey}>
  Submit Form
</button>
<img src="hero.jpg"
  alt="Hero banner image" />
<input
  aria-label="Email address"
  placeholder="Email" />`;

const stats = [
  { value: "6+", label: "Checks" },
  { value: "99%", label: "Accuracy" },
  { value: "<2s", label: "Audit Time" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Simple CSS Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950" />
        {/* Simple static grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Static glow blobs — no animation */}
        <div
          className="absolute top-20 left-20 w-80 h-80 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-20 dark:opacity-10"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3 h-3" />
                AI-Powered Accessibility Auditing
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            >
              Fix Accessibility
              <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Issues Instantly
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              Paste your HTML or React code — AI detects accessibility
              violations and generates fixed code in seconds. WCAG compliant,
              every time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25"
                >
                  Start Free Audit
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="gap-2">
                  See How It Works
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Score Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -top-4 -right-4 z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Score
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    45 → <span className="text-green-500">92</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Code Card */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400">
                  component.tsx
                </span>
              </div>

              <div className="grid grid-cols-2 divide-x divide-gray-700">
                {/* Before */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs text-red-400 font-medium">
                      Before
                    </span>
                  </div>
                  <pre className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {codeSnippet}
                  </pre>
                </div>

                {/* After */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-green-400 font-medium">
                      After
                    </span>
                  </div>
                  <pre className="text-xs text-green-300 leading-relaxed whitespace-pre-wrap">
                    {fixedSnippet}
                  </pre>
                </div>
              </div>

              {/* Issues Found Bar */}
              <div className="px-4 py-3 bg-gray-800 dark:bg-gray-900 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <span className="text-xs text-red-400">● 3 Critical</span>
                    <span className="text-xs text-yellow-400">
                      ● 2 Warnings
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    All Fixed
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Check */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                WCAG 2.1 Compliant
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ArrowRight, Sparkles, Shield, CheckCircle } from "lucide-react";

// const codeSnippet = `<div onclick="submit()">
//   Submit Form
// </div>
// <img src="hero.jpg">
// <input placeholder="Email" />`;

// const fixedSnippet = `<button type="submit"
//   onKeyDown={handleKey}>
//   Submit Form
// </button>
// <img src="hero.jpg"
//   alt="Hero banner image" />
// <input
//   aria-label="Email address"
//   placeholder="Email" />`;

// const stats = [
//   { value: "6+", label: "Checks" },
//   { value: "99%", label: "Accuracy" },
//   { value: "<2s", label: "Audit Time" },
// ];

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
//       {/* Background */}
//       <div className="absolute inset-0 -z-10">
//         {/* Base gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-950 dark:via-[#0f0f1a] dark:to-[#0d0d1f]" />

//         {/* Grid lines */}
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
//                               linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)`,
//             backgroundSize: "64px 64px",
//           }}
//         />

//         {/* Glow top-left */}
//         <div
//           className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
//             filter: "blur(48px)",
//           }}
//         />

//         {/* Glow bottom-right */}
//         <div
//           className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 65%)",
//             filter: "blur(48px)",
//           }}
//         />

//         {/* Glow center */}
//         <div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%)",
//             filter: "blur(60px)",
//           }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left — Text */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Badge className="mb-6 gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50">
//                 <Sparkles className="w-3 h-3" />
//                 AI-Powered Accessibility Auditing
//               </Badge>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
//             >
//               Fix Accessibility
//               <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
//                 Issues Instantly
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg"
//             >
//               Paste your HTML or React code — AI detects accessibility
//               violations and generates fixed code in seconds. WCAG compliant,
//               every time.
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="flex flex-wrap gap-4 mb-12"
//             >
//               <Link to="/sign-up">
//                 <Button
//                   size="lg"
//                   className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 px-8"
//                 >
//                   Start Free Audit
//                   <ArrowRight className="w-4 h-4" />
//                 </Button>
//               </Link>
//               <a href="#how-it-works">
//                 <Button size="lg" variant="outline" className="gap-2 px-8">
//                   See How It Works
//                 </Button>
//               </a>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="flex gap-10"
//             >
//               {stats.map((stat) => (
//                 <div key={stat.label}>
//                   <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Right — Code Preview */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="relative hidden lg:block"
//           >
//             {/* Score Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.7 }}
//               className="absolute -top-5 -right-5 z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
//                   <Shield className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     Score
//                   </div>
//                   <div className="text-xl font-bold text-gray-900 dark:text-white">
//                     45 → <span className="text-green-500">92</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Code Card */}
//             <div className="bg-gray-950 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
//               {/* Mac header */}
//               <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
//                 <div className="w-3 h-3 rounded-full bg-red-500" />
//                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
//                 <div className="w-3 h-3 rounded-full bg-green-500" />
//                 <span className="ml-2 text-xs text-gray-500 font-mono">
//                   component.tsx
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 divide-x divide-gray-800">
//                 {/* Before */}
//                 <div className="p-5">
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="w-2 h-2 rounded-full bg-red-500" />
//                     <span className="text-xs text-red-400 font-medium font-mono">
//                       Before
//                     </span>
//                   </div>
//                   <pre className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap font-mono">
//                     {codeSnippet}
//                   </pre>
//                 </div>

//                 {/* After */}
//                 <div className="p-5">
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="w-2 h-2 rounded-full bg-green-500" />
//                     <span className="text-xs text-green-400 font-medium font-mono">
//                       After
//                     </span>
//                   </div>
//                   <pre className="text-xs text-green-400 leading-relaxed whitespace-pre-wrap font-mono">
//                     {fixedSnippet}
//                   </pre>
//                 </div>
//               </div>

//               {/* Bottom bar */}
//               <div className="px-5 py-3 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
//                 <div className="flex gap-4">
//                   <span className="text-xs text-red-400 font-mono">
//                     ● 3 Critical
//                   </span>
//                   <span className="text-xs text-yellow-400 font-mono">
//                     ● 2 Warnings
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono">
//                   <CheckCircle className="w-3 h-3" />
//                   All Fixed
//                 </div>
//               </div>
//             </div>

//             {/* WCAG Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.9 }}
//               className="absolute -bottom-5 -left-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-2"
//             >
//               <CheckCircle className="w-4 h-4 text-green-500" />
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 WCAG 2.1 Compliant
//               </span>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
