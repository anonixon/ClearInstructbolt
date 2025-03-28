import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import ParentSidebar from './ParentSidebar';
import ChildOverview from './dashboard/ChildOverview';
import AcademicReports from './dashboard/AcademicReports';
import Attendance from './dashboard/Attendance';
import Behavior from './dashboard/Behavior';
import Communication from './dashboard/Communication';
import Homework from './dashboard/Homework';
import NotificationPanel from './dashboard/NotificationPanel';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ChildOverview />;
      case 'academic':
        return <AcademicReports />;
      case 'attendance':
        return <Attendance />;
      case 'behavior':
        return <Behavior />;
      case 'communication':
        return <Communication />;
      case 'homework':
        return <Homework />;
      default:
        return <ChildOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <ParentSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="ml-[var(--sidebar-width)] p-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {renderContent()}
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
};

export default ParentDashboard; 