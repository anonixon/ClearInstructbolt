import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../lib/constants/routes';
import { useAuth } from '../../contexts/AuthContext';
import ErrorBoundary from '../ErrorBoundary';
import Navbar from '../Navbar';
import ProtectedRoute from '../auth/ProtectedRoute';

// Lazy load components
const HomePage = lazy(() => import('../../pages/HomePage'));
const LoginPage = lazy(() => import('../../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/auth/RegisterPage').then(module => ({ default: module.RegisterPage })));
const EmailVerification = lazy(() => import('../../pages/EmailVerification'));
const RegisterSuccess = lazy(() => import('../../pages/RegisterSuccess'));
const SchoolAdminDashboard = lazy(() => import('../../pages/SchoolAdminDashboard'));
const TeacherDashboard = lazy(() => import('../../pages/TeacherDashboard').then(module => ({ default: module.TeacherDashboard })));
const ParentDashboard = lazy(() => import('../../pages/ParentDashboard'));
const StudentDashboard = lazy(() => import('../../pages/StudentDashboard'));
const HeadteacherDashboard = lazy(() => import('../../pages/HeadteacherDashboard'));

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.PUBLIC.HOME} element={<HomePage />} />
          <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.PUBLIC.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.PUBLIC.EMAIL_VERIFICATION} element={<EmailVerification />} />
          <Route path={ROUTES.PUBLIC.REGISTER_SUCCESS} element={<RegisterSuccess />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher', 'parent', 'student', 'headteacher']}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path={ROUTES.DASHBOARD.SCHOOL_ADMIN_DASHBOARD} element={<SchoolAdminDashboard />} />
            <Route path={ROUTES.DASHBOARD.TEACHER_DASHBOARD} element={<TeacherDashboard currentUser={user} />} />
            <Route path={ROUTES.DASHBOARD.PARENT_DASHBOARD} element={<ParentDashboard />} />
            <Route path={ROUTES.DASHBOARD.STUDENT_DASHBOARD} element={<StudentDashboard />} />
            <Route path={ROUTES.DASHBOARD.HEADTEACHER_DASHBOARD} element={<HeadteacherDashboard />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to={ROUTES.PUBLIC.HOME} replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes; 