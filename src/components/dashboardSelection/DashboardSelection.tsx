import React from 'react';
import { Users, GraduationCap, UserCog } from 'lucide-react';

const DashboardSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Select Your Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose the dashboard that best suits your role and needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Teacher Dashboard */}
          <DashboardCard
            icon={<GraduationCap className="w-8 h-8" />}
            title="Teacher Dashboard"
            description="Access comprehensive tools for attendance tracking, behavior management, and student progress monitoring. Streamline your daily tasks and enhance classroom management."
            href="/teacher"
            color="blue"
          />

          {/* Parent Portal */}
          <DashboardCard
            icon={<Users className="w-8 h-8" />}
            title="Parent Portal"
            description="Stay connected with your child's education journey. Monitor academic progress, attendance, and behavior updates in real-time. Communicate directly with teachers."
            href="/parent"
            color="emerald"
          />

          {/* Head Teacher Dashboard */}
          <DashboardCard
            icon={<UserCog className="w-8 h-8" />}
            title="Head Teacher Dashboard"
            description="Gain a comprehensive overview of school performance metrics, staff management, and strategic planning tools. Make data-driven decisions for school improvement."
            href="/headteacher"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: 'blue' | 'emerald' | 'purple';
}

const DashboardCard = ({ icon, title, description, href, color }: DashboardCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    emerald: 'bg-emerald-500 hover:bg-emerald-600',
    purple: 'bg-purple-500 hover:bg-purple-600'
  };

  const bgColorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20'
  };

  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    purple: 'text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-200 ${colorClasses[color]}`}></div>
      <a
        href={href}
        className={`relative flex flex-col h-full p-8 rounded-2xl ${bgColorClasses[color]} border border-gray-200 dark:border-gray-700 transition duration-200 hover:scale-[1.02]`}
      >
        <div className={`p-3 rounded-xl ${bgColorClasses[color]} ${iconColorClasses[color]} w-fit`}>
          {icon}
        </div>
        
        <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        
        <p className="mt-4 text-gray-600 dark:text-gray-400 flex-grow">
          {description}
        </p>

        <div className={`mt-8 inline-flex items-center text-${color}-600 dark:text-${color}-400`}>
          <span className="font-medium">Enter Dashboard</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default DashboardSelection;