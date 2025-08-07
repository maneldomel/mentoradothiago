import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, Settings } from 'lucide-react';

const DevNavigation: React.FC = () => {
  const location = useLocation();
  
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b-2 border-blue-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Bolt Environment Badge */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">BOLT DEV</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                  title={item.description}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Environment Info */}
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-blue-200" />
            <span className="text-blue-200 text-xs">Development Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevNavigation;