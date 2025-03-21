import React from 'react';
import { Check, X, Clock, Shield, MoreVertical } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AttendanceRecord } from '../../types';

interface AttendanceGridProps {
  date: Date;
  searchQuery: string;
  formGroup: string;
}

const AttendanceGrid: React.FC<AttendanceGridProps> = ({
  date,
  searchQuery,
  formGroup
}) => {
  const students = useStore((state) => state.students);
  const attendanceRecords = useStore((state) => state.attendanceRecords);
  const updateAttendanceRecord = useStore((state) => state.updateAttendanceRecord);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormGroup = formGroup === 'all' || student.grade === formGroup;
    return matchesSearch && matchesFormGroup;
  });

  const getStudentAttendance = (studentId: string) => {
    return attendanceRecords.find(record => 
      record.studentId === studentId && 
      record.date.toDateString() === date.toDateString()
    );
  };

  const handleStatusChange = (studentId: string, status: AttendanceRecord['status']) => {
    const record = getStudentAttendance(studentId);
    if (record) {
      updateAttendanceRecord(record.id, { status });
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Form Group
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Notes
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredStudents.map((student) => {
            const record = getStudentAttendance(student.id);
            return (
              <tr key={student.id} className="hover:bg-gray-700/50">
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
                    <button
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={`p-2 rounded-lg transition-colors ${
                        record?.status === 'present'
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'absent')}
                      className={`p-2 rounded-lg transition-colors ${
                        record?.status === 'absent'
                          ? 'bg-red-500/20 text-red-500'
                          : 'text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'late')}
                      className={`p-2 rounded-lg transition-colors ${
                        record?.status === 'late'
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'text-gray-400 hover:text-amber-500 hover:bg-amber-500/10'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'authorized')}
                      className={`p-2 rounded-lg transition-colors ${
                        record?.status === 'authorized'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'text-gray-400 hover:text-blue-500 hover:bg-blue-500/10'
                      }`}
                    >
                      <Shield className="w-5 h-5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {record?.timeIn || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {record?.notes || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceGrid;