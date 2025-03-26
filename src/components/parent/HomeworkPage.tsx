import React, { useState } from 'react';
import { Book, Clock, CheckCircle, Calendar, BarChart2, Download, Search } from 'lucide-react';
import HomeworkOverview from './homework/HomeworkOverview';
import UpcomingAssignments from './homework/UpcomingAssignments';
import CompletedAssignments from './homework/CompletedAssignments';
import AssignmentCalendar from './homework/AssignmentCalendar';
import HomeworkAnalytics from './homework/HomeworkAnalytics';

const HomeworkPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const stats = {
    total: 7,
    upcoming: 4,
    completed: 3,
    completionRate: 43,
    dueSoon: {
      count: 1,
      assignment: {
        subject: 'Mathematics',
        title: 'Quadratic Equations Worksheet',
        status: 'Not Started'
      }
    },
    inProgress: 1,
    averageGrade: 'B+',
    recentGrades: ['A', 'B', 'A', 'B', 'A']
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Homework & Assignments</h1>
          <p className="text-gray-400">
            Track, manage, and monitor your child's homework
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-gray-800/50 text-white px-4 py-2 rounded-lg"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
          </select>
        </div>
      </div>

      <HomeworkOverview stats={stats} />

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Upcoming"
          active={activeTab === 'upcoming'}
          onClick={() => setActiveTab('upcoming')}
        />
        <TabButton
          label="Completed"
          active={activeTab === 'completed'}
          onClick={() => setActiveTab('completed')}
        />
        <TabButton
          label="Calendar View"
          active={activeTab === 'calendar'}
          onClick={() => setActiveTab('calendar')}
        />
        <TabButton
          label="Analytics"
          active={activeTab === 'analytics'}
          onClick={() => setActiveTab('analytics')}
        />
      </div>

      {activeTab === 'upcoming' && (
        <UpcomingAssignments searchQuery={searchQuery} selectedSubject={selectedSubject} />
      )}
      {activeTab === 'completed' && (
        <CompletedAssignments searchQuery={searchQuery} selectedSubject={selectedSubject} />
      )}
      {activeTab === 'calendar' && (
        <AssignmentCalendar />
      )}
      {activeTab === 'analytics' && (
        <HomeworkAnalytics />
      )}
    </div>
  );
};

const TabButton = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active 
        ? 'text-white border-blue-500' 
        : 'text-gray-400 border-transparent hover:text-white hover:border-gray-700'
    }`}
  >
    {label}
  </button>
);

export default HomeworkPage;