import React from 'react';
import { Menu, Search, Crown, Sparkles, Activity } from 'lucide-react';

export default function Header({ 
  onOpenSidebar, 
  onOpenSearch, 
  onOpenVip, 
  onOpenApiStatus,
  activeProvider, 
  onSelectProvider 
}) {
  return (
    <header className="sticky top-0 z-30 w-full glass-nav backdrop-blur-xl border-b border-white/10 px-4 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Drawer Menu & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSidebar}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Buka Menu Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-black text-white shadow-md shadow-red-900/30">
                S
              </div>
              <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 p-0.5 rounded-full">
                <Crown className="w-2.5 h-2.5 fill-slate-950" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                  S-DRACIN
                </span>
                <span className="text-[10px] font-bold text-amber-400 px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/30">
                  v1.1
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block leading-none mt-0.5">
                VIP Free Stream
              </span>
            </div>
          </div>
        </div>

        {/* Center/Right: Provider Switcher Pill & Actions */}
        <div className="flex items-center gap-2">
          {/* Provider Pill (DramaBox vs Melolo) */}
          <div className="hidden sm:flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-0.5 text-xs">
            <button
              onClick={() => onSelectProvider('dramabox')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                activeProvider === 'dramabox'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DramaBox
            </button>
            <button
              onClick={() => onSelectProvider('melolo')}
              className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1 transition-all ${
                activeProvider === 'melolo'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Melolo
            </button>
          </div>

          {/* API Status Button */}
          <button
            onClick={onOpenApiStatus}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Cek Status API & Server Latency"
          >
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="hidden md:inline">API Status</span>
          </button>

          {/* Search Button */}
          <button 
            onClick={onOpenSearch}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Cari Drama"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* VIP Badge Trigger */}
          <button
            onClick={onOpenVip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-yellow-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold hover:brightness-110 transition-all shadow-sm"
          >
            <Crown className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span className="hidden xs:inline">VIP FREE</span>
          </button>
        </div>
      </div>
    </header>
  );
}
