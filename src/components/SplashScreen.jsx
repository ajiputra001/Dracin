import React, { useEffect, useState } from 'react';
import { Crown, Film, ShieldCheck, Sparkles } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [stepText, setStepText] = useState("Inisialisasi S-DRACIN v1.1.0...");
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStepText("Menghubungkan Melolo & DramaBox API...");
      setProgress(45);
    }, 600);

    const t2 = setTimeout(() => {
      setStepText("Mengaktifkan VIP Free Access & Security Patch...");
      setProgress(85);
    }, 1300);

    const t3 = setTimeout(() => {
      setStepText("Siap Digunakan!");
      setProgress(100);
    }, 2000);

    const t4 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0b0c10] px-6 py-12 text-white select-none">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Tag */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-amber-400">
        <Sparkles className="w-3.5 h-3.5" />
        <span>S-DRACIN v1.1.0 Update</span>
      </div>

      {/* Main Logo & Content */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-2xl shadow-red-900/40 border border-white/20 animate-pulse-subtle">
            <Film className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-lg border-2 border-[#0b0c10] vip-badge-glow">
            <Crown className="w-4 h-4 fill-slate-950" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          S-DRACIN
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-xs font-medium leading-relaxed">
          Streaming Drama Modern & Akses VIP Gratis
        </p>

        {/* VIP Free Badge */}
        <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Crown className="w-3.5 h-3.5" />
          <span>VIP FREE ACCESS ACTIVE</span>
        </div>
      </div>

      {/* Loading Progress & Security Tag */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800/80">
          <div 
            className="bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 font-medium tracking-wide flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{stepText}</span>
        </p>
        <span className="text-[10px] text-slate-500">PaleviDev &copy; 2026</span>
      </div>
    </div>
  );
}
