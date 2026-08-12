import React from 'react';
import { Home, Sparkles, Crown, Bookmark, User, Film } from 'lucide-react';

export default function BottomNav({ currentView, onViewChange, daftarkuCount }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'reels', label: 'Reels Shorts', icon: Film, reels: true },
    { id: 'melolo', label: 'Melolo', icon: Sparkles, highlight: true },
    { id: 'vip', label: 'VIP Free', icon: Crown, vip: true },
    { id: 'daftarku', label: 'Daftarku', icon: Bookmark, count: daftarkuCount },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 glass-nav backdrop-blur-xl border-t border-white/10 px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-white font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110' : ''
                  } ${
                    tab.vip && isActive ? 'text-amber-400 fill-amber-400/20' : ''
                  } ${
                    tab.highlight && isActive ? 'text-amber-400' : ''
                  } ${
                    tab.reels && isActive ? 'text-rose-500' : ''
                  } ${
                    isActive && !tab.vip && !tab.highlight && !tab.reels ? 'text-red-500' : ''
                  }`} 
                />

                {tab.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-[#0b0c10]">
                    {tab.count}
                  </span>
                )}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight ${
                isActive ? 'font-extrabold text-white' : 'font-semibold text-slate-400'
              }`}>
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute bottom-0 w-4 h-0.5 rounded-full bg-gradient-to-r from-red-600 to-amber-400 animate-in fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
