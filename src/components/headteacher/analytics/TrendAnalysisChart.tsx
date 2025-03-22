import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendData {
  month: string;
  performance: number;
  attendance: number;
  behavior: number;
}

interface TrendAnalysisChartProps {
  data: TrendData[];
}

const TrendAnalysisChart: React.FC<TrendAnalysisChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Performance Trends</h2>
        <p className="text-gray-400">Historical analysis of key performance indicators</p>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F9FAFB'
              }}
            />
            <Legend 
              wrapperStyle={{
                color: '#9CA3AF'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6' }}
            />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981' }}
            />
            <Line 
              type="monotone" 
              dataKey="behavior" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ fill: '#8B5CF6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendAnalysisChart;