import React from 'react';
import { Intervention } from '../../../types';

interface InterventionsPanelProps {
  interventions: Intervention[];
}

const InterventionsPanel: React.FC<InterventionsPanelProps> = ({ interventions }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Active Interventions</h2>
        <p className="text-gray-400">Current intervention programs and their impact</p>
      </div>

      <div className="space-y-4">
        {interventions.map((intervention) => (
          <div key={intervention.id} className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">{intervention.name}</h3>
                <p className="text-sm text-gray-400">
                  Started: {intervention.startDate} • Lead: {intervention.lead}
                </p>
              </div>
              <div className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white">
                {intervention.studentCount} students
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Focus Areas:</h4>
                <p className="text-gray-400">{intervention.focusAreas.join(', ')}.</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-2">Impact:</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${(intervention.impact / 0.5) * 100}%` }}
                    />
                  </div>
                  <span className="text-emerald-500">+{intervention.impact} avg. improvement</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionsPanel;