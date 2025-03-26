import React from 'react';
import { Users, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { TeacherMetrics } from '../../../types';

interface TeacherMetricsPanelProps {
  metrics: TeacherMetrics;
}

const TeacherMetricsPanel: React.FC<TeacherMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Total Teachers"
        value={metrics.totalTeachers.count}
        subtext={`${metrics.totalTeachers.newCount} new this ${metrics.totalTeachers.period}`}
        icon={<Users className="w-5 h-5" />}
        color="blue"
      />
      <MetricCard
        title="Performance Rating"
        value={metrics.performanceRating.percentage}
        change={metrics.performanceRating.change}
        period={metrics.performanceRating.period}
        icon={<TrendingUp className="w-5 h-5" />}
        color="emerald"
        isPercentage
      />
      <MetricCard
        title="CPD Completion"
        value={metrics.cpdCompletion.percentage}
        subtext={`Target: ${metrics.cpdCompletion.target}%`}
        icon={<BookOpen className="w-5 h-5" />}
        color="purple"
        isPercentage
      />
      <MetricCard
        title="Avg. Workload"
        value={metrics.workload.hours}
        change={metrics.workload.change}
        period={metrics.workload.period}
        icon={<Clock className="w-5 h-5" />}
        color="amber"
        unit="hrs"
        invertChange
      />
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  change,
  period,
  subtext,
  icon,
  color,
  isPercentage = false,
  unit = '',
  invertChange = false
}: {
  title: string;
  value: number;
  change?: number;
  period?: string;
  subtext?: string;
  icon: React.ReactNode;
  color: string;
  isPercentage?: boolean;
  unit?: string;
  invertChange?: boolean;
}) => (
  <div className={`bg-gray-800/50 rounded-lg p-6`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-500`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="text-4xl font-bold text-white mb-2">
      {value}{isPercentage ? '%' : unit}
    </div>
    {change !== undefined && (
      <div className={`text-sm ${
        (invertChange ? -change : change) >= 0 ? 'text-emerald-500' : 'text-red-500'
      }`}>
        {(invertChange ? -change : change) >= 0 ? '+' : ''}{change} {period}
      </div>
    )}
    {subtext && <div className="text-sm text-gray-400">{subtext}</div>}
  </div>
);

export default TeacherMetricsPanel;