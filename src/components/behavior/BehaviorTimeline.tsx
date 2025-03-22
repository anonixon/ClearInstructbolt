import React from 'react';
import { Award, AlertTriangle, Clock, MapPin, Users, MessageSquare } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { BehaviorRecord } from '../../types';

interface BehaviorTimelineProps {
  searchQuery: string;
  formGroup: string;
  selectedStudent: string | null;
}

const BehaviorTimeline: React.FC<BehaviorTimelineProps> = ({
  searchQuery,
  formGroup,
  selectedStudent
}) => {
  const students = useStore((state) => state.students);
  const behaviorRecords = useStore((state) => state.behaviorRecords);

  const filteredRecords = behaviorRecords
    .filter(record => {
      const student = students.find(s => s.id === record.studentId);
      if (!student) return false;

      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFormGroup = formGroup === 'all' || student.grade === formGroup;
      const matchesStudent = !selectedStudent || record.studentId === selectedStudent;

      return matchesSearch && matchesFormGroup && matchesStudent;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const groupRecordsByDate = (records: BehaviorRecord[]) => {
    const groups: { [key: string]: BehaviorRecord[] } = {};
    records.forEach(record => {
      const dateKey = record.date.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(record);
    });
    return groups;
  };

  const recordGroups = groupRecordsByDate(filteredRecords);

  return (
    <div className="space-y-8">
      {Object.entries(recordGroups).map(([date, records]) => (
        <div key={date} className="space-y-4">
          <div className="sticky top-0 bg-black/50 backdrop-blur-sm z-10 py-2">
            <h3 className="text-lg font-semibold text-white">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
          </div>

          <div className="space-y-4">
            {records.map((record) => {
              const student = students.find(s => s.id === record.studentId);
              if (!student) return null;

              return (
                <div
                  key={record.id}
                  className={`bg-gray-800/50 rounded-lg p-6 border-l-4 ${
                    record.type === 'positive' 
                      ? 'border-emerald-500' 
                      : 'border-red-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-white">{student.name}</div>
                        <div className="text-sm text-gray-400">Form {student.grade}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      record.type === 'positive'
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {record.points > 0 ? '+' : ''}{record.points} points
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{record.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {record.date.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </span>
                    </div>
                    {record.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{record.location}</span>
                      </div>
                    )}
                    {record.involvedParties && record.involvedParties.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{record.involvedParties.length} others involved</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Logged by {record.createdBy}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BehaviorTimeline;