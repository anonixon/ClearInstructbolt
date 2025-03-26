import React, { useState } from 'react';
import { Download } from 'lucide-react';
import StudentMetricsPanel from './StudentMetricsPanel';
import StudentProgressTable from './StudentProgressTable';
import GroupAnalysisPanel from './GroupAnalysisPanel';
import InterventionsPanel from './InterventionsPanel';

const sampleMetrics = {
  totalStudents: {
    count: 1248,
    description: 'Across all year groups'
  },
  averageProgress: {
    value: 0.42,
    description: 'Progress 8 score'
  },
  attainment: {
    value: 5.2,
    description: 'Average attainment 8 score'
  },
  activeInterventions: {
    count: 124,
    description: 'Across 87 students'
  }
};

const sampleStudents = [
  {
    id: '1',
    name: 'Emma Thompson',
    year: 'Year 10',
    progress: 92,
    attendance: 98,
    interventions: 0,
    status: 'Above Target' as const
  },
  {
    id: '2',
    name: 'James Wilson',
    year: 'Year 9',
    progress: 78,
    attendance: 92,
    interventions: 1,
    status: 'On Target' as const
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    year: 'Year 11',
    progress: 65,
    attendance: 85,
    interventions: 2,
    status: 'Below Target' as const
  }
];

const sampleGroups = [
  {
    category: 'Pupil Premium',
    groups: [
      { name: 'PP Students', value: 0.21 },
      { name: 'Non-PP Students', value: 0.48 }
    ]
  },
  {
    category: 'Gender',
    groups: [
      { name: 'Male', value: 0.38 },
      { name: 'Female', value: 0.45 }
    ]
  },
  {
    category: 'SEN Status',
    groups: [
      { name: 'SEN', value: 0.12 },
      { name: 'Non-SEN', value: 0.46 }
    ]
  },
  {
    category: 'EAL Status',
    groups: [
      { name: 'EAL', value: 0.39 },
      { name: 'Non-EAL', value: 0.43 }
    ]
  }
];

const sampleInterventions = [
  {
    id: '1',
    name: 'Literacy Boost Program',
    startDate: '12 Jan 2023',
    lead: 'Ms. Johnson',
    studentCount: 28,
    focusAreas: ['Reading comprehension', 'vocabulary development', 'writing structure'],
    impact: 0.35
  },
  {
    id: '2',
    name: 'Mathematics Mastery',
    startDate: '5 Feb 2023',
    lead: 'Mr. Smith',
    studentCount: 15,
    focusAreas: ['Number skills', 'problem-solving strategies', 'mathematical reasoning'],
    impact: 0.42
  }
];

const StudentsDashboard = () => {
  const [activeTab, setActiveTab] = useState('student-list');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Progress</h1>
          <p className="text-gray-400">
            Track and analyze student progress across all year groups
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
          <Download className="w-5 h-5" />
          Export Data
        </button>
      </div>

      <StudentMetricsPanel metrics={sampleMetrics} />

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Student List"
          active={activeTab === 'student-list'}
          onClick={() => setActiveTab('student-list')}
        />
        <TabButton
          label="Group Analysis"
          active={activeTab === 'group-analysis'}
          onClick={() => setActiveTab('group-analysis')}
        />
        <TabButton
          label="Interventions"
          active={activeTab === 'interventions'}
          onClick={() => setActiveTab('interventions')}
        />
      </div>

      {activeTab === 'student-list' && <StudentProgressTable students={sampleStudents} />}
      {activeTab === 'group-analysis' && <GroupAnalysisPanel groups={sampleGroups} />}
      {activeTab === 'interventions' && <InterventionsPanel interventions={sampleInterventions} />}
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

export default StudentsDashboard;