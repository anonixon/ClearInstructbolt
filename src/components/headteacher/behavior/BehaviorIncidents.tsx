import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 2', incidents: 42 },
  { week: 'Week 4', incidents: 38 },
  { week: 'Week 6', incidents: 35 },
  { week: 'Week 8', incidents: 32 },
  { week: 'Week 10', incidents: 30 },
  { week: 'Week 12', incidents: 28 }
];

const BehaviorIncidents = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Behavior Incidents Trend</h2>
      <p className="text-gray-400 mb-6">Weekly behavior incidents over the current term</p>

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
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
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
              dataKey="incidents" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ fill: '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BehaviorIncidents;