import React from 'react';
import { OfstedMetric } from '../../../types';

interface OfstedMetricsPanelProps {
  metrics: OfstedMetric[];
}

const OfstedMetricsPanel: React.FC<OfstedMetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Key School Metrics</h2>
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.category}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">{metric.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">
                  {metric.current}% of target {metric.target}%
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  metric.status === 'Improving' ? 'bg-emerald-500/20 text-emerald-500' :
                  metric.status === 'Good' ? 'bg-blue-500/20 text-blue-500' :
                  metric.status === 'Stable' ? 'bg-amber-500/20 text-amber-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {metric.status}
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  metric.status === 'Improving' ? 'bg-emerald-500' :
                  metric.status === 'Good' ? 'bg-blue-500' :
                  metric.status === 'Stable' ? 'bg-amber-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${(metric.current / metric.target) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfstedMetricsPanel;