import React from 'react';
import { Users, TrendingUp, Award, BookOpen } from 'lucide-react';
import { StudentMetrics } from '../../../types';

interface StudentMetricsPanelProps {
  metrics: StudentMetrics;
}

const StudentMetricsPanel: React.FC<StudentMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Total Students"
        value={metrics.totalStudents.count}
        description={metrics.totalStudents.description}
        icon={<Users className="w-5 h-5" />}
        color="blue"
      />
      <MetricCard
        title="Average Progress"
        value={`+${metrics.averageProgress.value}`}
        description={metrics.averageProgress.description}
        icon={<TrendingUp className="w-5 h-5" />}
        color="emerald"
      />
      <MetricCard
        title="Attainment"
        value={metrics.attainment.value}
        description={metrics.attainment.description}
        icon={<Award className="w-5 h-5" />}
        color="purple"
      />
      <MetricCard
        title="Active Interventions"
        value={metrics.activeInterventions.count}
        description={metrics.activeInterventions.description}
        icon={<BookOpen className="w-5 h-5" />}
        color="amber"
      />
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  description,
  icon,
  color
}: {
  title: string;
  value: number | string;
  description: string;
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
      {value}
    </div>
    <div className="text-sm text-gray-400">{description}</div>
  </div>
);

export default StudentMetricsPanel;