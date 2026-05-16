import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isDark: boolean
}

const getSavedTheme = (): boolean => {
  try {
    const saved = localStorage.getItem('ac_theme')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (typeof parsed?.isDark === 'boolean') return parsed.isDark
      if (typeof parsed === 'boolean') return parsed
    }
  } catch(e) {
        console.log(e);
      }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const initialState: ThemeState = {
  isDark: getSavedTheme()
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark
      document.documentElement.classList.toggle('dark', state.isDark)
      try {
        localStorage.setItem('ac_theme', JSON.stringify({ isDark: state.isDark }))
      } catch(e) {
        console.log(e);
      }
    },
    setTheme: (state, action) => {
      state.isDark = action.payload
      document.documentElement.classList.toggle('dark', state.isDark)
      try {
        localStorage.setItem('ac_theme', JSON.stringify({ isDark: state.isDark }))
      } catch(e) {
        console.log(e);
      }
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer