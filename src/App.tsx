import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { useDispatch } from "react-redux";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { store, loadState, saveState } from "@/store";
import {
  setAuditResult,
  clearHistory,
  clearCurrentAudit,
} from "@/store/slices/auditSlice";
import type { AuditResult } from "@/store/slices/auditSlice";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const Home = lazy(() => import("./pages/Home"));
const Audit = lazy(() => import("./pages/Audit"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Report = lazy(() => import("./pages/Report"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  if (!isSignedIn) return <Navigate to="/sign-in" replace />;
  return <>{children}</>;
};

const AuthStateHandler = () => {
  const { userId, isLoaded } = useAuth();
  const dispatch = useDispatch();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded) return;

    const prevUserId = prevUserIdRef.current;
    if (prevUserId !== userId) {
      if (prevUserId) {
        saveState(store.getState(), prevUserId);
      }
      dispatch(clearHistory());
      dispatch(clearCurrentAudit());
      if (userId) {
        const savedState = loadState(userId);
        if (savedState.audit?.history) {
          savedState.audit.history.forEach((audit: unknown) => {
            dispatch(setAuditResult(audit as AuditResult));
          });
        }
      }

      prevUserIdRef.current = userId;
    }
  }, [userId, isLoaded, dispatch]);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = store.subscribe(() => {
      saveState(store.getState(), userId);
    });
    return unsubscribe;
  }, [userId]);

  return null;
};

const AppContent = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthStateHandler />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route path="/sign-up/*" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute>
                <Layout showFooter={false}>
                  <Audit />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Layout>
                  <Report />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
