
export interface AuditIssue {
  id: string
  type: 'critical' | 'warning' | 'good'
  title: string
  description: string
  element: string
  line?: number
  fix: string
  wcag: string
}

export interface AuditCategories {
  semantic: number
  images: number
  forms: number
  keyboard: number
  aria: number
  contrast: number
}

export interface AuditResult {
  id: string
  date: string
  fileName: string
  originalCode: string
  fixedCode: string
  score: number
  issues: AuditIssue[]
  categories: AuditCategories
}