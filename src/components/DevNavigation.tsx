import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, Menu, X } from 'lucide-react';

const DevNavigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Only show in development environment (Bolt)
  if (import.meta.env.PROD) {
    return null;
  }

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
      description: 'Landing Page'
    },
    {
      path: '/admin',
      label: 'Admin',
      icon: Shield,
      description: 'Testimonials Management'
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Slide-out Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-700 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-8 mt-8">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-lg font-bold">BOLT DEV</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                  title={item.description}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-blue-200">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Environment Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-blue-200 text-xs font-medium">Development Mode</div>
              <div className="text-blue-300 text-xs mt-1">Bolt Environment</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevNavigation;