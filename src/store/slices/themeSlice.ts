import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark
      document.documentElement.classList.toggle('dark', state.isDark)
    },
    setTheme: (state, action) => {
      state.isDark = action.payload
      document.documentElement.classList.toggle('dark', state.isDark)
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer