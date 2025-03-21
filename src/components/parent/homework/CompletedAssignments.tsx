import React from 'react';
import { Download } from 'lucide-react';

interface CompletedAssignmentsProps {
  searchQuery: string;
  selectedSubject: string;
}

const CompletedAssignments: React.FC<CompletedAssignmentsProps> = ({
  searchQuery,
  selectedSubject
}) => {
  const assignments = [
    {
      subject: 'Geography',
      title: 'Climate Zones Research',
      teacher: 'Mrs. Thompson',
      dueDate: 'Last Friday',
      submitted: 'Last Thursday',
      grade: 'A',
      hasFeedback: true
    },
    {
      subject: 'Mathematics',
      title: 'Linear Equations Quiz',
      teacher: 'Mr. Johnson',
      dueDate: 'Last Monday',
      submitted: 'Last Monday',
      grade: 'B+',
      hasFeedback: true
    },
    {
      subject: 'Art',
      title: 'Perspective Drawing',
      teacher: 'Ms. Garcia',
      dueDate: 'Last Wednesday',
      submitted: 'Last Tuesday',
      grade: 'A-',
      hasFeedback: true
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = (
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesSubject = selectedSubject === 'all' || 
      assignment.subject.toLowerCase() === selectedSubject.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Completed Assignments</h2>
          <p className="text-gray-400">Previously submitted homework and grades</p>
        </div>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
          <Download className="w-5 h-5" />
          Export History
        </button>
      </div>

      <div className="bg-gray-800/50 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-400 border-b border-gray-700">
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Assignment</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Submitted</th>
              <th className="px-6 py-4">Grade</th>
              <th className="px-6 py-4">Feedback</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredAssignments.map((assignment, index) => (
              <tr key={index} className="hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <div className="text-white">{assignment.subject}</div>
                  <div className="text-sm text-gray-400">{assignment.teacher}</div>
                </td>
                <td className="px-6 py-4 text-white">{assignment.title}</td>
                <td className="px-6 py-4 text-gray-400">{assignment.dueDate}</td>
                <td className="px-6 py-4 text-gray-400">{assignment.submitted}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    assignment.grade.startsWith('A') 
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {assignment.grade}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-400">
                    View feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedAssignments;