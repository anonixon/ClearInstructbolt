import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@lib/constants/routes';
import { useAuth } from '@contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from '@components/ErrorBoundary';

// Layout Components
import Navbar from '@components/layout/Navbar';

// Lazy-loaded components
const HomePage = lazy(() => import('../pages/HomePage'));
const TeachersLanding = lazy(() => import('../pages/TeachersLanding'));
const ParentsLanding = lazy(() => import('../pages/ParentsLanding'));
const InstitutionsLanding = lazy(() => import('../pages/InstitutionsLanding'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const EmailVerification = lazy(() => import('../pages/EmailVerification'));

// Registration Components
const HeadteacherRegistration = lazy(() => import('../pages/registration/HeadteacherRegistration'));
const TeacherRegistration = lazy(() => import('../pages/registration/TeacherRegistration'));
const ParentRegistration = lazy(() => import('../pages/registration/ParentRegistration'));
const StudentRegister = lazy(() => import('../pages/registration/StudentRegister'));
const RegisterSuccess = lazy(() => import('../pages/registration/RegisterSuccess'));

// Dashboard Components
const DashboardSelection = lazy(() => import('../pages/DashboardSelection'));
const TeacherDashboard = lazy(() => import('../components/teacher/TeacherDashboard'));
const ParentDashboard = lazy(() => import('../components/parent/ParentDashboard'));
const StudentDashboard = lazy(() => import('../components/student/StudentDashboard'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path="/teachers" element={<TeachersLanding />} />
              <Route path="/parents" element={<ParentsLanding />} />
              <Route path="/institutions" element={<InstitutionsLanding />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path="/login" element={<Navigate to="/login/parent" replace />} />
              <Route path="/demo" element={<Navigate to="/login/parent" replace />} />
              <Route path="/features" element={<Navigate to="/" replace />} />
              
              {/* Auth routes */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path={ROUTES.SCHOOL_ADMIN_REGISTER} element={<HeadteacherRegistration />} />
              <Route path={ROUTES.TEACHER_REGISTER} element={<TeacherRegistration />} />
              <Route path={ROUTES.PARENT_REGISTER} element={<ParentRegistration />} />
              <Route path={ROUTES.STUDENT_REGISTER} element={<StudentRegister />} />
              <Route path={ROUTES.REGISTER_SUCCESS} element={<RegisterSuccess />} />

              {/* Protected routes */}
              <Route
                path="/teacher"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <Navigate to="/teacher/dashboard" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <Navigate to="/parent/dashboard" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/headteacher"
                element={
                  <ProtectedRoute allowedRoles={['headteacher']}>
                    <Navigate to="/headteacher/dashboard" replace />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.DASHBOARD_SELECTION}
                element={
                  <ProtectedRoute allowedRoles={['teacher', 'parent', 'student', 'headteacher']}>
                    <DashboardSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.SCHOOL_ADMIN_DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['school_admin']}>
                    <div>School Admin Dashboard</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.TEACHER_DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.PARENT_DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <ParentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.STUDENT_DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AppRoutes; 