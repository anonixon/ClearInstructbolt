import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { CurriculumBalance } from '../../../types';

interface CurriculumBalanceChartProps {
  data: CurriculumBalance[];
}

const CurriculumBalanceChart: React.FC<CurriculumBalanceChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Curriculum Balance</h2>
        <p className="text-gray-400">Distribution of curriculum time and focus</p>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: '#9CA3AF' }}
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.2}
            />
            <Radar
              name="Target"
              dataKey="target"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-gray-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
          <span className="text-gray-400">Target</span>
        </div>
      </div>
    </div>
  );
};

export default CurriculumBalanceChart;