
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
    <nav className="bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 px-4 py-2 safe-area-bottom relative">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>
      
      <div className="flex justify-around items-center max-w-md mx-auto relative z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 font-inter font-medium touch-manipulation relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-2xl shadow-blue-500/30 scale-105 backdrop-blur-lg border border-blue-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 hover:backdrop-blur-lg active:scale-95 hover:border hover:border-slate-600/30'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                )}
                <item.icon className="h-5 w-5 relative z-10" />
                <span className="text-xs relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AppNavigation;
