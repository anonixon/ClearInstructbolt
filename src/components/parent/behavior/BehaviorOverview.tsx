import React from 'react';
import { ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';

interface BehaviorOverviewProps {
  stats: {
    netPoints: number;
    positive: {
      points: number;
      incidents: number;
    };
    negative: {
      points: number;
      incidents: number;
    };
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

const BehaviorOverview: React.FC<BehaviorOverviewProps> = ({ stats }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Behavior Overview</h2>
      <p className="text-gray-400 mb-6">Summary of behavior points and incidents</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 rounded-lg p-6">
          <div className="relative w-48 h-48 mx-auto">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#1f2937"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#10b981"
                strokeWidth="12"
                strokeDasharray="552"
                strokeDashoffset="138"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="#ef4444"
                strokeWidth="12"
                strokeDasharray="552"
                strokeDashoffset="483"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white">{stats.netPoints}</div>
              <div className="text-sm text-gray-400">Net Points</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            <div>
              <div className="text-emerald-500">+{stats.positive.points}</div>
              <div className="text-sm text-gray-400">Positive</div>
            </div>
            <div>
              <div className="text-red-500">-{stats.negative.points}</div>
              <div className="text-sm text-gray-400">Negative</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Behavior Incidents</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-400">Positive Incidents</span>
                <span className="text-white">{stats.positive.incidents}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(stats.positive.incidents / (stats.positive.incidents + stats.negative.incidents)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-400">Negative Incidents</span>
                <span className="text-white">{stats.negative.incidents}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(stats.negative.incidents / (stats.positive.incidents + stats.negative.incidents)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Top Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Academic Excellence</span>
                </div>
                <span>+20</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpfulness</span>
                </div>
                <span>+10</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-500">
                  <ThumbsDown className="w-4 h-4" />
                  <span>Homework Completion</span>
                </div>
                <span>-4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Monthly Trend</h3>
          <div className="h-48 flex items-center justify-center">
            <div className="w-full h-full flex items-end justify-between gap-2">
              {[4, 3, 5, 2, 6, 4, 3].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-1">
                    <div 
                      className="w-full bg-emerald-500 rounded-sm"
                      style={{ height: `${value * 10}%` }}
                    />
                    <div 
                      className="w-full bg-red-500 rounded-sm"
                      style={{ height: '10%' }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
              <span className="text-gray-400">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm" />
              <span className="text-gray-400">Negative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorOverview;