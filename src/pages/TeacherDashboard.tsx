import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import TeacherDashboard from '../components/teacher/dashboard/TeacherDashboard';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../lib/constants/routes';

const TeacherDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user?.id) {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
  }

  return <TeacherDashboard teacherId={user.id} />;
};

export default TeacherDashboardPage; 