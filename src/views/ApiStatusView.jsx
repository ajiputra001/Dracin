import React, { useState } from 'react';
import { Activity, Server, ShieldCheck, RefreshCw, CheckCircle2, Wifi } from 'lucide-react';
import { API_PROVIDERS, SECURITY_PATCH } from '../services/apiStatus';

export default function ApiStatusView({ activeProvider, onSelectProvider }) {
  const [testing, setTesting] = useState(false);
  const [lastTested, setLastTested] = useState("Baru saja");

  const handleTestLatency = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setLastTested(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
  };

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            Status API & Server (v1.1.0)
          </h1>
          <p className="text-xs text-slate-400">Pemantauan server streaming & jalur integrasi API</p>
        </div>

        <button
          onClick={handleTestLatency}
          disabled={testing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin text-amber-400' : ''}`} />
          <span>Tes Ping</span>
        </button>
      </div>

      {/* Security Shield Card */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white">Security Patch {SECURITY_PATCH.version}</h3>
            <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              {SECURITY_PATCH.status}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Encrypted Stream Tokens & Direct Fast Bypass Shield aktif.
          </p>
        </div>
      </div>

      {/* Server Provider Cards List */}
      <div className="space-y-3">
        {API_PROVIDERS.map((provider) => {
          const isSelected = activeProvider === provider.id;
          return (
            <div 
              key={provider.id}
              className={`p-4 rounded-2xl bg-slate-900/90 border transition-all ${
                isSelected 
                  ? 'border-amber-500 shadow-lg shadow-amber-500/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">{provider.name}</h3>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                    {provider.version}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <Wifi className="w-3.5 h-3.5" />
                    {provider.latency}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    {provider.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {provider.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">{provider.endpoint}</span>
                <button
                  onClick={() => onSelectProvider(provider.id)}
                  className={`px-3 py-1 rounded-xl font-extrabold text-xs transition-all ${
                    isSelected 
                      ? 'bg-amber-400 text-slate-950 shadow' 
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? 'Server Aktif' : 'Gunakan Server Ini'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
