import React from 'react';
import { LayoutDashboard, Users, BookOpen, Calendar, Award, BarChart2, FileText, Settings, LogOut } from 'lucide-react';
import { HeadTeacher } from '../../types';

interface HeadTeacherSidebarProps {
  headTeacher: HeadTeacher;
  activePage: string;
  onPageChange: (page: string) => void;
}

const HeadTeacherSidebar: React.FC<HeadTeacherSidebarProps> = ({
  headTeacher,
  activePage,
  onPageChange
}) => {
  return (
    <div className="fixed left-0 top-0 w-[var(--sidebar-width)] h-screen bg-gray-900 p-4 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">
            {headTeacher.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-white font-medium">{headTeacher.name}</h1>
            <p className="text-sm text-gray-400">{headTeacher.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <NavItem
          icon={<LayoutDashboard />}
          label="Dashboard"
          active={activePage === 'dashboard'}
          onClick={() => onPageChange('dashboard')}
        />
        <NavItem
          icon={<Users />}
          label="Teachers"
          active={activePage === 'teachers'}
          onClick={() => onPageChange('teachers')}
        />
        <NavItem
          icon={<BookOpen />}
          label="Curriculum"
          active={activePage === 'curriculum'}
          onClick={() => onPageChange('curriculum')}
        />
        <NavItem
          icon={<Calendar />}
          label="Attendance"
          active={activePage === 'attendance'}
          onClick={() => onPageChange('attendance')}
        />
        <NavItem
          icon={<Award />}
          label="Behavior"
          active={activePage === 'behavior'}
          onClick={() => onPageChange('behavior')}
        />
        <NavItem
          icon={<BarChart2 />}
          label="Analytics"
          active={activePage === 'analytics'}
          onClick={() => onPageChange('analytics')}
        />
        <NavItem
          icon={<FileText />}
          label="Reports"
          active={activePage === 'reports'}
          onClick={() => onPageChange('reports')}
        />
        <NavItem
          icon={<Settings />}
          label="Settings"
          active={activePage === 'settings'}
          onClick={() => onPageChange('settings')}
        />
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  active = false,
  onClick
}: { 
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-gray-800/50 text-white' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default HeadTeacherSidebar;