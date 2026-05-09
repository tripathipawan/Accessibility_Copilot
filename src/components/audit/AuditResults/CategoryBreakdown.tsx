import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import type { AuditCategories } from '../types'

interface CategoryBarProps {
  label: string
  value: number
}

const CategoryBar = ({ label, value }: CategoryBarProps) => {
  const color =
    value >= 80 ? 'bg-green-500' : value >= 50 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600 dark:text-gray-400 capitalize">{label}</span>
        <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

interface CategoryBreakdownProps {
  categories: AuditCategories
}

const CategoryBreakdown = ({ categories }: CategoryBreakdownProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm"
    >
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-blue-500" />
        Category Breakdown
      </h3>
      <div className="space-y-3">
        {Object.entries(categories).map(([key, val]) => (
          <CategoryBar key={key} label={key} value={val} />
        ))}
      </div>
    </motion.div>
  )
}

export default CategoryBreakdown