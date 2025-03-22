import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

interface ReportTemplatesPanelProps {
  templates: ReportTemplate[];
}

const ReportTemplatesPanel: React.FC<ReportTemplatesPanelProps> = ({ templates }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Report Templates</h2>
        <p className="text-gray-400">Pre-configured report templates for quick generation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div key={template.id} className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-white">{template.name}</h3>
              </div>
              <p className="text-gray-400 mb-6">{template.description}</p>
              <button className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Generate
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportTemplatesPanel;