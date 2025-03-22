import React from 'react';
import { Switch } from './Switch';

const GeneralSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">General Settings</h2>
        <p className="text-gray-400">Configure general dashboard settings and preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              School Name
            </label>
            <input
              type="text"
              value="Oakwood Secondary School"
              className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Current Academic Year
            </label>
            <input
              type="text"
              value="2023-2024"
              className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Dashboard Preferences</h3>
          <div className="space-y-4">
            <Switch
              label="Dark Mode"
              description="Enable dark mode for the dashboard"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Auto-refresh Data"
              description="Automatically refresh dashboard data"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Compact View"
              description="Use compact layout for dashboard components"
              checked={false}
              onChange={() => {}}
            />
          </div>
        </div>

        <div>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;