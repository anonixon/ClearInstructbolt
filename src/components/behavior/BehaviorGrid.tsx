import React from 'react';
import { Award, AlertTriangle, BarChart2, MoreVertical, Shield } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { BehaviorRecord } from '../../types';

interface BehaviorGridProps {
  searchQuery: string;
  formGroup: string;
  onStudentSelect: (studentId: string) => void;
}

const BehaviorGrid: React.FC<BehaviorGridProps> = ({
  searchQuery,
  formGroup,
  onStudentSelect
}) => {
  const students = useStore((state) => state.students);
  const behaviorRecords = useStore((state) => state.behaviorRecords);
  const behaviorInterventions = useStore((state) => state.behaviorInterventions);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormGroup = formGroup === 'all' || student.grade === formGroup;
    return matchesSearch && matchesFormGroup;
  });

  const getStudentStats = (studentId: string) => {
    const records = behaviorRecords.filter(r => r.studentId === studentId);
    const positive = records.filter(r => r.type === 'positive').length;
    const negative = records.filter(r => r.type === 'negative').length;
    const points = records.reduce((sum, r) => sum + r.points, 0);
    const activeInterventions = behaviorInterventions.filter(
      i => i.studentId === studentId && i.status === 'In Progress'
    ).length;

    return { positive, negative, points, activeInterventions };
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
              Behavior Points
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Recent Incidents
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Active Interventions
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredStudents.map((student) => {
            const stats = getStudentStats(student.id);
            return (
              <tr 
                key={student.id} 
                className="hover:bg-gray-700/50 cursor-pointer"
                onClick={() => onStudentSelect(student.id)}
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
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">+{stats.positive}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-red-500">-{stats.negative}</span>
                    </div>
                    <div className={`font-bold ${
                      stats.points > 0 ? 'text-emerald-500' : 
                      stats.points < 0 ? 'text-red-500' : 
                      'text-gray-400'
                    }`}>
                      {stats.points > 0 ? '+' : ''}{stats.points}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-500" />
                    <span className="text-white">
                      {behaviorRecords.filter(r => 
                        r.studentId === student.id && 
                        new Date().getTime() - r.date.getTime() < 7 * 24 * 60 * 60 * 1000
                      ).length} this week
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {stats.activeInterventions > 0 ? (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span className="text-purple-500">
                        {stats.activeInterventions} active
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
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

export default BehaviorGrid;