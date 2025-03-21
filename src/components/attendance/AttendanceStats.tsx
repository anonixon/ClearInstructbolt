import React from 'react';
import { UserCheck, UserX, Clock, Shield } from 'lucide-react';
import { AttendanceStats as AttendanceStatsType } from '../../types';

interface AttendanceStatsProps {
  stats: AttendanceStatsType;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Present"
        value={stats.present}
        total={stats.total}
        icon={<UserCheck className="w-5 h-5" />}
        color="emerald"
      />
      <StatCard
        label="Absent"
        value={stats.absent}
        total={stats.total}
        icon={<UserX className="w-5 h-5" />}
        color="red"
      />
      <StatCard
        label="Late"
        value={stats.late}
        total={stats.total}
        icon={<Clock className="w-5 h-5" />}
        color="amber"
      />
      <StatCard
        label="Authorized"
        value={stats.authorized}
        total={stats.total}
        icon={<Shield className="w-5 h-5" />}
        color="blue"
      />
    </div>
  );
};

const StatCard = ({ 
  label, 
  value, 
  total,
  icon,
  color 
}: { 
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  color: string;
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className={`bg-${color}-500/10 rounded-lg p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-500`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <div className={`text-4xl font-bold text-${color}-500 mb-1`}>
        {value}
      </div>
      <div className="text-sm text-gray-400">
        {percentage.toFixed(1)}% of total
      </div>
    </div>
  );
};

export default AttendanceStats;