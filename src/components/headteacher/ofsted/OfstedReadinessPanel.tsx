import React from 'react';
import { FileText, Download } from 'lucide-react';
import { OfstedAssessment, OfstedCriteria } from '../../../types';

interface OfstedReadinessPanelProps {
  assessments: OfstedAssessment[];
  criteria: OfstedCriteria[];
}

const OfstedReadinessPanel: React.FC<OfstedReadinessPanelProps> = ({
  assessments,
  criteria
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Ofsted Readiness</h2>
          <p className="text-gray-400">Track compliance with Ofsted's Education Inspection Framework</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
            <FileText className="w-5 h-5" />
            SEF Template
          </button>
          <button className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {assessments.map((assessment) => (
          <div key={assessment.category} className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">{assessment.category}</h3>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-white">
                {assessment.score}%
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  assessment.status === 'Good' ? 'bg-emerald-500/20 text-emerald-500' :
                  assessment.status === 'Outstanding' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-amber-500/20 text-amber-500'
                }`}>
                  {assessment.status}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Last updated: {assessment.lastUpdated}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Quality of Education - Detailed Assessment</h3>
        <div className="space-y-6">
          {criteria.map((criterion) => (
            <div key={criterion.name} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  criterion.status === 'Good' ? 'bg-emerald-500' :
                  criterion.status === 'Outstanding' ? 'bg-blue-500' :
                  'bg-amber-500'
                }`} />
                <h4 className="text-lg font-medium text-white">{criterion.name}</h4>
                <span className={`ml-auto px-2 py-1 text-xs font-medium rounded-full ${
                  criterion.status === 'Good' ? 'bg-emerald-500/20 text-emerald-500' :
                  criterion.status === 'Outstanding' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-amber-500/20 text-amber-500'
                }`}>
                  {criterion.status}
                </span>
              </div>
              <p className="text-gray-400">{criterion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfstedReadinessPanel;