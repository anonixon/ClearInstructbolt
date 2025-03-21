import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, UserCog } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Clear Instruct
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            A comprehensive platform for teachers, parents, and educational institutions to enhance the learning experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Link
              to="/teachers"
              className="group p-8 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="w-16 h-16 text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">For Teachers</h2>
                <p className="text-gray-400">
                  Streamline your classroom management and enhance teaching effectiveness
                </p>
              </div>
            </Link>

            <Link
              to="/parents"
              className="group p-8 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <Users className="w-16 h-16 text-emerald-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">For Parents</h2>
                <p className="text-gray-400">
                  Stay connected with your child's education journey
                </p>
              </div>
            </Link>

            <Link
              to="/institutions"
              className="group p-8 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <UserCog className="w-16 h-16 text-purple-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">For Institutions</h2>
                <p className="text-gray-400">
                  Comprehensive tools for school management and administration
                </p>
              </div>
            </Link>
          </div>
          <div className="mt-12">
            <Link
              to="/parent-portal"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Access Parent Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;