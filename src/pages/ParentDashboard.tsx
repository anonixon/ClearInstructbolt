import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChildOverview from '../components/parent/dashboard/ChildOverview';
import AcademicReports from '../components/parent/dashboard/AcademicReports';
import Attendance from '../components/parent/dashboard/Attendance';
import Behavior from '../components/parent/dashboard/Behavior';
import Communication from '../components/parent/dashboard/Communication';
import Homework from '../components/parent/dashboard/Homework';
import NotificationPanel from '../components/parent/dashboard/NotificationPanel';

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.first_name}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChildOverview />
            <AcademicReports />
            <Attendance />
            <Behavior />
            <Communication />
            <Homework />
          </div>

          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard; 