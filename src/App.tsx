import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/home/HomePage';
import TeachersLanding from './components/landing/TeachersLanding';
import ParentsLanding from './components/landing/ParentsLanding';
import InstitutionsLanding from './components/landing/InstitutionsLanding';
import ParentPortal from './components/parent/ParentPortal';
import LoginPage from './components/auth/LoginPage';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import EmailVerification from './components/auth/EmailVerification';
import DashboardSelection from './components/dashboardSelection/DashboardSelection';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HeadteacherRegistration from './components/auth/HeadteacherRegistration';
import TeacherRegistration from './components/auth/TeacherRegistration';
import ParentRegistration from './components/auth/ParentRegistration';
import StudentRegister from './components/auth/StudentRegister';
import RegisterSuccess from './components/auth/RegisterSuccess';
import { ROUTES } from './config/constants';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import ParentDashboard from './components/parent/ParentDashboard';
import StudentDashboard from './components/student/StudentDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="pt-16">
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
                    {/* TODO: Add SchoolAdminDashboard component */}
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
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;