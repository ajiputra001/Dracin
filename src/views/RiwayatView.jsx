import React from 'react';
import { History, Play, Trash2, Clock, Film } from 'lucide-react';

export default function RiwayatView({ dramas, watchHistory, onClearHistory, onSelectDrama }) {
  const historyList = watchHistory.map(h => {
    const drama = dramas.find(d => d.id === h.dramaId);
    return { ...h, drama };
  }).filter(h => h.drama);

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <History className="w-6 h-6 text-red-500" />
            Riwayat Tonton ({historyList.length})
          </h1>
          <p className="text-xs text-slate-400">Tontonan terakhir tersimpan secara otomatis</p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-red-400 hover:border-slate-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan</span>
          </button>
        )}
      </div>

      {/* History Items */}
      {historyList.length === 0 ? (
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3 my-8">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-white">Belum Ada Riwayat Tonton</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Setiap drama yang kamu putar akan otomatis tercatat di sini agar kamu bisa melanjutkan menonton dengan mudah.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyList.map((item) => (
            <div 
              key={item.dramaId}
              onClick={() => onSelectDrama(item.drama, item.lastEpisode)}
              className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-all cursor-pointer group shadow-md"
            >
              {/* Poster thumbnail */}
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0">
                <img src={item.drama.poster} alt={item.drama.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-amber-400 font-extrabold">{item.drama.provider}</span>
                <h3 className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                  {item.drama.title}
                </h3>
                <p className="text-xs text-amber-300 font-extrabold mt-1">
                  Terakhir: Episode {item.lastEpisode} dari {item.drama.episodesCount}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(item.timestamp).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</span>
                </div>
              </div>

              {/* Action */}
              <button className="px-3 py-2 rounded-xl bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-bold group-hover:bg-red-600 group-hover:text-white transition-all">
                Lanjut
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
