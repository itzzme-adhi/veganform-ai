import React from 'react';
import { TabType } from '../types/formulation';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const items: { id: TabType; label: string; icon: string }[] = [
    { id: 'product', label: 'Product', icon: 'dashboard' },
    { id: 'formulate', label: 'Formulate', icon: 'science' },
    { id: 'candidates', label: 'Candidates', icon: 'biotech' },
    { id: 'knowledge', label: 'Knowledge', icon: 'hub' },
    { id: 'demo', label: 'Demo', icon: 'play_circle' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#0a0f0d]/92 backdrop-blur-xl border-t border-[#1f382b]/60 shadow-[0_-4px_24px_rgba(0,0,0,0.7)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {items.map((item) => {
          // Candidates is also considered active if on 'detail'
          const isActive = currentTab === item.id || (item.id === 'candidates' && currentTab === 'detail');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-all relative cursor-pointer ${
                isActive
                  ? 'text-[#00f5a0] font-semibold'
                  : 'text-[#8da396] hover:text-[#dfe4e0]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform ${
                  isActive ? 'scale-110 drop-shadow-[0_0_8px_#00f5a0]' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="font-mono text-[10px] tracking-wide truncate">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5a0] absolute bottom-1 shadow-[0_0_6px_#00f5a0] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
