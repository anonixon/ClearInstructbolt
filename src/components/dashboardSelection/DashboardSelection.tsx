import React from 'react';
import { Users, GraduationCap, Building2, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/constants';

const DashboardSelection = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Clear Instruct
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select your role to get started with your educational journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Admin */}
          <DashboardCard
            icon={<Building2 className="w-8 h-8" />}
            title="School Administrator"
            description="Register your school and manage teachers, students, and parents. Access comprehensive school-wide reports and settings."
            href={ROUTES.SCHOOL_ADMIN_REGISTER}
            color="purple"
          />

          {/* Teacher */}
          <DashboardCard
            icon={<GraduationCap className="w-8 h-8" />}
            title="Teacher"
            description="Access your classroom dashboard to manage attendance, track student progress, and communicate with parents."
            href={ROUTES.TEACHER_REGISTER}
            color="blue"
          />

          {/* Parent */}
          <DashboardCard
            icon={<Users className="w-8 h-8" />}
            title="Parent"
            description="Monitor your child's academic progress, attendance, and communicate with teachers through our secure platform."
            href={ROUTES.PARENT_REGISTER}
            color="emerald"
          />

          {/* Student */}
          <DashboardCard
            icon={<UserCircle className="w-8 h-8" />}
            title="Student"
            description="Access your assignments, track your progress, and stay connected with teachers and classmates."
            href={ROUTES.STUDENT_REGISTER}
            color="amber"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
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
  color: 'blue' | 'emerald' | 'purple' | 'amber';
}

const DashboardCard = ({ icon, title, description, href, color }: DashboardCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    emerald: 'bg-emerald-500 hover:bg-emerald-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    amber: 'bg-amber-500 hover:bg-amber-600'
  };

  const bgColorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    amber: 'bg-amber-50 dark:bg-amber-900/20'
  };

  const iconColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    emerald: 'text-emerald-600 dark:text-emerald-400',
    purple: 'text-purple-600 dark:text-purple-400',
    amber: 'text-amber-600 dark:text-amber-400'
  };

  return (
    <div className="relative group">
      <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-200 ${colorClasses[color]}`}></div>
      <Link
        to={href}
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
          <span className="font-medium">Get Started</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default DashboardSelection;