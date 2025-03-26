import React from 'react';
import { Search, Heart, BarChart, AlertTriangle, Plus } from 'lucide-react';
import { WellbeingMetrics, PastoralLog } from '../../types';

const DEMO_METRICS: WellbeingMetrics = {
  emotional: {
    percentage: 78,
    change: -5
  },
  social: {
    percentage: 82,
    change: 3
  },
  academic: {
    percentage: 75,
    status: 'Stable from last month'
  },
  atRisk: {
    count: 4,
    newCount: 2
  }
};

const DEMO_LOG: PastoralLog = {
  id: '1',
  studentId: '1',
  studentName: 'Unknown Student',
  date: new Date('2023-05-15T10:30:00'),
  severity: 'Medium',
  description: 'Emma has been showing signs of anxiety about upcoming exams. Recommended speaking with the school counselor.',
  loggedBy: 'Ms. Johnson',
  formGroup: '7A'
};

const PastoralCare = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Pastoral Care Logging</h1>
        <p className="text-gray-400">
          Track student well-being and identify at-risk students with AI-powered insights.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <WellbeingCard
          title="Emotional Well-being"
          value={DEMO_METRICS.emotional.percentage}
          change={DEMO_METRICS.emotional.change}
          color="blue"
        />
        <WellbeingCard
          title="Social Well-being"
          value={DEMO_METRICS.social.percentage}
          change={DEMO_METRICS.social.change}
          color="emerald"
        />
        <WellbeingCard
          title="Academic Well-being"
          value={DEMO_METRICS.academic.percentage}
          status={DEMO_METRICS.academic.status}
          color="amber"
        />
        <WellbeingCard
          title="At-Risk Students"
          value={DEMO_METRICS.atRisk.count}
          newCount={DEMO_METRICS.atRisk.newCount}
          color="red"
          isCount
        />
      </div>

      <div className="flex items-center gap-4">
        <TabButton icon={<Heart />} label="Pastoral Logs" active />
        <TabButton icon={<BarChart />} label="Well-being Trends" />
        <TabButton icon={<AlertTriangle />} label="At-Risk Students" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Plus className="w-5 h-5" />
          Add Pastoral Log
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Students</h3>
            <p className="text-sm text-gray-400 mb-4">
              Select a student to view their pastoral care logs
            </p>
            <StudentListItem
              name="Sophia Wilson"
              formGroup="7A"
              logCount={1}
              avatar="SW"
            />
          </div>
        </div>

        <div className="col-span-8">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">All Pastoral Logs</h3>
            <p className="text-sm text-gray-400 mb-4">
              Showing recent logs across all students in 7A
            </p>
            <PastoralLogItem log={DEMO_LOG} />
          </div>
        </div>
      </div>
    </div>
  );
};

const WellbeingCard = ({ 
  title, 
  value, 
  change, 
  status, 
  color, 
  isCount,
  newCount 
}: { 
  title: string;
  value: number;
  change?: number;
  status?: string;
  color: string;
  isCount?: boolean;
  newCount?: number;
}) => (
  <div className="bg-gray-800/50 rounded-lg p-6">
    <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
    <div className={`text-4xl font-bold text-${color}-500 mb-1`}>
      {value}{!isCount && '%'}
    </div>
    {change !== undefined && (
      <div className={`text-sm ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change}% from last month
      </div>
    )}
    {status && <div className="text-sm text-gray-400">{status}</div>}
    {newCount !== undefined && (
      <div className="text-sm text-gray-400">{newCount} new since last week</div>
    )}
  </div>
);

const TabButton = ({ 
  icon, 
  label, 
  active 
}: { 
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <button
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
      ${active 
        ? 'bg-gray-800/50 text-white' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
      }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StudentListItem = ({ 
  name, 
  formGroup, 
  logCount, 
  avatar 
}: { 
  name: string;
  formGroup: string;
  logCount: number;
  avatar: string;
}) => (
  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer">
    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
      {avatar}
    </div>
    <div className="flex-1">
      <div className="font-medium text-white">{name}</div>
      <div className="text-sm text-gray-400">{formGroup}</div>
    </div>
    <div className="px-2 py-1 rounded bg-gray-700 text-sm">
      {logCount} logs
    </div>
  </div>
);

const PastoralLogItem = ({ log }: { log: PastoralLog }) => (
  <div className="border border-gray-700 rounded-lg p-4">
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500" />
        <span className="font-medium text-white">{log.studentName}</span>
      </div>
      <div className={`px-3 py-1 rounded text-sm bg-orange-500/20 text-orange-500`}>
        {log.severity} Severity
      </div>
    </div>
    <div className="text-sm text-gray-400 mb-3">
      {log.date.toLocaleString('en-US', { 
        month: 'long',
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })}
    </div>
    <p className="text-gray-300 mb-2">{log.description}</p>
    <div className="text-sm text-gray-400">
      Logged by {log.loggedBy}
    </div>
  </div>
);

export default PastoralCare;