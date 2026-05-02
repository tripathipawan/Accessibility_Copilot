import { configureStore } from '@reduxjs/toolkit'
import auditReducer from './slices/auditSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    audit: auditReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch