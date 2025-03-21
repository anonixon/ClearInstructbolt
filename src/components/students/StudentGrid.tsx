import React from 'react';
import { Student } from '../../types';
import { BarChart2, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface StudentGridProps {
  students: Student[];
  onSort: (field: keyof Student) => void;
  sortField: keyof Student;
  sortDirection: 'asc' | 'desc';
}

const StudentGrid: React.FC<StudentGridProps> = ({ students }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {students.map((student) => (
        <div key={student.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{student.name}</h3>
              <p className="text-sm text-gray-400">Form {student.grade}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <div className="text-gray-400">Attendance</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>
                  <span className="text-white">{student.attendance}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <div className="flex-1">
                <div className="text-gray-400">Performance</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${student.performance}%` }}
                    />
                  </div>
                  <span className="text-white">{student.performance}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              <div className="flex-1">
                <div className="text-gray-400">Behavior Score</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-400 rounded-full"
                      style={{ width: '85%' }}
                    />
                  </div>
                  <span className="text-white">85%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <div className="flex-1">
                <div className="text-gray-400">Well-being Status</div>
                <div className="text-white">Good - No concerns</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
              View Full Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentGrid;