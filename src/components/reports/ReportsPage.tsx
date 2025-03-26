import React, { useState } from 'react';
import { FileText, BarChart2, Users, Calendar, Download, Filter, Plus, Search } from 'lucide-react';
import { useStore } from '../../store/useStore';
import ReportsList from './ReportsList';
import ReportGenerator from './ReportGenerator';

const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormGroup, setSelectedFormGroup] = useState<string>('all');
  const [showGenerator, setShowGenerator] = useState(false);
  
  const students = useStore((state) => state.students);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-gray-400">
          Generate and analyze comprehensive reports for students, classes, and school performance
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedFormGroup}
            onChange={(e) => setSelectedFormGroup(e.target.value)}
            className="bg-gray-800/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Form Groups</option>
            {Array.from(new Set(students.map(s => s.grade))).map(grade => (
              <option key={grade} value={grade}>Form {grade}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Plus className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Generated Reports"
          value={24}
          subtext="Last 30 days"
          color="blue"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Student Reports"
          value={156}
          subtext="Individual reports"
          color="emerald"
        />
        <StatCard
          icon={<BarChart2 className="w-5 h-5" />}
          label="Performance Reports"
          value={12}
          subtext="Class analytics"
          color="purple"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Scheduled Reports"
          value={8}
          subtext="Upcoming generation"
          color="amber"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
              <button className="text-gray-400 hover:text-white transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <ReportItem
                title="End of Term Progress Report"
                type="Student Progress"
                date="Mar 15, 2025"
                status="Complete"
                formGroup="7A"
              />
              <ReportItem
                title="Class Performance Analysis"
                type="Performance"
                date="Mar 14, 2025"
                status="Processing"
                formGroup="8B"
              />
              <ReportItem
                title="Attendance Summary"
                type="Attendance"
                date="Mar 13, 2025"
                status="Complete"
                formGroup="All"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Reports</h2>
            <div className="space-y-3">
              <QuickReportButton
                icon={<Users className="w-5 h-5" />}
                label="Student Progress Report"
              />
              <QuickReportButton
                icon={<BarChart2 className="w-5 h-5" />}
                label="Class Performance Analysis"
              />
              <QuickReportButton
                icon={<Calendar className="w-5 h-5" />}
                label="Attendance Summary"
              />
              <QuickReportButton
                icon={<FileText className="w-5 h-5" />}
                label="Behavior Report"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  subtext,
  color 
}: { 
  icon: React.ReactNode;
  label: string;
  value: number;
  subtext: string;
  color: string;
}) => {
  return (
    <div className={`bg-${color}-500/10 rounded-lg p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-500`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <div className={`text-4xl font-bold text-${color}-500 mb-1`}>
        {value}
      </div>
      <div className="text-sm text-gray-400">{subtext}</div>
    </div>
  );
};

const ReportItem = ({
  title,
  type,
  date,
  status,
  formGroup
}: {
  title: string;
  type: string;
  date: string;
  status: 'Complete' | 'Processing';
  formGroup: string;
}) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-gray-600">
        <FileText className="w-5 h-5 text-blue-400" />
      </div>
      <div>
        <h3 className="text-white font-medium">{title}</h3>
        <div className="text-sm text-gray-400">
          {type} • Form {formGroup}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-sm text-gray-400">{date}</div>
      <div className={`px-3 py-1 rounded-full text-sm ${
        status === 'Complete' 
          ? 'bg-emerald-500/20 text-emerald-500'
          : 'bg-amber-500/20 text-amber-500'
      }`}>
        {status}
      </div>
      <button className="p-2 text-gray-400 hover:text-white">
        <Download className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const QuickReportButton = ({ 
  icon, 
  label 
}: { 
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
    <div className="p-2 rounded-lg bg-gray-600 text-blue-400">
      {icon}
    </div>
    <span className="text-white">{label}</span>
  </button>
);

export default ReportsPage;