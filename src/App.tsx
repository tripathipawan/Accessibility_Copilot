import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { useAppSelector } from '@/hooks/useAppDispatch'
import Layout from '@/components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const Audit = lazy(() => import('./pages/Audit'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Report = lazy(() => import('./pages/Report'))
const SignIn = lazy(() => import('./pages/Auth/SignIn'))
const SignUp = lazy(() => import('./pages/Auth/SignUp'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  </div>
)

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) return <PageLoader />
  if (!isSignedIn) return <Navigate to="/sign-in" replace />
  return <>{children}</>
}

const AppContent = () => {
  const isDark = useAppSelector((state) => state.theme.isDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/audit" element={
            <ProtectedRoute>
              <Layout showFooter={false}>
                <Audit />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/report" element={
            <ProtectedRoute>
              <Layout>
                <Report />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

const App = () => {
  return <AppContent />
}

export default App