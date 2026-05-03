import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-12 shadow-2xl"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Build Accessible Apps?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
              Join developers who ship accessible, WCAG-compliant code
              with confidence using AI.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/sign-up">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-0 gap-2 shadow-lg">
                  Start Free — No Credit Card
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  See Demo
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection