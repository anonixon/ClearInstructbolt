import React from 'react';
import { Book, Clock, Download, ExternalLink } from 'lucide-react';

interface UpcomingAssignmentsProps {
  searchQuery: string;
  selectedSubject: string;
}

const UpcomingAssignments: React.FC<UpcomingAssignmentsProps> = ({
  searchQuery,
  selectedSubject
}) => {
  const assignments = [
    {
      subject: 'Mathematics',
      title: 'Quadratic Equations Worksheet',
      teacher: 'Mr. Johnson',
      dueDate: 'Tomorrow',
      estimatedTime: '45 minutes',
      status: 'Not Started',
      resources: [
        { name: 'Worksheet PDF', type: 'pdf' },
        { name: 'Formula Sheet', type: 'doc' }
      ]
    }
    // Add more assignments as needed
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
          <h2 className="text-xl font-semibold text-white">Upcoming Assignments</h2>
          <p className="text-gray-400">Homework and assignments due soon</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-gray-800/50 text-white px-4 py-2 rounded-lg">
            <option>All Statuses</option>
            <option>Not Started</option>
            <option>In Progress</option>
          </select>
          <select className="bg-gray-800/50 text-white px-4 py-2 rounded-lg">
            <option>Due Date</option>
            <option>Subject</option>
            <option>Status</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAssignments.map((assignment, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <Book className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{assignment.title}</h3>
                  <p className="text-sm text-gray-400">
                    {assignment.subject} • Teacher: {assignment.teacher}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                assignment.status === 'Not Started'
                  ? 'bg-amber-500/20 text-amber-500'
                  : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                {assignment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Due: {assignment.dueDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Est. time: {assignment.estimatedTime}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-white">Resources:</h4>
              {assignment.resources.map((resource, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Book className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-300">{resource.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 mt-6">
              <button className="text-gray-400 hover:text-white">
                View Details
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Mark as Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAssignments;