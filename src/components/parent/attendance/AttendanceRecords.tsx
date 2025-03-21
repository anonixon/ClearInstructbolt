import React from 'react';
import { Clock, Download } from 'lucide-react';

const AttendanceRecords = () => {
  const records = [
    {
      date: '15 Apr 2023',
      status: 'Absent',
      reason: 'Medical appointment',
      details: '',
      authorized: true
    },
    {
      date: '22 Mar 2023',
      status: 'Absent',
      reason: 'Family event',
      details: '',
      authorized: true
    },
    {
      date: '10 Feb 2023',
      status: 'Late',
      reason: 'Transport issues',
      details: '15 minutes',
      authorized: true
    },
    {
      date: '05 Feb 2023',
      status: 'Late',
      reason: 'Overslept',
      details: '25 minutes',
      authorized: false
    },
    {
      date: '18 Jan 2023',
      status: 'Late',
      reason: 'Traffic',
      details: '10 minutes',
      authorized: true
    }
  ];

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Attendance Records</h2>
          <p className="text-gray-400">Detailed list of absences and late arrivals</p>
        </div>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
          <Download className="w-5 h-5" />
          Export Records
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-400">
            <th className="pb-4">Date</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Reason</th>
            <th className="pb-4">Details</th>
            <th className="pb-4">Authorization</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {records.map((record, index) => (
            <tr key={index} className="text-sm">
              <td className="py-4 text-white">{record.date}</td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${
                    record.status === 'Late' ? 'text-blue-500' : 'text-amber-500'
                  }`} />
                  <span className="text-white">{record.status}</span>
                </div>
              </td>
              <td className="py-4 text-gray-400">{record.reason}</td>
              <td className="py-4 text-gray-400">{record.details}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  record.authorized
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {record.authorized ? 'Authorized' : 'Unauthorized'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecords;