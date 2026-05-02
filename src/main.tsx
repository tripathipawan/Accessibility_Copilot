import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ClerkProvider>
    </Provider>
  </StrictMode>,
)