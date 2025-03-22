import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { Menu, X, Sun } from 'lucide-react';
=======
import { Menu, X, GraduationCap } from 'lucide-react';
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
<<<<<<< HEAD
    { name: 'For Teachers', href: '/teachers' },
    { name: 'For Parents', href: '/parents' },
    { name: 'For Schools & Colleges', href: '/institutions' },
=======
    { name: 'Home', href: '/' },
    { name: 'For Teachers', href: '/teachers' },
    { name: 'For Parents', href: '/parents' },
    { name: 'For Institutions', href: '/institutions' },
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
<<<<<<< HEAD
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-blue-600">Clear Instruct</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
=======
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">EduManage</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
<<<<<<< HEAD
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
=======
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
                }`}
              >
                {item.name}
              </Link>
            ))}
<<<<<<< HEAD
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Sun className="w-5 h-5" />
            </button>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              Log in
            </Link>
=======
            <div className="flex items-center gap-2">
              <Link
                to="/login/teacher"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Teacher Login
              </Link>
              <Link
                to="/login/parent"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Parent Login
              </Link>
            </div>
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
<<<<<<< HEAD
              className="p-2 text-gray-600 hover:text-gray-900"
=======
              className="p-2 text-gray-400 hover:text-white"
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
<<<<<<< HEAD
        <div className="md:hidden fixed inset-x-0 top-16 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-200 shadow-lg">
=======
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 border-b border-gray-800">
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
<<<<<<< HEAD
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
=======
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive(item.href)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
                }`}
              >
                {item.name}
              </Link>
            ))}
<<<<<<< HEAD
            <div className="flex items-center gap-4 px-3 py-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Sun className="w-5 h-5" />
              </button>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-900 hover:text-gray-600"
              >
                Log in
              </Link>
            </div>
=======
            <Link
              to="/login/teacher"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white"
            >
              Teacher Login
            </Link>
            <Link
              to="/login/parent"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Parent Login
            </Link>
>>>>>>> 143bc1a4ecfdb5a16c150ea5f009b881cad26fae
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;