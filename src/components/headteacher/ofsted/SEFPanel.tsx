import React from 'react';
import { SEFSection } from '../../../types';

interface SEFPanelProps {
  sections: SEFSection[];
  overallCompletion: number;
}

const SEFPanel: React.FC<SEFPanelProps> = ({ sections, overallCompletion }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Self-Evaluation Form (SEF)</h2>
        <p className="text-gray-400">Structured self-assessment aligned with Ofsted framework</p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-white">SEF Completion Status</h3>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-sm">
              In Progress
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>
            <span className="text-white">{overallCompletion}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <div key={section.category} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-white">{section.category}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  section.status === 'Good' ? 'bg-emerald-500/20 text-emerald-500' :
                  section.status === 'Outstanding' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-amber-500/20 text-amber-500'
                }`}>
                  {section.status}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{section.description}</p>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Section Completion</span>
                  <span className="text-white">{section.completion}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${section.completion}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SEFPanel;