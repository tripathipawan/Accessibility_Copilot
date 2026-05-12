import { configureStore } from '@reduxjs/toolkit'
import auditReducer from './slices/auditSlice'
import themeReducer from './slices/themeSlice'

// Load from localStorage
const loadState = () => {
  try {
    const audit = localStorage.getItem('ac_audit')
    const theme = localStorage.getItem('ac_theme')
    return {
      audit: audit ? JSON.parse(audit) : undefined,
      theme: theme ? JSON.parse(theme) : undefined,
    }
  } catch { return {} }
}

// Save to localStorage
const saveState = (state: ReturnType<typeof store.getState>) => {
  try {
    localStorage.setItem('ac_audit', JSON.stringify({
      history: state.audit.history,
      currentAudit: state.audit.currentAudit,
    }))
    localStorage.setItem('ac_theme', JSON.stringify(state.theme))
  } catch {};
}

export const store = configureStore({
  reducer: {
    audit: auditReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
})

// Save on every state change
store.subscribe(() => saveState(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch