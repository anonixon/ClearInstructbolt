import React from 'react';
import { Calendar, Users, Edit } from 'lucide-react';

interface ScheduledReport {
  name: string;
  frequency: string;
  nextRun: string;
  recipients: string;
  status: string;
}

interface ScheduledReportsPanelProps {
  reports: ScheduledReport[];
}

const ScheduledReportsPanel: React.FC<ScheduledReportsPanelProps> = ({ reports }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Scheduled Reports</h2>
        <p className="text-gray-400">Automated reports generated on a schedule</p>
      </div>

      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Report Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Frequency</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Next Run</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Recipients</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <span className="text-white">{report.name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{report.frequency}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400">{report.nextRun}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{report.recipients}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Active' 
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end">
                    <button className="px-4 py-2 text-gray-400 hover:text-white">
                      Edit
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

export default ScheduledReportsPanel;