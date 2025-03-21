import React from 'react';
import { Student } from '../../types';
import { SortAsc, SortDesc, MoreVertical } from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSort: (field: keyof Student) => void;
  sortField: keyof Student;
  sortDirection: 'asc' | 'desc';
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSort,
  sortField,
  sortDirection,
}) => {
  const SortIcon = sortDirection === 'asc' ? SortAsc : SortDesc;

  const renderSortableHeader = (label: string, field: keyof Student) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        {sortField === field && (
          <SortIcon className="w-4 h-4" />
        )}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            {renderSortableHeader('Name', 'name')}
            {renderSortableHeader('Form Group', 'grade')}
            {renderSortableHeader('Attendance', 'attendance')}
            {renderSortableHeader('Performance', 'performance')}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Behavior Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Well-being Status
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {students.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-gray-700/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{student.name}</div>
                    <div className="text-sm text-gray-400">#{student.id.slice(0, 8)}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">Form {student.grade}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="flex-1 w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>
                  <span className="text-sm text-white">{student.attendance}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="flex-1 w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${student.performance}%` }}
                    />
                  </div>
                  <span className="text-sm text-white">{student.performance}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="flex-1 w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: '85%' }}
                    />
                  </div>
                  <span className="text-sm text-white">85%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-400/20 text-emerald-400">
                  Good
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;