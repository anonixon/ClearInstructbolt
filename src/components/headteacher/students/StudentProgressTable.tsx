import React from 'react';
import { Filter } from 'lucide-react';
import { StudentProgress } from '../../../types';

interface StudentProgressTableProps {
  students: StudentProgress[];
}

const StudentProgressTable: React.FC<StudentProgressTableProps> = ({ students }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Student Progress Data</h2>
          <p className="text-gray-400">Individual student progress and interventions</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Student</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Year</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Progress</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Attendance</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Interventions</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 text-white">{student.name}</td>
                <td className="px-6 py-4 text-gray-400">{student.year}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-white">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">{student.attendance}%</td>
                <td className="px-6 py-4 text-white">{student.interventions}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    student.status === 'Above Target' ? 'bg-emerald-500/20 text-emerald-500' :
                    student.status === 'On Target' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-amber-500/20 text-amber-500'
                  }`}>
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProgressTable;