import React, { useState } from 'react';
import { User, BookOpen, Calendar, Award, MessageSquare, BookMarked, Compass, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';

const ParentSidebar = () => {
  const [isChildrenOpen, setIsChildrenOpen] = useState(false);
  const currentParent = useStore((state) => state.currentParent);
  const selectedChild = useStore((state) => state.getSelectedChild());
  const setSelectedChild = useStore((state) => state.setSelectedChild);

  const handleChildSelect = (childId: string) => {
    setSelectedChild(childId);
    setIsChildrenOpen(false);
  };

  return (
    <div className="fixed left-0 top-0 w-[var(--sidebar-width)] h-screen bg-gray-900 p-4 flex flex-col">
      <div className="mb-8">
        <div className="relative">
          <button
            onClick={() => setIsChildrenOpen(!isChildrenOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">
              {selectedChild?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 text-left">
              <h1 className="text-white font-medium">{selectedChild?.name}</h1>
              <p className="text-sm text-gray-400">{selectedChild?.yearGroup}</p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isChildrenOpen ? 'rotate-180' : ''}`} />
          </button>

          {isChildrenOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg py-2 shadow-xl z-50">
              {currentParent.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => handleChildSelect(child.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">{child.name}</div>
                    <div className="text-sm text-gray-400">{child.yearGroup}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <nav className="flex-1 space-y-1">
        <NavItem icon={<User />} label="Child Overview" active />
        <NavItem icon={<BookOpen />} label="Academic Reports" />
        <NavItem icon={<Calendar />} label="Attendance" />
        <NavItem icon={<Award />} label="Behavior" />
        <NavItem icon={<MessageSquare />} label="Communication" />
        <NavItem icon={<BookMarked />} label="Homework" />
        <NavItem icon={<Compass />} label="Career Planning" />
        <NavItem icon={<Settings />} label="Settings" />
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
  active = false 
}: { 
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <button
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

export default ParentSidebar;