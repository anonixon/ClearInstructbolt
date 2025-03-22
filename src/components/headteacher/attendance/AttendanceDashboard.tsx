import React, { useState } from 'react';
import AttendanceOverview from './AttendanceOverview';
import AttendanceTrends from './AttendanceTrends';
import YearGroupComparison from './YearGroupComparison';
import InterventionsPanel from './InterventionsPanel';

const AttendanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Attendance</h1>
        <p className="text-gray-400">
          Monitor and analyze attendance patterns across the school
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Overview"
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        />
        <TabButton
          label="Year Groups"
          active={activeTab === 'year-groups'}
          onClick={() => setActiveTab('year-groups')}
        />
        <TabButton
          label="Trends"
          active={activeTab === 'trends'}
          onClick={() => setActiveTab('trends')}
        />
        <TabButton
          label="Interventions"
          active={activeTab === 'interventions'}
          onClick={() => setActiveTab('interventions')}
        />
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <AttendanceOverview />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <AttendanceTrends />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <AbsenceBreakdown />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <YearGroupComparison />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <InterventionsPanel />
            </div>
          </div>
        </div>
      )}
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

export default AttendanceDashboard;