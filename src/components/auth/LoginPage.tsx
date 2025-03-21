import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GraduationCap, Users, UserCog } from 'lucide-react';

interface DashboardConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const dashboardConfigs: Record<string, DashboardConfig> = {
  teacher: {
    title: 'Teacher Dashboard',
    description: 'Access your teaching tools and student management system',
    icon: <GraduationCap className="w-12 h-12" />,
    color: 'blue'
  },
  parent: {
    title: 'Parent Portal',
    description: 'Monitor your child\'s academic progress and school activities',
    icon: <Users className="w-12 h-12" />,
    color: 'emerald'
  },
  headteacher: {
    title: 'Head Teacher Dashboard',
    description: 'Manage your school\'s performance and administrative tasks',
    icon: <UserCog className="w-12 h-12" />,
    color: 'purple'
  }
};

const LoginPage = () => {
  const { dashboard } = useParams<{ dashboard: keyof typeof dashboardConfigs }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const config = dashboardConfigs[dashboard || 'teacher'];
  const colorClass = `text-${config.color}-600`;
  const buttonClass = `bg-${config.color}-600 hover:bg-${config.color}-700`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-${config.color}-100 dark:bg-${config.color}-900/20`}>
          <div className={`text-${config.color}-600 dark:text-${config.color}-400`}>
            {config.icon}
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {config.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {config.description}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className={`font-medium ${colorClass} hover:opacity-80`}>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md border border-transparent ${buttonClass} py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
              </span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className={`ml-1 font-medium ${colorClass} hover:opacity-80`}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;