import React from 'react';
import { FileText, Download } from 'lucide-react';

interface Report {
  name: string;
  type: string;
  generated: string;
  createdBy: string;
}

interface RecentReportsPanelProps {
  reports: Report[];
}

const RecentReportsPanel: React.FC<RecentReportsPanelProps> = ({ reports }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
        <p className="text-gray-400">Recently generated reports and analyses</p>
      </div>

      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Report Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Generated</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Created By</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-white">{report.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.type === 'Performance' ? 'bg-blue-500/20 text-blue-500' :
                    report.type === 'Progress' ? 'bg-emerald-500/20 text-emerald-500' :
                    'bg-purple-500/20 text-purple-500'
                  }`}>
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{report.generated}</td>
                <td className="px-6 py-4 text-gray-400">{report.createdBy}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-white">
                      <FileText className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReportsPanel;