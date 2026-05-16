import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Download, RotateCcw, Shield, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ScoreCard from './ScoreCard'
import CodeViewer from './CodeViewer'
import IssuesPanel from './IssuesPanel'
import LoadingSkeleton from './LoadingSkeleton'
import type { AuditResult } from '../types'

interface AuditResultsProps {
  result: AuditResult | null
  isLoading: boolean
  error: string | null
  onReset: () => void
}

// ─── Calculate what score would be after fix ─
function estimateFixedScore(originalScore: number): number {
  // Estimate: fixing critical issues typically improves score significantly
  const improvement = Math.round((100 - originalScore) * 0.75)
  return Math.min(100, originalScore + improvement)
}

// ─── Empty State ─
const EmptyState = () => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 flex items-center justify-center">
      <Shield className="w-8 h-8 text-blue-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
      Ready to Audit
    </h3>
    <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs mx-auto">
      Paste your HTML or React code on the left, then click{' '}
      <strong>Run Audit</strong> to get instant accessibility insights.
    </p>
  </div>
)

// ─── Error State ──
const ErrorState = ({ message, onReset }: { message: string; onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-800 p-6 text-center"
  >
    <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
    <p className="font-medium text-red-700 dark:text-red-300 mb-1">Audit Failed</p>
    <p className="text-sm text-red-600 dark:text-red-400 mb-4">{message}</p>
    <Button variant="outline" size="sm" onClick={onReset}>
      <RotateCcw className="w-3 h-3 mr-1" /> Try Again
    </Button>
  </motion.div>
)

// ─── Main Component ──
const AuditResults = ({ result, isLoading, error, onReset }: AuditResultsProps) => {
  const navigate = useNavigate()

  if (isLoading) return <LoadingSkeleton />
  if (error) return <ErrorState message={error} onReset={onReset} />
  if (!result) return <EmptyState />

  const fixedScore = estimateFixedScore(result.score)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Score Summary */}
      <ScoreCard score={result.score} issues={result.issues} />

      {/* Code Viewer with Before/After Score */}
      <CodeViewer
        originalCode={result.originalCode}
        fixedCode={result.fixedCode}
        originalScore={result.score}
        fixedScore={fixedScore}
      />

      {/* Issues Panel */}
      <IssuesPanel issues={result.issues} />

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={() => navigate('/report')}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          View Full Report
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          New Audit
        </Button>
      </div>
    </motion.div>
  )
}

export default AuditResults