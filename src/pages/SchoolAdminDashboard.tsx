import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import SchoolMetricsPanel from '../components/headteacher/dashboard/SchoolMetricsPanel';
import OfstedMetricsPanel from '../components/headteacher/dashboard/OfstedMetricsPanel';
import PerformanceChart from '../components/headteacher/dashboard/PerformanceChart';

const SchoolAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">School Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.first_name}!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SchoolMetricsPanel />
            </div>
            <div>
              <OfstedMetricsPanel />
            </div>
          </div>

          <div className="mt-6">
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard; 