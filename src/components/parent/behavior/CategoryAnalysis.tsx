import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface CategoryAnalysisProps {
  stats: {
    categories: {
      positive: Array<{
        name: string;
        points: number;
        incidents: number;
      }>;
      negative: Array<{
        name: string;
        points: number;
        incidents: number;
      }>;
    };
  };
}

const CategoryAnalysis: React.FC<CategoryAnalysisProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Positive Behavior Categories</h2>
        <p className="text-gray-400 mb-6">Breakdown of positive behavior points by category</p>

        <div className="space-y-6">
          {stats.categories.positive.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500">+{category.points}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(category.points / 20) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <ThumbsUp className="w-4 h-4" />
                <span>{category.incidents} incidents</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Areas for Improvement</h2>
        <p className="text-gray-400 mb-6">Breakdown of negative behavior points by category</p>

        <div className="space-y-6">
          {stats.categories.negative.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">{category.points}</span>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(Math.abs(category.points) / 4) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <ThumbsDown className="w-4 h-4" />
                <span>{category.incidents} incidents</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysis;