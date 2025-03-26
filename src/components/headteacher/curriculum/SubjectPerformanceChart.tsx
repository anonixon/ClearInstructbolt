import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SubjectPerformance } from '../../../types';

interface SubjectPerformanceChartProps {
  data: SubjectPerformance[];
}

const SubjectPerformanceChart: React.FC<SubjectPerformanceChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Subject Performance</h2>
        <p className="text-gray-400">Average attainment across core subjects</p>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="subject" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
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
              dataKey="performance" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubjectPerformanceChart;