import React from 'react';
import { Download } from 'lucide-react';
import SchoolMetricsPanel from './dashboard/SchoolMetricsPanel';
import OfstedMetricsPanel from './dashboard/OfstedMetricsPanel';
import PerformanceChart from './dashboard/PerformanceChart';

const sampleMetrics = {
  attendanceRate: {
    value: 94.2,
    change: 0.5,
    period: 'from last term'
  },
  behaviorIncidents: {
    value: -12,
    change: -8,
    period: 'since last month'
  },
  academicProgress: {
    value: 8.2,
    comparison: 'Above national average'
  },
  ofstedReadiness: {
    value: 87,
    change: 5,
    lastAssessment: 'from last assessment'
  }
};

const sampleOfstedMetrics = [
  {
    category: 'Quality of Education',
    current: 85,
    target: 90,
    status: 'Improving'
  },
  {
    category: 'Behavior & Attitudes',
    current: 82,
    target: 90,
    status: 'Good'
  },
  {
    category: 'Personal Development',
    current: 88,
    target: 85,
    status: 'Good'
  },
  {
    category: 'Leadership & Management',
    current: 83,
    target: 90,
    status: 'Stable'
  }
];

const samplePerformanceData = [
  { month: 'Sep', attendance: 92, behavior: 88, academic: 85, overall: 88 },
  { month: 'Oct', attendance: 93, behavior: 89, academic: 86, overall: 89 },
  { month: 'Nov', attendance: 94, behavior: 90, academic: 87, overall: 90 },
  { month: 'Dec', attendance: 93, behavior: 91, academic: 88, overall: 91 },
  { month: 'Jan', attendance: 94, behavior: 92, academic: 89, overall: 92 },
  { month: 'Feb', attendance: 95, behavior: 93, academic: 90, overall: 93 }
];

const HeadTeacherDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Head Teacher Dashboard</h1>
          <p className="text-gray-400">
            Comprehensive school insights aligned with Ofsted's Education Inspection Framework
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
          <Download className="w-5 h-5" />
          Export Overview
        </button>
      </div>

      <SchoolMetricsPanel metrics={sampleMetrics} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <PerformanceChart data={samplePerformanceData} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <OfstedMetricsPanel metrics={sampleOfstedMetrics} />
        </div>
      </div>
    </div>
  );
};

export default HeadTeacherDashboard;