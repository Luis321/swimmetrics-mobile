import React from 'react';

const BottomNav = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'compare', icon: '📊', label: 'Comparar' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 safe-area-bottom z-50">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentView === item.id
                ? 'text-primary-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
