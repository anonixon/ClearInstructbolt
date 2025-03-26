import React from 'react';
import FormGroupSelector from './FormGroupSelector';
import DailyRegistration from './DailyRegistration';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back, Teacher! Manage your form group and pastoral care duties.
        </p>
      </div>

      <FormGroupSelector />
      <DailyRegistration />
    </div>
  );
};

export default Dashboard;