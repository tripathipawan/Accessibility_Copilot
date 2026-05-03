import { motion } from 'framer-motion'
import { ClipboardPaste, Bot, Download } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: ClipboardPaste,
    title: 'Paste Your Code',
    description: 'Paste HTML or React/JSX component code into the editor. Supports file upload too.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: '02',
    icon: Bot,
    title: 'AI Audits Instantly',
    description: 'AI scans for 6+ accessibility violations, scores your code and explains each issue.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: '03',
    icon: Download,
    title: 'Copy Fixed Code',
    description: 'Get auto-fixed code, download PDF report and ship accessible code with confidence.',
    color: 'from-green-500 to-green-600',
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Three simple steps to accessible code
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">

          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg relative z-10`}>
                <step.icon className="w-9 h-9 text-white" />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                    {step.step}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks