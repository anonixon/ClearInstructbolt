import React, { useState } from 'react';
import TeacherMetricsPanel from './TeacherMetricsPanel';
import TeacherInsightsPanel from './TeacherInsightsPanel';
import TeacherActionsPanel from './TeacherActionsPanel';

const sampleMetrics = {
  totalTeachers: {
    count: 42,
    newCount: 4,
    period: 'academic year'
  },
  performanceRating: {
    percentage: 87,
    change: 2.5,
    period: 'from last term'
  },
  cpdCompletion: {
    percentage: 92,
    target: 95
  },
  workload: {
    hours: 47.5,
    change: -1.2,
    period: 'hrs from last term'
  }
};

const sampleInsights = [
  {
    title: 'Strong subject performance in Mathematics and Science',
    description: 'Both departments exceeding targets by 7% and 5% respectively',
    type: 'success' as const
  },
  {
    title: 'Professional development needs identified in Digital Skills',
    description: '45% of staff requesting additional training in EdTech tools',
    type: 'info' as const
  }
];

const sampleActions = [
  {
    title: 'Complete 5 remaining performance reviews',
    description: 'End of term teacher evaluations pending completion',
    dueDate: '3 days',
    priority: 'urgent' as const,
    type: 'review'
  },
  {
    title: 'Approve CPD requests',
    description: '8 new professional development requests awaiting approval',
    dueDate: '5 days',
    priority: 'high' as const,
    type: 'approval'
  }
];

const TeachersDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Teachers Dashboard</h1>
        <p className="text-gray-400">
          This dashboard provides comprehensive insights into teacher performance, professional development, wellbeing, and compliance metrics across the school.
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Overview"
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        />
        <TabButton
          label="Performance"
          active={activeTab === 'performance'}
          onClick={() => setActiveTab('performance')}
        />
        <TabButton
          label="Development"
          active={activeTab === 'development'}
          onClick={() => setActiveTab('development')}
        />
        <TabButton
          label="Wellbeing"
          active={activeTab === 'wellbeing'}
          onClick={() => setActiveTab('wellbeing')}
        />
      </div>

      {activeTab === 'overview' && (
        <>
          <TeacherMetricsPanel metrics={sampleMetrics} />
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <TeacherInsightsPanel insights={sampleInsights} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <TeacherActionsPanel actions={sampleActions} />
            </div>
          </div>
        </>
      )}

      {/* Additional tabs will be implemented based on the requirements */}
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

export default TeachersDashboard;