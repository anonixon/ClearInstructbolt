import React from 'react';
import { Users, TrendingDown, TrendingUp, Award, Target } from 'lucide-react';
import { SchoolMetrics } from '../../../types';

interface SchoolMetricsPanelProps {
  metrics: SchoolMetrics;
}

const SchoolMetricsPanel: React.FC<SchoolMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        label="Attendance Rate"
        value={`${metrics.attendanceRate.value}%`}
        change={metrics.attendanceRate.change}
        period={metrics.attendanceRate.period}
        icon={<Users className="w-5 h-5" />}
        color="blue"
      />
      <MetricCard
        label="Behavior Incidents"
        value={`${metrics.behaviorIncidents.value}%`}
        change={metrics.behaviorIncidents.change}
        period={metrics.behaviorIncidents.period}
        icon={<TrendingDown className="w-5 h-5" />}
        color="red"
        invertChange
      />
      <MetricCard
        label="Academic Progress"
        value={`+${metrics.academicProgress.value}%`}
        subtext={metrics.academicProgress.comparison}
        icon={<TrendingUp className="w-5 h-5" />}
        color="emerald"
      />
      <MetricCard
        label="Ofsted Readiness"
        value={`${metrics.ofstedReadiness.value}%`}
        change={metrics.ofstedReadiness.change}
        period={metrics.ofstedReadiness.lastAssessment}
        icon={<Target className="w-5 h-5" />}
        color="purple"
      />
    </div>
  );
};

const MetricCard = ({ 
  label, 
  value, 
  change, 
  period,
  subtext,
  icon, 
  color,
  invertChange = false
}: { 
  label: string;
  value: string;
  change?: number;
  period?: string;
  subtext?: string;
  icon: React.ReactNode;
  color: string;
  invertChange?: boolean;
}) => (
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
    {change !== undefined && (
      <div className={`flex items-center gap-1 text-sm ${
        (invertChange ? -change : change) >= 0 
          ? 'text-emerald-500' 
          : 'text-red-500'
      }`}>
        {(invertChange ? -change : change) >= 0 ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{Math.abs(change)}% {period}</span>
      </div>
    )}
    {subtext && <div className="text-sm text-gray-400">{subtext}</div>}
  </div>
);

export default SchoolMetricsPanel;