import React from 'react';
import { Check } from 'lucide-react';

interface DailyRecordProps {
  selectedDate: Date;
}

const DailyRecord: React.FC<DailyRecordProps> = ({ selectedDate }) => {
  const periods = [
    { name: 'Registration', time: '8:45 - 9:00', subject: '-' },
    { name: 'Period 1', time: '9:00 - 10:00', subject: 'Mathematics' },
    { name: 'Period 2', time: '10:00 - 11:00', subject: 'English' },
    { name: 'Break', time: '11:00 - 11:20', subject: '-' },
    { name: 'Period 3', time: '11:20 - 12:20', subject: 'Science' },
    { name: 'Period 4', time: '12:20 - 13:20', subject: 'History' },
    { name: 'Lunch', time: '13:20 - 14:05', subject: '-' },
    { name: 'Period 5', time: '14:05 - 15:05', subject: 'Art' }
  ];

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Daily Attendance Record</h2>
        <p className="text-gray-400">Period-by-period attendance for today</p>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-400">
            <th className="pb-4">Period</th>
            <th className="pb-4">Time</th>
            <th className="pb-4">Subject</th>
            <th className="pb-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {periods.map((period) => (
            <tr key={period.name}>
              <td className="py-4 text-white">{period.name}</td>
              <td className="py-4 text-gray-400">{period.time}</td>
              <td className="py-4 text-gray-400">{period.subject}</td>
              <td className="py-4">
                {period.subject !== '-' && (
                  <span className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full">
                    Present
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyRecord;