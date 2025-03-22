import React from 'react';
import { Book, CheckCircle, Target, Archive } from 'lucide-react';
import { CurriculumMetrics } from '../../../types';

interface CurriculumMetricsPanelProps {
  metrics: CurriculumMetrics;
}

const CurriculumMetricsPanel: React.FC<CurriculumMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Curriculum Coverage"
        value={metrics.coverage.percentage}
        status={metrics.coverage.status}
        icon={<Book className="w-5 h-5" />}
        color="blue"
      />
      <MetricCard
        title="Assessment Completion"
        value={metrics.assessment.percentage}
        change={metrics.assessment.change}
        period={metrics.assessment.period}
        icon={<CheckCircle className="w-5 h-5" />}
        color="emerald"
      />
      <MetricCard
        title="Learning Objectives Met"
        value={metrics.objectives.percentage}
        change={metrics.objectives.change}
        period={metrics.objectives.period}
        icon={<Target className="w-5 h-5" />}
        color="amber"
      />
      <MetricCard
        title="Curriculum Resources"
        value={metrics.resources.percentage}
        status={metrics.resources.status}
        icon={<Archive className="w-5 h-5" />}
        color="purple"
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
  change?: number;
  period?: string;
  status?: string;
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
    {change !== undefined && (
      <div className={`text-sm ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change}% {period}
      </div>
    )}
    {status && (
      <div className="text-sm text-gray-400">{status}</div>
    )}
  </div>
);

export default CurriculumMetricsPanel;