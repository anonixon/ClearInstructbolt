import { useState } from 'react';
import { BookOpen, Calendar, Award, MessageSquare, BookMarked, Compass, Settings, LogOut, Home } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ROUTES } from '../../lib/constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { Parent } from '../../types';

interface ParentSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ParentSidebar: React.FC<ParentSidebarProps> = ({ activeTab, onTabChange }) => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);
  const currentParent = useStore((state) => state.currentParent) as Parent | null;
  const location = useLocation();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: ROUTES.DASHBOARD.PARENT_DASHBOARD },
    { id: 'academic', label: 'Academic Reports', icon: BookOpen, path: '/parent/academic' },
    { id: 'attendance', label: 'Attendance', icon: Calendar, path: '/parent/attendance' },
    { id: 'behavior', label: 'Behavior', icon: Award, path: '/parent/behavior' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, path: '/parent/communication' },
    { id: 'homework', label: 'Homework', icon: BookMarked, path: '/parent/homework' },
    { id: 'activities', label: 'Activities', icon: Compass, path: '/parent/activities' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/parent/settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-md fixed left-0 top-0">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Parent Portal</h2>
        {currentParent && (
          <p className="text-sm text-gray-600">
            {currentParent.first_name} {currentParent.last_name}
          </p>
        )}
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          className="flex items-center space-x-3 text-red-600 hover:text-red-700"
          onClick={() => {
            window.location.href = ROUTES.AUTH.LOGOUT;
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ParentSidebar;