import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What kind of code can I audit?",
    a: "You can audit HTML, React JSX, and TSX code. Simply paste your component or HTML snippet and AI will analyze it instantly.",
  },
  {
    q: "Is it really WCAG compliant?",
    a: "Yes! Every fix suggestion references the exact WCAG 2.1 criteria it addresses — from 1.1.1 (alt text) to 4.1.2 (name, role, value).",
  },
  {
    q: "How does the AI fix code?",
    a: "We use Grok AI to analyze your code, identify violations, and generate corrected code with proper semantic elements, ARIA attributes, and labels.",
  },
  {
    q: "Is my code safe and private?",
    a: "Your code is sent to Grok API for analysis only. We do not store your code on our servers. Each audit is independent and private.",
  },
  {
    q: "Can I export the audit report?",
    a: "Yes! Pro plan users can download a detailed PDF report with all issues, fixes, WCAG references and before/after score comparison.",
  },
  {
    q: "Do I need to know accessibility to use this?",
    a: "Not at all! AccessCopilot explains every issue in simple language and tells you exactly what to fix and why. Perfect for beginners too.",
  },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
      >
        <span className="font-medium text-gray-900 dark:text-white text-sm">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} q={faq.q} a={faq.a} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
