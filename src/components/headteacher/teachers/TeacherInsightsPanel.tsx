import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { TeacherInsight } from '../../../types';

interface TeacherInsightsPanelProps {
  insights: TeacherInsight[];
}

const TeacherInsightsPanel: React.FC<TeacherInsightsPanelProps> = ({ insights }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Key Insights</h2>
      <p className="text-gray-400 mb-6">Summary of critical teacher metrics and trends</p>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-gray-700/50"
          >
            <div className={`p-1 rounded-lg ${
              insight.type === 'success' ? 'text-emerald-500' :
              insight.type === 'warning' ? 'text-amber-500' :
              'text-blue-500'
            }`}>
              {insight.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
               insight.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
               <Info className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-white font-medium">{insight.title}</h3>
              <p className="text-gray-400">{insight.description}</p>
              {insight.metric && (
                <p className={`text-sm mt-1 ${
                  insight.type === 'success' ? 'text-emerald-500' :
                  insight.type === 'warning' ? 'text-amber-500' :
                  'text-blue-500'
                }`}>
                  {insight.metric}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherInsightsPanel;