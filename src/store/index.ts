import { configureStore } from '@reduxjs/toolkit'
import auditReducer from './slices/auditSlice'
import themeReducer from './slices/themeSlice'

// ✅ userId ke saath key banao
const getAuditKey = (userId: string) => `ac_audit_${userId}`
const THEME_KEY = 'ac_theme'

// ✅ Load - userId pass karo
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

// ✅ Save - userId pass karo
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

// ✅ Logout pe sirf audit clear karo (theme rehne do)
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
  preloadedState: loadState(), // pehle bina userId ke load (theme ke liye)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch