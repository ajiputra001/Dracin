import React, { useState } from 'react';
import { 
  Crown, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  Tv, 
  Sparkles, 
  HeartHandshake, 
  Flame,
  ArrowRight
} from 'lucide-react';

export default function VipView({ onExploreDramas }) {
  const [claimed, setClaimed] = useState(true);

  const vipFeatures = [
    { title: 'Full HD 1080p Streaming', desc: 'Nikmati kejernihan gambar drama tanpa buffering.', icon: Tv },
    { title: 'Bebas Semua Episode', desc: 'Buka semua episode terkunci tanpa batasan harian.', icon: Zap },
    { title: 'Bebas Iklan Pengganggu', desc: 'Pengalaman menonton yang mulus dan nyaman di mata.', icon: ShieldCheck },
    { title: 'Server Melolo & DramaBox Fast Route', desc: 'Akses jalur streaming prioritas dengan ping terendah.', icon: Sparkles },
  ];

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-500/20 via-slate-900 to-red-950/40 border border-amber-500/40 shadow-2xl overflow-hidden text-center space-y-4">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg vip-badge-glow">
          <Crown className="w-4 h-4 fill-slate-950" />
          <span>STATUS: VIP GRATIS AKTIF</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Akses VIP Gratis <span className="gold-gradient-text">S-DRACIN</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Nikmati semua fitur premium streaming drama tanpa bayar sepeser pun. 
          Semua konten DramaBox & Melolo terbuka otomatis!
        </p>

        {/* Claim / Active Badge */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20">
            <CheckCircle className="w-5 h-5 fill-slate-950 text-amber-400" />
            <span>Hak Istimewa VIP Aktif Selamanya</span>
          </div>
        </div>
      </div>

      {/* VIP Perks List Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" />
          Keuntungan Akses VIP Gratis
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vipFeatures.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-4 hover:border-amber-500/40 transition-all shadow-md group"
              >
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dedicated Call-to-action */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-3">
        <HeartHandshake className="w-8 h-8 text-amber-400 mx-auto" />
        <h3 className="text-base font-extrabold text-white">Mulai Menonton Sekarang</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Pilih drama favoritmu dari katalog DramaBox dan Melolo API tanpa ragu.
        </p>
        <button
          onClick={onExploreDramas}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs shadow-lg shadow-red-900/40 hover:brightness-110 active:scale-95 transition-all"
        >
          <span>Jelajahi Beranda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
