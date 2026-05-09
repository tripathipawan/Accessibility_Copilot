import { useState } from 'react'
import { FileCode } from 'lucide-react'
import IssueCard from './IssueCard'
import type { AuditIssue } from '../types'

type FilterType = 'all' | 'critical' | 'warning' | 'good'

const FILTERS: FilterType[] = ['all', 'critical', 'warning', 'good']

interface IssuesPanelProps {
  issues: AuditIssue[]
}

const IssuesPanel = ({ issues }: IssuesPanelProps) => {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = issues.filter((i) => filter === 'all' || i.type === filter)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <FileCode className="w-4 h-4 text-blue-500" />
          Issues ({filtered.length})
        </h3>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Issue List */}
      <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        ) : (
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-6">
            No issues in this category.
          </p>
        )}
      </div>
    </div>
  )
}

export default IssuesPanel