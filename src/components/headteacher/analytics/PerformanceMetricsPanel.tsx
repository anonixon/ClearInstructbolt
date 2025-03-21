import React from 'react';
import { TrendingUp, Users, Award, BarChart2 } from 'lucide-react';

interface PerformanceMetrics {
  performance: {
    value: number;
    change: number;
    period: string;
    status: string;
  };
  attendance: {
    value: number;
    change: number;
    period: string;
    status: string;
  };
  behavior: {
    value: number;
    change: number;
    period: string;
    status: string;
  };
  resources: {
    value: number;
    change: number;
    period: string;
    status: string;
  };
}

interface PerformanceMetricsPanelProps {
  metrics: PerformanceMetrics;
}

const PerformanceMetricsPanel: React.FC<PerformanceMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Overall Performance"
        value={metrics.performance.value}
        change={metrics.performance.change}
        period={metrics.performance.period}
        status={metrics.performance.status}
        icon={<TrendingUp className="w-5 h-5" />}
        color="blue"
      />
      <MetricCard
        title="Attendance Rate"
        value={metrics.attendance.value}
        change={metrics.attendance.change}
        period={metrics.attendance.period}
        status={metrics.attendance.status}
        icon={<Users className="w-5 h-5" />}
        color="emerald"
      />
      <MetricCard
        title="Behavior Score"
        value={metrics.behavior.value}
        change={metrics.behavior.change}
        period={metrics.behavior.period}
        status={metrics.behavior.status}
        icon={<Award className="w-5 h-5" />}
        color="purple"
      />
      <MetricCard
        title="Resource Efficiency"
        value={metrics.resources.value}
        change={metrics.resources.change}
        period={metrics.resources.period}
        status={metrics.resources.status}
        icon={<BarChart2 className="w-5 h-5" />}
        color="amber"
      />
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  change,
  period,
  status,
  icon,
  color
}: {
  title: string;
  value: number;
  change: number;
  period: string;
  status: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className={`bg-gray-800/50 rounded-lg p-6`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-500`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="text-4xl font-bold text-white mb-2">
      {value}%
    </div>
    <div className="flex items-center justify-between">
      <div className={`text-sm ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change}% {period}
      </div>
      <div className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full">
        {status}
      </div>
    </div>
  </div>
);

export default PerformanceMetricsPanel;