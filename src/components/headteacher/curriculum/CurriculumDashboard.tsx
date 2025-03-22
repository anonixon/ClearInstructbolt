import React from 'react';
import { Download } from 'lucide-react';
import CurriculumMetricsPanel from './CurriculumMetricsPanel';
import SubjectPerformanceChart from './SubjectPerformanceChart';
import CurriculumBalanceChart from './CurriculumBalanceChart';
import YearGroupCoverage from './YearGroupCoverage';
import ImplementationProgress from './ImplementationProgress';

const sampleMetrics = {
  coverage: {
    percentage: 87,
    status: 'On track for term completion'
  },
  assessment: {
    percentage: 92,
    change: 3,
    period: 'from last assessment cycle'
  },
  objectives: {
    percentage: 78,
    change: 5,
    period: 'from last term'
  },
  resources: {
    percentage: 94,
    status: 'Resources available'
  }
};

const sampleSubjectPerformance = [
  { subject: 'English', performance: 82, target: 85, trend: 'up' },
  { subject: 'Mathematics', performance: 78, target: 85, trend: 'stable' },
  { subject: 'Science', performance: 85, target: 85, trend: 'up' },
  { subject: 'History', performance: 80, target: 85, trend: 'down' },
  { subject: 'Geography', performance: 75, target: 85, trend: 'stable' },
  { subject: 'Art & Design', performance: 88, target: 85, trend: 'up' }
];

const sampleCurriculumBalance = [
  { category: 'Knowledge', current: 85, target: 90 },
  { category: 'Skills', current: 75, target: 85 },
  { category: 'Assessment', current: 90, target: 85 },
  { category: 'Resources', current: 80, target: 85 },
  { category: 'Engagement', current: 70, target: 80 }
];

const sampleYearGroupCoverage = [
  { year: 'Year 7', coverage: 92, target: 95 },
  { year: 'Year 8', coverage: 88, target: 95 },
  { year: 'Year 9', coverage: 85, target: 95 },
  { year: 'Year 10', coverage: 82, target: 95 },
  { year: 'Year 11', coverage: 90, target: 95 }
];

const sampleImplementationProgress = [
  { month: 'Sep', actual: 95, planned: 95 },
  { month: 'Oct', actual: 90, planned: 90 },
  { month: 'Nov', actual: 85, planned: 85 },
  { month: 'Dec', actual: 80, planned: 75 },
  { month: 'Jan', actual: 70, planned: 65 },
  { month: 'Feb', actual: 60, planned: 55 },
  { month: 'Mar', actual: 50, planned: 45 },
  { month: 'Apr', actual: 40, planned: 35 },
  { month: 'May', actual: 30, planned: 25 }
];

const CurriculumDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Curriculum Dashboard</h1>
          <p className="text-gray-400">
            Monitor curriculum implementation, assessment, and student progress
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
          <Download className="w-5 h-5" />
          Export Overview
        </button>
      </div>

      <CurriculumMetricsPanel metrics={sampleMetrics} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <SubjectPerformanceChart data={sampleSubjectPerformance} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CurriculumBalanceChart data={sampleCurriculumBalance} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ImplementationProgress data={sampleImplementationProgress} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <YearGroupCoverage data={sampleYearGroupCoverage} />
        </div>
      </div>
    </div>
  );
};

export default CurriculumDashboard;