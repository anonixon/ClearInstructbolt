import React, { useState } from 'react';
import { BarChart2, Filter, Download } from 'lucide-react';

interface SubjectProgress {
  subject: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}

interface StudentProgress {
  id: string;
  name: string;
  subjects: {
    [key: string]: {
      current: number;
      target: number;
      trend: 'up' | 'down' | 'stable';
    };
  };
  averageProgress: number;
  status: 'Above Target' | 'On Target' | 'Below Target';
}

const sampleSubjects: SubjectProgress[] = [
  { subject: 'Mathematics', current: 85, target: 80, trend: 'up' },
  { subject: 'English', current: 78, target: 80, trend: 'stable' },
  { subject: 'Science', current: 92, target: 80, trend: 'up' },
  { subject: 'History', current: 75, target: 80, trend: 'down' },
  { subject: 'Geography', current: 88, target: 80, trend: 'up' }
];

const sampleStudents: StudentProgress[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    subjects: {
      Mathematics: { current: 92, target: 80, trend: 'up' },
      English: { current: 85, target: 80, trend: 'up' },
      Science: { current: 88, target: 80, trend: 'up' },
      History: { current: 82, target: 80, trend: 'up' },
      Geography: { current: 90, target: 80, trend: 'up' }
    },
    averageProgress: 87.4,
    status: 'Above Target'
  },
  {
    id: '2',
    name: 'James Wilson',
    subjects: {
      Mathematics: { current: 75, target: 80, trend: 'down' },
      English: { current: 82, target: 80, trend: 'up' },
      Science: { current: 78, target: 80, trend: 'stable' },
      History: { current: 85, target: 80, trend: 'up' },
      Geography: { current: 80, target: 80, trend: 'stable' }
    },
    averageProgress: 80,
    status: 'On Target'
  }
];

const StudentProgress = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Progress</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and analyze student performance across subjects
          </p>
        </div>
        <div className="flex space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Subject Performance Chart */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Subject Performance Overview
        </h3>
        <div className="h-64">
          {/* TODO: Implement chart visualization */}
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Chart visualization will be implemented here
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Detailed Progress</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Student
                  </th>
                  {sampleSubjects.map((subject) => (
                    <th
                      key={subject.subject}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {subject.subject}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Average
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sampleStudents.map((student) => (
                  <tr
                    key={student.id}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedStudent === student.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => setSelectedStudent(student.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </td>
                    {sampleSubjects.map((subject) => (
                      <td key={subject.subject} className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {student.subjects[subject.subject].current}%
                          </span>
                          <span
                            className={`ml-2 text-xs ${
                              student.subjects[subject.subject].trend === 'up'
                                ? 'text-green-500'
                                : student.subjects[subject.subject].trend === 'down'
                                ? 'text-red-500'
                                : 'text-yellow-500'
                            }`}
                          >
                            {student.subjects[subject.subject].trend === 'up'
                              ? '↑'
                              : student.subjects[subject.subject].trend === 'down'
                              ? '↓'
                              : '→'}
                          </span>
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {student.averageProgress.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === 'Above Target'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : student.status === 'On Target'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress; 