import React from 'react';
import { Calendar, Search, Check } from 'lucide-react';

const DailyRegistration = () => {
  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-semibold text-white">Daily Registration</h2>
      <p className="text-gray-400">
        Take attendance for your form group with quick marking options and real-time statistics.
      </p>

      <div className="flex items-center gap-4 mt-6">
        <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg">
          <Calendar className="w-5 h-5" />
          <span>Wednesday, March 12, 2025</span>
        </div>

        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Check className="w-5 h-5" />
          Mark All Present
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatCard label="Present" value="0" color="emerald" />
        <StatCard label="Absent" value="0" color="red" />
        <StatCard label="Late" value="0" color="orange" />
        <StatCard label="Attendance" value="0%" color="blue" />
      </div>
    </div>
  );
};

const StatCard = ({ 
  label, 
  value, 
  color 
}: { 
  label: string; 
  value: string; 
  color: string;
}) => (
  <div className="stat-card">
    <div className={`stat-value text-${color}-500`}>{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default DailyRegistration;