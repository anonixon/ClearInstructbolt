import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: 'Year 7', incidents: 85, rewards: 3200 },
  { year: 'Year 8', incidents: 92, rewards: 2800 },
  { year: 'Year 9', incidents: 78, rewards: 2400 },
  { year: 'Year 10', incidents: 65, rewards: 2200 },
  { year: 'Year 11', incidents: 55, rewards: 1900 }
];

const YearGroupComparison = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Year Group Comparison</h2>
      <p className="text-gray-400 mb-6">Behavior incidents by year group</p>

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
              domain={[0, 3400]}
              ticks={[0, 850, 1700, 2550, 3400]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F9FAFB'
              }}
            />
            <Bar dataKey="incidents" fill="#EF4444" />
            <Bar dataKey="rewards" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YearGroupComparison;