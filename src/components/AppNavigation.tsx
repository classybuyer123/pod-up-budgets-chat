
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
    <nav className="glass-effect-light border-t border-slate-700/50 px-4 py-3 safe-area-bottom relative shadow-lift">
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none rounded-t-2xl" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60" />
      
      <div className="flex justify-around items-center max-w-md mx-auto relative z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1.5 p-4 rounded-2xl transition-all duration-500 font-outfit font-semibold touch-manipulation relative overflow-hidden group ${
                isActive
                  ? 'enhanced-gradient text-white shadow-neon scale-110 border border-white/20'
                  : 'text-slate-400 hover:text-slate-200 glass-effect hover:scale-105 active:scale-95 hover:border hover:border-slate-600/30'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <>
                    <div className="absolute inset-0 enhanced-gradient opacity-20 animate-pulse-glow rounded-2xl" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
                  </>
                )}
                <item.icon className={`h-5 w-5 relative z-10 transition-transform duration-300 ${isActive ? 'animate-float' : 'group-hover:scale-110'}`} />
                <span className="text-xs relative z-10 font-medium tracking-wide">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AppNavigation;
