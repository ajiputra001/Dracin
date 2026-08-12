import React from 'react';
import { 
  X, 
  Home, 
  Sparkles, 
  Crown, 
  Bookmark, 
  History, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, currentView, onViewChange, userProfile }) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Beranda Utama', icon: Home },
    { id: 'melolo', label: 'Melolo Drama Special', icon: Sparkles, badge: 'New v1.1' },
    { id: 'vip', label: 'Akses VIP Gratis', icon: Crown, badge: 'FREE' },
    { id: 'daftarku', label: 'Daftarku (Favorit)', icon: Bookmark },
    { id: 'riwayat', label: 'Riwayat Tonton', icon: History },
    { id: 'chat', label: 'Global Chat', icon: MessageSquare, badge: 'Live' },
    { id: 'apistatus', label: 'Status API & Server', icon: Activity },
    { id: 'profile', label: 'Profil Saya', icon: UserCheck },
    { id: 'privacy', label: 'Privacy Policy', icon: FileText }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-xs bg-[#11131a] h-full shadow-2xl border-r border-white/10 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-300">
        
        <div>
          {/* Top User Card Header */}
          <div className="p-5 border-b border-slate-800/80 bg-gradient-to-b from-red-950/20 to-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-md">
                  S
                </div>
                <span className="font-extrabold text-lg text-white">S-DRACIN</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Brief */}
            <div 
              onClick={() => { onViewChange('profile'); onClose(); }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 cursor-pointer hover:border-slate-700 transition-all group"
            >
              <img 
                src={userProfile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"} 
                alt="Avatar"
                className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400/50 shadow-md"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white truncate group-hover:text-amber-300 transition-colors">
                    {userProfile?.name || 'Dracin Lover'}
                  </h3>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-slate-950 flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 fill-slate-950" />
                    VIP UNLOCKED
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-900/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.id === 'vip' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      item.id === 'melolo' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : item.id === 'vip'
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Security Patch 1.0.0 Beta</span>
          </div>
          <p className="text-[11px] text-slate-500">
            S-DRACIN v1.1.0 (Stable Build) &bull; PaleviDev
          </p>
        </div>

      </div>
    </div>
  );
}
