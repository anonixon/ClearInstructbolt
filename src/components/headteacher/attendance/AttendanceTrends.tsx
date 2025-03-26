import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 2', attendance: 93.5 },
  { week: 'Week 4', attendance: 93.8 },
  { week: 'Week 6', attendance: 93.6 },
  { week: 'Week 8', attendance: 94.2 },
  { week: 'Week 10', attendance: 94.0 },
  { week: 'Week 12', attendance: 94.2 }
];

const AttendanceTrends = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Attendance Trends</h2>
      <p className="text-gray-400 mb-6">Weekly attendance rates over the current term</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="week" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={[90, 100]}
              ticks={[90, 93, 96, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F9FAFB'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceTrends;