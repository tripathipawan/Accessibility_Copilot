import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('node_modules/react-router-dom'))   return 'vendor-router'
          if (id.includes('node_modules/@clerk'))             return 'vendor-clerk'
          if (id.includes('node_modules/framer-motion'))      return 'vendor-motion'
          if (id.includes('node_modules/@reduxjs') || id.includes('node_modules/react-redux') || id.includes('node_modules/redux-persist')) return 'vendor-redux'
          if (id.includes('node_modules/recharts'))           return 'vendor-charts'
          if (id.includes('node_modules/jspdf'))              return 'vendor-pdf'
          if (id.includes('node_modules/react-syntax-highlighter')) return 'vendor-syntax'
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})