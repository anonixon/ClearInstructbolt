import React, { useState } from 'react';
import { Filter, FileText, Download, Calendar, BarChart2, Users } from 'lucide-react';
import RecentReportsPanel from './RecentReportsPanel';
import ReportTemplatesPanel from './ReportTemplatesPanel';
import ScheduledReportsPanel from './ScheduledReportsPanel';

const sampleRecentReports = [
  {
    name: 'End of Term Performance Summary',
    type: 'Performance',
    generated: '2 days ago',
    createdBy: 'Head Teacher'
  },
  {
    name: 'Year 11 Progress Report',
    type: 'Progress',
    generated: '1 week ago',
    createdBy: 'Deputy Head'
  },
  {
    name: 'Attendance Analysis Term 2',
    type: 'Attendance',
    generated: '2 weeks ago',
    createdBy: 'Attendance Officer'
  }
];

const sampleTemplates = [
  {
    id: 'ofsted',
    name: 'Ofsted Data Summary',
    description: 'Key metrics aligned with Ofsted framework',
    icon: FileText
  },
  {
    id: 'progress',
    name: 'Student Progress Report',
    description: 'Detailed progress analysis by student groups',
    icon: BarChart2
  },
  {
    id: 'attendance',
    name: 'Attendance Analysis',
    description: 'Patterns and trends in student attendance',
    icon: Calendar
  },
  {
    id: 'intervention',
    name: 'Intervention Impact',
    description: 'Effectiveness of intervention strategies',
    icon: BarChart2
  },
  {
    id: 'department',
    name: 'Department Performance',
    description: 'Subject-level analysis and comparison',
    icon: Users
  },
  {
    id: 'behavior',
    name: 'Behavior Incidents',
    description: 'Analysis of behavior patterns and trends',
    icon: BarChart2
  }
];

const sampleScheduledReports = [
  {
    name: 'Weekly Attendance Summary',
    frequency: 'Weekly',
    nextRun: 'Monday, 8:00 AM',
    recipients: 'SLT, Form Tutors',
    status: 'Active'
  },
  {
    name: 'Monthly Progress Update',
    frequency: 'Monthly',
    nextRun: '1st June, 9:00 AM',
    recipients: 'All Staff',
    status: 'Active'
  },
  {
    name: 'Half-Term Data Analysis',
    frequency: 'Half-Term',
    nextRun: '24th May, 10:00 AM',
    recipients: 'SLT, Governors',
    status: 'Active'
  },
  {
    name: 'Behavior Incident Report',
    frequency: 'Weekly',
    nextRun: 'Friday, 3:00 PM',
    recipients: 'SLT, Heads of Year',
    status: 'Paused'
  }
];

const ReportsDashboard = () => {
  const [activeTab, setActiveTab] = useState('recent-reports');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-gray-400">
            Generate and access reports for school performance analysis
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FileText className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Recent Reports"
          active={activeTab === 'recent-reports'}
          onClick={() => setActiveTab('recent-reports')}
        />
        <TabButton
          label="Report Templates"
          active={activeTab === 'report-templates'}
          onClick={() => setActiveTab('report-templates')}
        />
        <TabButton
          label="Scheduled Reports"
          active={activeTab === 'scheduled-reports'}
          onClick={() => setActiveTab('scheduled-reports')}
        />
      </div>

      {activeTab === 'recent-reports' && <RecentReportsPanel reports={sampleRecentReports} />}
      {activeTab === 'report-templates' && <ReportTemplatesPanel templates={sampleTemplates} />}
      {activeTab === 'scheduled-reports' && <ScheduledReportsPanel reports={sampleScheduledReports} />}
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

export default ReportsDashboard;