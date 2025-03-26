import React from 'react';
import { Users } from 'lucide-react';

const AttendanceOverview = () => {
  const metrics = [
    {
      title: 'Overall Attendance Rate',
      value: '94.2%',
      change: '+0.5% from last term',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Persistent Absence',
      value: '5.8%',
      change: '-0.3% from last term',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Authorized Absence',
      value: '4.1%',
      change: '+0.2% from last term',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Unauthorized Absence',
      value: '1.7%',
      change: '-0.5% from last term',
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-700 text-blue-500">
              {metric.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
          <div className={`text-sm ${
            metric.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {metric.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceOverview;