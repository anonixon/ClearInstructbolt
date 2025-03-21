import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { TeacherAction } from '../../../types';

interface TeacherActionsPanelProps {
  actions: TeacherAction[];
}

const TeacherActionsPanel: React.FC<TeacherActionsPanelProps> = ({ actions }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Upcoming Actions</h2>
      <p className="text-gray-400 mb-6">Priority tasks requiring attention</p>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/50"
          >
            <div className={`px-2 py-1 text-xs font-medium rounded-full ${
              action.priority === 'urgent' ? 'bg-red-500/20 text-red-500' :
              action.priority === 'high' ? 'bg-amber-500/20 text-amber-500' :
              'bg-blue-500/20 text-blue-500'
            }`}>
              {action.priority}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Due in {action.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherActionsPanel;