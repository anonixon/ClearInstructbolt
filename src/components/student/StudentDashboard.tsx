import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, MessageSquare, BarChart } from 'lucide-react';
import { useAuth } from '@contexts/AuthContext';
import { ROUTES } from '@lib/constants/routes';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Assignments',
      description: 'View and submit your homework assignments',
      icon: BookOpen,
      color: 'blue',
      link: '/student/assignments'
    },
    {
      title: 'Schedule',
      description: 'Check your class schedule and upcoming events',
      icon: Calendar,
      color: 'green',
      link: '/student/schedule'
    },
    {
      title: 'Messages',
      description: 'Communicate with teachers and classmates',
      icon: MessageSquare,
      color: 'purple',
      link: '/student/messages'
    },
    {
      title: 'Progress',
      description: 'Track your academic progress and grades',
      icon: BarChart,
      color: 'orange',
      link: '/student/progress'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-6 sm:px-0"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here's what's happening in your classes today.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md bg-${feature.color}-500 p-3`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        {feature.title}
                      </dt>
                      <dd className="text-sm text-gray-900 dark:text-white">
                        {feature.description}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={feature.link}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View details →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New assignment posted in Mathematics
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900 dark:text-white">
                    New message from your Science teacher
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    4 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Your grade for the History project has been updated
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard; 