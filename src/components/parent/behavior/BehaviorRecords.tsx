import React from 'react';
import { ThumbsUp, ThumbsDown, Download } from 'lucide-react';

const BehaviorRecords = () => {
  const records = [
    {
      date: '15 Apr 2023',
      category: 'Academic Excellence',
      description: 'Outstanding contribution in Science class',
      teacher: 'Mr. Johnson',
      points: 5,
      type: 'positive'
    },
    {
      date: '10 Apr 2023',
      category: 'Helpfulness',
      description: 'Assisted a new student with orientation',
      teacher: 'Ms. Smith',
      points: 3,
      type: 'positive'
    },
    {
      date: '05 Apr 2023',
      category: 'Punctuality',
      description: 'Late to English class',
      teacher: 'Mrs. Davis',
      points: -1,
      type: 'negative'
    },
    {
      date: '28 Mar 2023',
      category: 'Community Spirit',
      description: 'Volunteered to help at school event',
      teacher: 'Mr. Wilson',
      points: 4,
      type: 'positive'
    },
    {
      date: '15 Mar 2023',
      category: 'Classroom Behavior',
      description: 'Talking during independent work time',
      teacher: 'Ms. Thompson',
      points: -2,
      type: 'negative'
    }
  ];

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Behavior Records</h2>
          <p className="text-gray-400">Detailed list of behavior incidents</p>
        </div>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
          <Download className="w-5 h-5" />
          Export Records
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-sm font-medium text-gray-400">
            <th className="pb-4">Date</th>
            <th className="pb-4">Category</th>
            <th className="pb-4">Description</th>
            <th className="pb-4">Teacher</th>
            <th className="pb-4 text-right">Points</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {records.map((record, index) => (
            <tr key={index} className="text-sm">
              <td className="py-4 text-white">{record.date}</td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  {record.type === 'positive' ? (
                    <ThumbsUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ThumbsDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-white">{record.category}</span>
                </div>
              </td>
              <td className="py-4 text-gray-400">{record.description}</td>
              <td className="py-4 text-gray-400">{record.teacher}</td>
              <td className="py-4 text-right">
                <span className={`font-medium ${
                  record.type === 'positive' 
                    ? 'text-emerald-500' 
                    : 'text-red-500'
                }`}>
                  {record.type === 'positive' ? '+' : ''}{record.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BehaviorRecords;