import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuditIssue {
  id: string
  type: 'critical' | 'warning' | 'good'
  title: string
  description: string
  element: string
  line?: number
  fix: string
  wcag: string
}

export interface AuditResult {
  id: string
  date: string
  fileName: string
  originalCode: string
  fixedCode: string
  score: number
  issues: AuditIssue[]
  categories: {
    semantic: number
    images: number
    forms: number
    keyboard: number
    aria: number
    contrast: number
  }
}

interface AuditState {
  currentAudit: AuditResult | null
  history: AuditResult[]
  isLoading: boolean
  error: string | null
}

const initialState: AuditState = {
  currentAudit: null,
  history: [],
  isLoading: false,
  error: null,
}

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setAuditResult: (state, action: PayloadAction<AuditResult>) => {
      state.currentAudit = action.payload
      state.history.unshift(action.payload)
      state.isLoading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    clearCurrentAudit: (state) => {
      state.currentAudit = null
    },
    clearHistory: (state) => {
      state.history = []
    }
  }
})

export const {
  setLoading,
  setAuditResult,
  setError,
  clearCurrentAudit,
  clearHistory
} = auditSlice.actions

export default auditSlice.reducer