import React from 'react';

const InterventionsPanel = () => {
  const yearGroups = [
    { year: 'Year 7', students: 12 },
    { year: 'Year 8', students: 15 },
    { year: 'Year 9', students: 18 },
    { year: 'Year 10', students: 22 },
    { year: 'Year 11', students: 24 }
  ];

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Students Requiring Intervention</h2>
      <p className="text-gray-400 mb-6">Students with attendance below 90%</p>

      <div className="space-y-4">
        {yearGroups.map((group) => (
          <div key={group.year}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">{group.year}</span>
              <span className="text-gray-400">{group.students} students</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(group.students / 30) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionsPanel;