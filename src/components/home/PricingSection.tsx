import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for trying out',
    badge: null,
    features: [
      { text: '5 audits per day', included: true },
      { text: 'Basic accessibility checks', included: true },
      { text: 'Score dashboard', included: true },
      { text: 'PDF export', included: false },
      { text: 'Audit history', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started Free',
    href: '/sign-up',
    variant: 'outline' as const,
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₹299',
    period: 'per month',
    description: 'For serious developers',
    badge: 'Most Popular',
    features: [
      { text: 'Unlimited audits', included: true },
      { text: 'All accessibility checks', included: true },
      { text: 'Score dashboard', included: true },
      { text: 'PDF export', included: true },
      { text: 'Audit history', included: true },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Pro',
    href: '/sign-up',
    variant: 'default' as const,
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For teams & agencies',
    badge: null,
    features: [
      { text: 'Unlimited audits', included: true },
      { text: 'All accessibility checks', included: true },
      { text: 'Score dashboard', included: true },
      { text: 'PDF export', included: true },
      { text: 'Audit history', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Contact Us',
    href: '/sign-up',
    variant: 'outline' as const,
    highlight: false,
  },
]

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-900/50">
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
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Start free, upgrade when you need more
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border ${
                plan.highlight
                  ? 'bg-gradient-to-b from-blue-500 to-purple-600 border-transparent text-white shadow-2xl scale-105'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-blue-600 border-0 shadow-md px-4">
                  {plan.badge}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    /{plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-green-300' : 'text-green-500'}`} />
                    ) : (
                      <XCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-blue-300' : 'text-gray-300 dark:text-gray-600'}`} />
                    )}
                    <span className={`text-sm ${
                      plan.highlight
                        ? feature.included ? 'text-white' : 'text-blue-200'
                        : feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to={plan.href}>
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50 border-0'
                      : ''
                  }`}
                  variant={plan.highlight ? 'default' : plan.variant}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection