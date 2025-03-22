import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: 'Year 7', attendance: 95 },
  { year: 'Year 8', attendance: 94.5 },
  { year: 'Year 9', attendance: 94 },
  { year: 'Year 10', attendance: 93.5 },
  { year: 'Year 11', attendance: 93 }
];

const YearGroupComparison = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Year Group Comparison</h2>
      <p className="text-gray-400 mb-6">Attendance rates by year group</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year" 
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
            <Bar 
              dataKey="attendance" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearGroupComparison;