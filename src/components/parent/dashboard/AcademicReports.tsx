import React, { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, Download, Filter } from 'lucide-react';
import { useStore } from '../../../store/useStore';

interface SubjectPerformance {
  subject: string;
  currentGrade: string;
  targetGrade: string;
  progress: number;
  trend: 'up' | 'down' | 'stable';
  lastAssessment: string;
}

interface AssessmentRecord {
  id: string;
  subject: string;
  title: string;
  date: string;
  grade: string;
  maxGrade: string;
  feedback: string;
  status: 'completed' | 'pending' | 'overdue';
}

const AcademicReports = () => {
  const selectedChild = useStore((state) => state.getSelectedChild());
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with real data from your backend
  const subjectPerformance: SubjectPerformance[] = [
    {
      subject: 'Mathematics',
      currentGrade: 'A',
      targetGrade: 'A+',
      progress: 85,
      trend: 'up',
      lastAssessment: '2024-03-20'
    },
    {
      subject: 'Science',
      currentGrade: 'B+',
      targetGrade: 'A',
      progress: 75,
      trend: 'stable',
      lastAssessment: '2024-03-18'
    },
    {
      subject: 'English',
      currentGrade: 'A-',
      targetGrade: 'A',
      progress: 90,
      trend: 'up',
      lastAssessment: '2024-03-15'
    },
    {
      subject: 'History',
      currentGrade: 'B',
      targetGrade: 'B+',
      progress: 70,
      trend: 'down',
      lastAssessment: '2024-03-10'
    }
  ];

  const recentAssessments: AssessmentRecord[] = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Algebra Test',
      date: '2024-03-20',
      grade: '85',
      maxGrade: '100',
      feedback: 'Strong understanding of algebraic concepts. Consider practicing more word problems.',
      status: 'completed'
    },
    {
      id: '2',
      subject: 'Science',
      title: 'Ecosystems Project',
      date: '2024-03-18',
      grade: '92',
      maxGrade: '100',
      feedback: 'Excellent research and presentation. Great use of visual aids.',
      status: 'completed'
    },
    {
      id: '3',
      subject: 'English',
      title: 'Essay Assignment',
      date: '2024-03-25',
      grade: '0',
      maxGrade: '100',
      feedback: '',
      status: 'pending'
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600';
    if (progress >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: AssessmentRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'overdue':
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Reports</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track {selectedChild?.name}'s academic progress and performance
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
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Term Selection */}
      <div className="flex space-x-4">
        {['previous', 'current', 'next'].map((term) => (
          <button
            key={term}
            onClick={() => setSelectedTerm(term)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedTerm === term
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {term.charAt(0).toUpperCase() + term.slice(1)} Term
          </button>
        ))}
      </div>

      {/* Subject Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjectPerformance.map((subject) => (
          <div key={subject.subject} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {subject.subject}
              </h3>
              <div className={`flex items-center ${getProgressColor(subject.progress)}`}>
                {subject.trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                {subject.trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
                <span className="text-sm font-medium">{subject.progress}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Current Grade</span>
                <span className="font-medium text-gray-900 dark:text-white">{subject.currentGrade}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Target Grade</span>
                <span className="font-medium text-gray-900 dark:text-white">{subject.targetGrade}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Last Assessment</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(subject.lastAssessment).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Assessments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Assessments</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentAssessments.map((assessment) => (
            <div key={assessment.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {assessment.subject} - {assessment.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(assessment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {assessment.grade}/{assessment.maxGrade}
                    </p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                      {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              {assessment.feedback && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {assessment.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicReports; 