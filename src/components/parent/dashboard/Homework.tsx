import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle, Clock, FileText, Filter, Search, Upload, X } from 'lucide-react';
import { useStore } from '../../../store/useStore';

interface HomeworkAssignment {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  teacher: string;
  submissionDate?: string;
}

interface HomeworkFilters {
  subject: string[];
  status: ('pending' | 'submitted' | 'graded' | 'late')[];
  dateRange: {
    start: string;
    end: string;
  };
  searchQuery: string;
}

const Homework = () => {
  const selectedChild = useStore((state) => state.getSelectedChild());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<HomeworkFilters>({
    subject: [],
    status: [],
    dateRange: {
      start: '',
      end: ''
    },
    searchQuery: ''
  });

  // Sample data - replace with real data from your backend
  const assignments: HomeworkAssignment[] = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Algebra Practice',
      description: 'Complete exercises 1-10 from Chapter 3',
      dueDate: '2024-03-25',
      status: 'pending',
      teacher: 'Mrs. Smith',
      attachments: [
        { name: 'Worksheet.pdf', url: '#', type: 'pdf' }
      ]
    },
    {
      id: '2',
      subject: 'Science',
      title: 'Lab Report',
      description: 'Write a report on the chemical reactions experiment',
      dueDate: '2024-03-23',
      status: 'submitted',
      teacher: 'Mr. Johnson',
      submissionDate: '2024-03-22',
      attachments: [
        { name: 'Lab_Report.docx', url: '#', type: 'doc' }
      ]
    },
    {
      id: '3',
      subject: 'English',
      title: 'Book Review',
      description: 'Write a review of the assigned novel',
      dueDate: '2024-03-20',
      status: 'graded',
      grade: 95,
      feedback: 'Excellent analysis and well-structured review',
      teacher: 'Mrs. Wilson',
      submissionDate: '2024-03-19'
    },
    {
      id: '4',
      subject: 'History',
      title: 'Research Paper',
      description: 'Research and write about a historical event',
      dueDate: '2024-03-18',
      status: 'late',
      teacher: 'Mr. Brown',
      submissionDate: '2024-03-19'
    }
  ];

  // Get unique subjects for filter options
  const subjects = useMemo(() => 
    Array.from(new Set(assignments.map(assignment => assignment.subject))),
    [assignments]
  );

  // Filter assignments based on current filters
  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      // Subject filter
      if (filters.subject.length > 0 && !filters.subject.includes(assignment.subject)) return false;

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(assignment.status)) return false;

      // Date range filter
      if (filters.dateRange.start && new Date(assignment.dueDate) < new Date(filters.dateRange.start)) return false;
      if (filters.dateRange.end && new Date(assignment.dueDate) > new Date(filters.dateRange.end)) return false;

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableFields = [
          assignment.title,
          assignment.description,
          assignment.subject,
          assignment.teacher
        ];
        return searchableFields.some(field => 
          field.toLowerCase().includes(query) ||
          field.toLowerCase().split(' ').some(word => word.startsWith(query))
        );
      }

      return true;
    });
  }, [assignments, filters]);

  const handleFilterChange = (key: keyof HomeworkFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      subject: [],
      status: [],
      dateRange: {
        start: '',
        end: ''
      },
      searchQuery: ''
    });
  };

  const getStatusColor = (status: HomeworkAssignment['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'submitted':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'graded':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'late':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Homework</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track {selectedChild?.name}'s homework assignments and progress
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 max-w-xl w-full bg-white dark:bg-gray-800 shadow-xl">
            <div className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Homework</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subjects
                  </label>
                  <div className="space-y-2">
                    {subjects.map(subject => (
                      <label key={subject} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.subject.includes(subject)}
                          onChange={(e) => {
                            const newSubjects = e.target.checked
                              ? [...filters.subject, subject]
                              : filters.subject.filter(s => s !== subject);
                            handleFilterChange('subject', newSubjects);
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('pending')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'pending']
                            : filters.status.filter(s => s !== 'pending');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pending</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('submitted')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'submitted']
                            : filters.status.filter(s => s !== 'submitted');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Submitted</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('graded')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'graded']
                            : filters.status.filter(s => s !== 'graded');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Graded</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes('late')}
                        onChange={(e) => {
                          const newStatuses = e.target.checked
                            ? [...filters.status, 'late']
                            : filters.status.filter(s => s !== 'late');
                          handleFilterChange('status', newStatuses);
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Late</span>
                    </label>
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    placeholder="Search in title, description, or subject..."
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Homework List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assignments</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {assignment.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {assignment.subject} • {assignment.teacher}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                  {assignment.grade && (
                    <span className="text-sm font-medium text-green-600">
                      Grade: {assignment.grade}%
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {assignment.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  {assignment.submissionDate && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Upload className="w-4 h-4 mr-1" />
                      Submitted: {new Date(assignment.submissionDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {assignment.attachments && assignment.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      {attachment.name}
                    </a>
                  ))}
                  {assignment.status === 'pending' && (
                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700">
                      Submit
                    </button>
                  )}
                </div>
              </div>
              {assignment.feedback && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Feedback:</span> {assignment.feedback}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homework; 