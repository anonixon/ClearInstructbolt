import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'For Teachers', href: '/teachers' },
    { name: 'For Parents', href: '/parents' },
    { name: 'For Schools & Colleges', href: '/institutions' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-blue-600">Clear Instruct</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-200 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.href)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;