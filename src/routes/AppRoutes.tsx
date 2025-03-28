import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../lib/constants/routes';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';
import { Navbar } from '../components/layout/Navbar';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const ChangePassword = lazy(() => import('../pages/auth/ChangePassword'));
const EmailVerification = lazy(() => import('../pages/auth/EmailVerification'));
const DashboardSelection = lazy(() => import('../pages/DashboardSelection'));
const TeacherDashboard = lazy(() => import('../pages/TeacherDashboard'));
const ParentDashboard = lazy(() => import('../pages/ParentDashboard'));
const StudentDashboard = lazy(() => import('../pages/StudentDashboard'));
const HeadteacherDashboard = lazy(() => import('../pages/HeadteacherDashboard'));
const SchoolAdminDashboard = lazy(() => import('../pages/SchoolAdminDashboard'));

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.PUBLIC.HOME} element={<Navbar />}>
            <Route index element={<Navigate to={ROUTES.PUBLIC.LOGIN} />} />
            <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path={ROUTES.AUTH.CHANGE_PASSWORD} element={<ChangePassword />} />
            <Route path={ROUTES.AUTH.VERIFY_EMAIL} element={<EmailVerification />} />
          </Route>

          {/* Protected Routes */}
          <Route path="/dashboard" element={<Navbar />}>
            <Route index element={<DashboardSelection />} />
            <Route path={ROUTES.DASHBOARD.TEACHER_DASHBOARD} element={<TeacherDashboard />} />
            <Route path={ROUTES.DASHBOARD.PARENT_DASHBOARD} element={<ParentDashboard />} />
            <Route path={ROUTES.DASHBOARD.STUDENT_DASHBOARD} element={<StudentDashboard />} />
            <Route path={ROUTES.DASHBOARD.HEADTEACHER_DASHBOARD} element={<HeadteacherDashboard />} />
            <Route path={ROUTES.DASHBOARD.SCHOOL_ADMIN_DASHBOARD} element={<SchoolAdminDashboard />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={ROUTES.PUBLIC.HOME} />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export { AppRoutes }; 