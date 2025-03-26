import React from 'react';
import { BarChart2, TrendingUp } from 'lucide-react';

const HomeworkAnalytics = () => {
  const subjects = [
    { name: 'Mathematics', assignments: 5, completionRate: 80 },
    { name: 'English', assignments: 4, completionRate: 75 },
    { name: 'Science', assignments: 6, completionRate: 85 },
    { name: 'History', assignments: 3, completionRate: 100 },
    { name: 'Geography', assignments: 4, completionRate: 100 },
    { name: 'Art', assignments: 3, completionRate: 67 }
  ];

  const weeklyData = {
    assigned: [5, 6, 4, 7, 4],
    completed: [5, 5, 4, 6, 1],
    completionRate: 81,
    weeklyAverage: 5.2,
    currentWeek: {
      assigned: 4,
      completed: 1
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Completion Rate by Subject</h2>
        <p className="text-gray-400 mb-6">Assignment completion percentage by subject</p>

        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.name}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">{subject.name}</span>
                <span className="text-white">{subject.assignments} assignments</span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-500">
                      Completion Rate: {subject.completionRate}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-700">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    style={{ width: `${subject.completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Weekly Assignment Trends</h2>
        <p className="text-gray-400 mb-6">Assigned vs. completed homework over time</p>

        <div className="h-64 flex items-end justify-between gap-8">
          {weeklyData.assigned.map((assigned, index) => {
            const completed = weeklyData.completed[index];
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full space-y-1">
                  <div
                    className="h-32 bg-blue-500/20 rounded-t-lg relative"
                    style={{ height: `${(assigned / 8) * 100}%` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all"
                      style={{ height: `${(completed / assigned) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  Week {index + 1}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold text-white">{weeklyData.completionRate}%</div>
              <div className="text-sm text-gray-400">Completion Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{weeklyData.weeklyAverage}</div>
              <div className="text-sm text-gray-400">Weekly Average</div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-500 rounded-full">
                  {weeklyData.currentWeek.assigned} Assigned
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full">
                  {weeklyData.currentWeek.completed} Completed
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">Current Week</div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-2">Homework Insights</h3>
          <p className="text-gray-300">
            Emma consistently completes assignments on time. Mathematics and Science have the highest workload, with an average of 1-2 hours of homework per week for each subject.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeworkAnalytics;