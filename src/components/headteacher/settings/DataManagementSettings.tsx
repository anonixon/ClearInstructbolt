import React from 'react';
import { Download, Upload, Archive } from 'lucide-react';
import { Switch } from './Switch';

const DataManagementSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Data Management</h2>
        <p className="text-gray-400">Manage your dashboard data and exports.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Data Export</h3>
          <p className="text-gray-400 mb-4">Export your dashboard data for external analysis or backup.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
              <Download className="w-5 h-5" />
              Export All Data
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
              <Download className="w-5 h-5" />
              Export Attendance Data
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
              <Download className="w-5 h-5" />
              Export Behavior Data
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Data Import</h3>
          <p className="text-gray-400 mb-4">Import data from external systems or backups.</p>
          
          <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
            <Upload className="w-5 h-5" />
            Import Data
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Data Retention</h3>
          <div className="space-y-4">
            <Switch
              label="Auto-archive Old Data"
              description="Automatically archive data older than 2 years"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagementSettings;