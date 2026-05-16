import { configureStore } from '@reduxjs/toolkit'
import auditReducer from './slices/auditSlice'
import themeReducer from './slices/themeSlice'

const getAuditKey = (userId: string) => `ac_audit_${userId}`
const THEME_KEY = 'ac_theme'

export const loadState = (userId?: string) => {
  try {
    const theme = localStorage.getItem(THEME_KEY)
    if (!userId) {
      return {
        audit: undefined,
        theme: theme ? JSON.parse(theme) : undefined,
      }
    }
    const audit = localStorage.getItem(getAuditKey(userId))
    return {
      audit: audit ? JSON.parse(audit) : undefined,
      theme: theme ? JSON.parse(theme) : undefined,
    }
  } catch { return {} }
}

export const saveState = (state: ReturnType<typeof store.getState>, userId?: string) => {
  try {
    if (userId) {
      localStorage.setItem(getAuditKey(userId), JSON.stringify({
        history: state.audit.history,
        currentAudit: state.audit.currentAudit,
      }))
    }
    localStorage.setItem(THEME_KEY, JSON.stringify(state.theme))
  } catch {}
}


export const clearUserState = (userId: string) => {
  try {
    localStorage.removeItem(getAuditKey(userId))
  } catch {}
}

export const store = configureStore({
  reducer: {
    audit: auditReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch