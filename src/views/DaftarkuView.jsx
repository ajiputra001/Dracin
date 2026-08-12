import React from 'react';
import { Bookmark, Play, Trash2, Crown, Star, ArrowRight, Film } from 'lucide-react';

export default function DaftarkuView({ dramas, daftarkuIds, onToggleDaftarku, onSelectDrama }) {
  const savedDramas = dramas.filter(d => daftarkuIds.includes(d.id));

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-red-500" />
            Daftarku ({savedDramas.length})
          </h1>
          <p className="text-xs text-slate-400">Koleksi drama favorit yang tersimpan</p>
        </div>

        {savedDramas.length > 0 && (
          <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
            Tersimpan Otomatis
          </span>
        )}
      </div>

      {/* List / Grid */}
      {savedDramas.length === 0 ? (
        <div className="p-10 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3 my-8">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-white">Belum Ada Drama Tersimpan</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Tekan ikon <b>+ Daftarku</b> di halaman drama untuk mengumpulkan drama favoritmu di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedDramas.map((drama) => (
            <div 
              key={drama.id}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex gap-4 hover:border-slate-700 transition-all shadow-md group"
            >
              {/* Poster */}
              <div 
                onClick={() => onSelectDrama(drama, 1)}
                className="relative w-24 h-32 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 cursor-pointer"
              >
                <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-1 left-1">
                  <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-black">
                    VIP
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 font-extrabold">{drama.provider}</span>
                    <div className="flex items-center gap-1 text-amber-400 text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{drama.rating}</span>
                    </div>
                  </div>
                  <h3 
                    onClick={() => onSelectDrama(drama, 1)}
                    className="text-xs font-bold text-white line-clamp-2 mt-1 cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    {drama.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">{drama.episodesCount} Episode</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => onSelectDrama(drama, 1)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-red-600 text-white text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-red-700 active:scale-95 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Tonton</span>
                  </button>

                  <button
                    onClick={() => onToggleDaftarku(drama.id)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                    title="Hapus dari Daftarku"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
