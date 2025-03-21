import React from 'react';
import { YearGroupCoverage } from '../../../types';

interface YearGroupCoverageProps {
  data: YearGroupCoverage[];
}

const YearGroupCoverage: React.FC<YearGroupCoverageProps> = ({ data }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Year Group Curriculum Coverage</h2>
        <p className="text-gray-400">Percentage of curriculum covered by year group</p>
      </div>

      <div className="space-y-4">
        {data.map((yearGroup) => (
          <div key={yearGroup.year}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">{yearGroup.year}</span>
              <span className="text-gray-400">{yearGroup.coverage}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${yearGroup.coverage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearGroupCoverage;