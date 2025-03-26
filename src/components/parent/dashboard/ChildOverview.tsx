import React from 'react';
import { Calendar, BookOpen, Award, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { Student } from '../../../types';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, trend, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
        <div className={`text-${color}-600 dark:text-${color}-400`}>
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <div className={`ml-2 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 ${trend.isPositive ? '' : 'transform rotate-180'}`} />
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

interface Activity {
  type: 'grade' | 'attendance' | 'behavior' | 'homework';
  subject?: string;
  description: string;
  date: string;
}

const ChildOverview = () => {
  const selectedChild = useStore((state) => state.getSelectedChild());
  const attendanceStats = useStore((state) => state.getAttendanceStats(new Date()));
  const behaviorStats = useStore((state) => state.getBehaviorStats(selectedChild?.id || ''));

  // Sample data - replace with real data from your backend
  const metrics = {
    attendance: {
      value: '94%',
      trend: { value: 2, isPositive: true }
    },
    academicProgress: {
      value: 'Above Target',
      trend: { value: 5, isPositive: true }
    },
    behaviorScore: {
      value: 'Good',
      trend: { value: 3, isPositive: true }
    },
    upcomingEvents: {
      value: '3',
      trend: { value: 1, isPositive: false }
    }
  };

  const recentActivities: Activity[] = [
    {
      type: 'grade',
      subject: 'Mathematics',
      description: 'Scored 85% on Algebra Test',
      date: '2024-03-20'
    },
    {
      type: 'attendance',
      description: 'Present - On Time',
      date: '2024-03-19'
    },
    {
      type: 'behavior',
      description: 'Received "Outstanding Effort" Award',
      date: '2024-03-18'
    },
    {
      type: 'homework',
      subject: 'Science',
      description: 'Completed Project on Ecosystems',
      date: '2024-03-17'
    }
  ];

  if (!selectedChild) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No child selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedChild.name}'s Overview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Class {selectedChild.grade} • Year {selectedChild.yearGroup}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Calendar className="w-6 h-6" />}
          label="Attendance Rate"
          value={`${selectedChild.attendance}%`}
          trend={metrics.attendance.trend}
          color="blue"
        />
        <MetricCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Academic Progress"
          value={`${selectedChild.performance}%`}
          trend={metrics.academicProgress.trend}
          color="green"
        />
        <MetricCard
          icon={<Award className="w-6 h-6" />}
          label="Behavior Score"
          value={selectedChild.behaviorScore}
          trend={metrics.behaviorScore.trend}
          color="yellow"
        />
        <MetricCard
          icon={<Clock className="w-6 h-6" />}
          label="Upcoming Events"
          value={metrics.upcomingEvents.value}
          trend={metrics.upcomingEvents.trend}
          color="purple"
        />
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivities.map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {activity.type === 'grade' && <BookOpen className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'attendance' && <Calendar className="w-5 h-5 text-green-500" />}
                  {activity.type === 'behavior' && <Award className="w-5 h-5 text-yellow-500" />}
                  {activity.type === 'homework' && <AlertCircle className="w-5 h-5 text-purple-500" />}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.subject && `${activity.subject}: `}
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildOverview; 