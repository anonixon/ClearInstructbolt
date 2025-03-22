import React from 'react';
import { Book, Clock, CheckCircle, TrendingUp } from 'lucide-react';

interface HomeworkOverviewProps {
  stats: {
    total: number;
    upcoming: number;
    completed: number;
    completionRate: number;
    dueSoon: {
      count: number;
      assignment: {
        subject: string;
        title: string;
        status: string;
      };
    };
    inProgress: number;
    averageGrade: string;
    recentGrades: string[];
  };
}

const HomeworkOverview: React.FC<HomeworkOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        icon={<Book className="w-5 h-5" />}
        label="Total Assignments"
        value={stats.total.toString()}
        subtext={`${stats.upcoming} upcoming, ${stats.completed} completed`}
        progress={stats.completionRate}
      />

      <StatCard
        icon={<Clock className="w-5 h-5" />}
        label="Due Soon"
        value={stats.dueSoon.count.toString()}
        subtext="Due within 24 hours"
        highlight={`${stats.dueSoon.assignment.subject}: ${stats.dueSoon.assignment.title}`}
        status={stats.dueSoon.assignment.status}
      />

      <StatCard
        icon={<CheckCircle className="w-5 h-5" />}
        label="Completion Status"
        value={stats.inProgress.toString()}
        subtext="In progress"
        breakdown={{
          notStarted: 3,
          inProgress: 1,
          completed: 3
        }}
      />

      <StatCard
        icon={<TrendingUp className="w-5 h-5" />}
        label="Average Grade"
        value={stats.averageGrade}
        subtext="Based on recent assignments"
        grades={stats.recentGrades}
      />
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  subtext,
  progress,
  highlight,
  status,
  breakdown,
  grades
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  progress?: number;
  highlight?: string;
  status?: string;
  breakdown?: {
    notStarted: number;
    inProgress: number;
    completed: number;
  };
  grades?: string[];
}) => (
  <div className="bg-gray-800/50 rounded-lg p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gray-700 text-blue-500">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{label}</h3>
    </div>

    <div className="text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-sm text-gray-400">{subtext}</div>

    {progress !== undefined && (
      <div className="mt-4">
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-400 mt-2">
          {progress}% completion rate
        </div>
      </div>
    )}

    {highlight && (
      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
        <div className="text-sm text-white">{highlight}</div>
        <div className={`text-sm ${
          status === 'Not Started' ? 'text-amber-500' : 'text-emerald-500'
        }`}>
          {status}
        </div>
      </div>
    )}

    {breakdown && (
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-lg font-bold text-amber-500">
            {breakdown.notStarted}
          </div>
          <div className="text-xs text-gray-400">Not Started</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-500">
            {breakdown.inProgress}
          </div>
          <div className="text-xs text-gray-400">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-500">
            {breakdown.completed}
          </div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
      </div>
    )}

    {grades && (
      <div className="mt-4 flex items-center gap-2">
        {grades.map((grade, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              grade === 'A' ? 'bg-emerald-500/20 text-emerald-500' :
              grade === 'B' ? 'bg-blue-500/20 text-blue-500' :
              'bg-amber-500/20 text-amber-500'
            }`}
          >
            {grade}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default HomeworkOverview;