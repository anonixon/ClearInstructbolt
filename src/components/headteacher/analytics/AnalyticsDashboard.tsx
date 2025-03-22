import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PerformanceMetricsPanel from './PerformanceMetricsPanel';
import TrendAnalysisChart from './TrendAnalysisChart';
import PredictiveInsightsPanel from './PredictiveInsightsPanel';
import ResourceOptimizationPanel from './ResourceOptimizationPanel';

const sampleMetrics = {
  performance: {
    value: 78,
    change: 5,
    period: 'vs last term',
    status: 'Good'
  },
  attendance: {
    value: 94.5,
    change: 2.3,
    period: 'vs last term',
    status: 'Good'
  },
  behavior: {
    value: 85,
    change: -1.2,
    period: 'vs last term',
    status: 'Good'
  },
  resources: {
    value: 92,
    change: 4.1,
    period: 'vs last term',
    status: 'Good'
  }
};

const sampleTrends = [
  { month: 'Sep', performance: 72, attendance: 91, behavior: 82 },
  { month: 'Oct', performance: 74, attendance: 92, behavior: 84 },
  { month: 'Nov', performance: 75, attendance: 93, behavior: 83 },
  { month: 'Dec', performance: 76, attendance: 94, behavior: 85 },
  { month: 'Jan', performance: 77, attendance: 94, behavior: 84 },
  { month: 'Feb', performance: 78, attendance: 95, behavior: 85 }
];

const samplePredictions = [
  {
    category: 'Academic Performance',
    prediction: 'Expected 5% improvement in GCSE results based on current trajectory',
    confidence: 85,
    impact: 'High',
    timeframe: 'End of academic year'
  },
  {
    category: 'Attendance',
    prediction: 'Seasonal dip expected in attendance during winter months',
    confidence: 92,
    impact: 'Medium',
    timeframe: 'Next 3 months'
  },
  {
    category: 'Resource Utilization',
    prediction: 'Current staffing levels sufficient for projected student numbers',
    confidence: 78,
    impact: 'Medium',
    timeframe: 'Next academic year'
  }
];

const sampleOptimization = {
  staffing: {
    current: 42,
    optimal: 45,
    gap: -3,
    efficiency: 93
  },
  resources: {
    current: 85000,
    allocated: 82000,
    remaining: 3000,
    efficiency: 96
  },
  utilization: {
    classrooms: 88,
    equipment: 92,
    digital: 95
  }
};

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">
            Advanced analytics and insights for data-driven decision making
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Overview"
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        />
        <TabButton
          label="Predictive Analysis"
          active={activeTab === 'predictive'}
          onClick={() => setActiveTab('predictive')}
        />
        <TabButton
          label="Resource Optimization"
          active={activeTab === 'resources'}
          onClick={() => setActiveTab('resources')}
        />
        <TabButton
          label="Strategic Planning"
          active={activeTab === 'planning'}
          onClick={() => setActiveTab('planning')}
        />
      </div>

      {activeTab === 'overview' && (
        <>
          <PerformanceMetricsPanel metrics={sampleMetrics} />
          
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <TrendAnalysisChart data={sampleTrends} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <PredictiveInsightsPanel predictions={samplePredictions} />
            </div>
          </div>

          <ResourceOptimizationPanel data={sampleOptimization} />
        </>
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

export default AnalyticsDashboard;