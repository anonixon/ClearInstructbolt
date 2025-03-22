import React from 'react';
import { BarChart2, Calendar, Heart, LogOut, Settings, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 w-[var(--sidebar-width)] h-screen bg-gray-900 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">TeacherHub</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        <NavItem icon={<BarChart2 />} label="Dashboard" active />
        <NavItem icon={<Heart />} label="Pastoral Care" />
        <NavItem icon={<Users />} label="Students" />
        <NavItem icon={<Calendar />} label="Attendance" badge="Mar 12" />
        <NavItem icon={<BarChart2 />} label="Behavior Tracking" />
        <NavItem icon={<BarChart2 />} label="Reports" />
        <NavItem icon={<Settings />} label="Settings" />
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <button className="sidebar-link w-full">
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
  badge 
}: { 
  icon: React.ReactNode; 
  label: string;
  active?: boolean;
  badge?: string;
}) => (
  <div className={`sidebar-link ${active ? 'active' : ''}`}>
    {icon}
    <span>{label}</span>
    {badge && (
      <span className="ml-auto text-xs bg-gray-800 px-2 py-1 rounded">
        {badge}
      </span>
    )}
  </div>
);

export default Sidebar;