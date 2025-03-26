import React, { useState } from 'react';
import { Calendar, Users, BookOpen, MessageSquare, FileText, Bell, Search } from 'lucide-react';
import ClassOverview from './dashboard/ClassOverview';
import StudentProgress from './dashboard/StudentProgress';
import AttendanceManager from './dashboard/AttendanceManager';
import AssignmentManager from './dashboard/AssignmentManager';
import ParentCommunication from './dashboard/ParentCommunication';
import ResourceManager from './dashboard/ResourceManager';
import TeacherCalendar from './dashboard/TeacherCalendar';
import NotificationPanel from './dashboard/NotificationPanel';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Teacher Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <TabButton
                  icon={<Users className="w-5 h-5" />}
                  label="Overview"
                  active={activeTab === 'overview'}
                  onClick={() => setActiveTab('overview')}
                />
                <TabButton
                  icon={<BookOpen className="w-5 h-5" />}
                  label="Progress"
                  active={activeTab === 'progress'}
                  onClick={() => setActiveTab('progress')}
                />
                <TabButton
                  icon={<Calendar className="w-5 h-5" />}
                  label="Attendance"
                  active={activeTab === 'attendance'}
                  onClick={() => setActiveTab('attendance')}
                />
                <TabButton
                  icon={<FileText className="w-5 h-5" />}
                  label="Assignments"
                  active={activeTab === 'assignments'}
                  onClick={() => setActiveTab('assignments')}
                />
                <TabButton
                  icon={<MessageSquare className="w-5 h-5" />}
                  label="Communication"
                  active={activeTab === 'communication'}
                  onClick={() => setActiveTab('communication')}
                />
                <TabButton
                  icon={<BookOpen className="w-5 h-5" />}
                  label="Resources"
                  active={activeTab === 'resources'}
                  onClick={() => setActiveTab('resources')}
                />
                <TabButton
                  icon={<Calendar className="w-5 h-5" />}
                  label="Calendar"
                  active={activeTab === 'calendar'}
                  onClick={() => setActiveTab('calendar')}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'overview' && <ClassOverview />}
          {activeTab === 'progress' && <StudentProgress />}
          {activeTab === 'attendance' && <AttendanceManager />}
          {activeTab === 'assignments' && <AssignmentManager />}
          {activeTab === 'communication' && <ParentCommunication />}
          {activeTab === 'resources' && <ResourceManager />}
          {activeTab === 'calendar' && <TeacherCalendar />}
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel />
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
      active
        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
    }`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export default TeacherDashboard; 