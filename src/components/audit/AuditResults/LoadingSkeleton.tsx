import { motion } from "framer-motion";

const SCAN_STEPS = [
  "Parsing HTML structure",
  "Checking image alt texts",
  "Validating ARIA attributes",
  "Analyzing color contrast",
  "Testing keyboard navigation",
];

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 p-8 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-500 border-t-transparent"
      />
      <p className="text-blue-600 dark:text-blue-400 font-medium">
        AI is analyzing your code...
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Checking WCAG 2.1 compliance, semantic HTML, ARIA roles...
      </p>
      <div className="mt-6 space-y-2">
        {SCAN_STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex items-center gap-2 text-sm text-left text-gray-600 dark:text-gray-400"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
            />
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
