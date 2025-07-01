import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, Zap, Users, TrendingUp, Target } from 'lucide-react';

const AppNavigation = () => {
  const navItems = [
    { to: '/pods', icon: Users, label: 'Pods' },
    { to: '/budgets', icon: Target, label: 'Budgets' },
    { to: '/', icon: MessageCircle, label: 'Chat' },
    { to: '/micro-invest', icon: TrendingUp, label: 'Invest' },
    { to: '/earn', icon: Zap, label: 'Earn' },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 px-6 py-4">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 font-inter font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AppNavigation;
