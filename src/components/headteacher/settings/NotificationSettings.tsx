import React from 'react';
import { Switch } from './Switch';

const NotificationSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Notification Settings</h2>
        <p className="text-gray-400">Configure how and when you receive notifications.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <Switch
              label="Daily Summary"
              description="Receive a daily summary of key metrics"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Attendance Alerts"
              description="Notifications for significant attendance changes"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Behavior Alerts"
              description="Notifications for serious behavior incidents"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Dashboard Notifications</h3>
          <div className="space-y-4">
            <Switch
              label="Dashboard Alerts"
              description="Show alerts directly on the dashboard"
              checked={true}
              onChange={() => {}}
            />
            <Switch
              label="Report Notifications"
              description="Notifications when new reports are available"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;