import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { GraduationCap, Users, UserCog, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../config/constants';

interface DashboardConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  role: 'teacher' | 'parent' | 'headteacher';
}

const dashboardConfigs: Record<string, DashboardConfig> = {
  teacher: {
    title: 'Teacher Dashboard',
    description: 'Access your teaching tools and student management system',
    icon: <GraduationCap className="w-12 h-12" />,
    color: 'blue',
    role: 'teacher'
  },
  parent: {
    title: 'Parent Portal',
    description: 'Monitor your child\'s academic progress and school activities',
    icon: <Users className="w-12 h-12" />,
    color: 'emerald',
    role: 'parent'
  },
  headteacher: {
    title: 'Head Teacher Dashboard',
    description: 'Manage your school\'s performance and administrative tasks',
    icon: <UserCog className="w-12 h-12" />,
    color: 'purple',
    role: 'headteacher'
  }
};

const LoginPage = () => {
  const { dashboard } = useParams<{ dashboard: keyof typeof dashboardConfigs }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, error, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const config = dashboardConfigs[dashboard || 'teacher'];
  const colorClass = `text-${config.color}-600`;
  const buttonClass = `bg-${config.color}-600 hover:bg-${config.color}-700`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await register({
          email,
          password,
          name,
          role: config.role
        });
      } else {
        await login({ email, password });
      }
      const from = (location.state as any)?.from?.pathname || `/${config.role}`;
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          )}

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

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md border border-transparent ${buttonClass} py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isSignUp ? 'Sign Up' : 'Sign In'
              )}
            </button>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className={`font-medium ${colorClass} hover:opacity-80`}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          )}

          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className={`ml-1 font-medium ${colorClass} hover:opacity-80`}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;