import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@lib/constants/routes';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import Login from '@components/auth/Login';
import Register from '@components/auth/Register';
import EmailVerification from '@components/auth/EmailVerification';
import DashboardSelection from '@components/dashboardSelection/DashboardSelection';
import HeadteacherRegistration from '@components/auth/HeadteacherRegistration';
import TeacherRegistration from '@components/auth/TeacherRegistration';
import StudentRegistration from '@components/auth/StudentRegistration';
import ParentRegistration from '@components/auth/ParentRegistration';
import RegisterSuccess from '@components/auth/RegisterSuccess';
import TeacherDashboard from '@components/teacher/dashboard/TeacherDashboard';
import ParentDashboard from '@components/parent/ParentDashboard';
import StudentDashboard from '@components/student/dashboard/StudentDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
      <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
      <Route path={ROUTES.PUBLIC.EMAIL_VERIFICATION} element={<EmailVerification />} />
      <Route path={ROUTES.PUBLIC.REGISTER_SUCCESS} element={<RegisterSuccess />} />

      {/* Registration Routes */}
      <Route path={ROUTES.REGISTRATION.HEADTEACHER} element={<HeadteacherRegistration />} />
      <Route path={ROUTES.REGISTRATION.TEACHER} element={<TeacherRegistration />} />
      <Route path={ROUTES.REGISTRATION.STUDENT} element={<StudentRegistration />} />
      <Route path={ROUTES.REGISTRATION.PARENT} element={<ParentRegistration />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.DASHBOARD.SELECTION} element={<DashboardSelection />} />
        <Route path={ROUTES.DASHBOARD.TEACHER} element={<TeacherDashboard />} />
        <Route path={ROUTES.DASHBOARD.PARENT} element={<ParentDashboard />} />
        <Route path={ROUTES.DASHBOARD.STUDENT} element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 