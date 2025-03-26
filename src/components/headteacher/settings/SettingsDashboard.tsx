import React, { useState } from 'react';
import GeneralSettings from './GeneralSettings';
import NotificationSettings from './NotificationSettings';
import ProfileSettings from './ProfileSettings';
import DataManagementSettings from './DataManagementSettings';

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account preferences and system settings
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="General"
          active={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
        />
        <TabButton
          label="Notifications"
          active={activeTab === 'notifications'}
          onClick={() => setActiveTab('notifications')}
        />
        <TabButton
          label="Profile"
          active={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        />
        <TabButton
          label="Data Management"
          active={activeTab === 'data-management'}
          onClick={() => setActiveTab('data-management')}
        />
      </div>

      {activeTab === 'general' && <GeneralSettings />}
      {activeTab === 'notifications' && <NotificationSettings />}
      {activeTab === 'profile' && <ProfileSettings />}
      {activeTab === 'data-management' && <DataManagementSettings />}
    </div>
  );
};

const TabButton = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active 
        ? 'text-white border-blue-500' 
        : 'text-gray-400 border-transparent hover:text-white hover:border-gray-700'
    }`}
  >
    {label}
  </button>
);

export default SettingsDashboard;