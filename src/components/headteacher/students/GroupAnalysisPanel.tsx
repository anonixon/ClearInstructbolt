import React from 'react';
import { GroupAnalysis } from '../../../types';

interface GroupAnalysisPanelProps {
  groups: GroupAnalysis[];
}

const GroupAnalysisPanel: React.FC<GroupAnalysisPanelProps> = ({ groups }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Group Analysis</h2>
        <p className="text-gray-400">Performance analysis by student groups</p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="text-lg font-medium text-white mb-4">{group.category}</h3>
            <div className="space-y-4">
              {group.groups.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="text-white">+{item.value}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(item.value / 0.5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupAnalysisPanel;