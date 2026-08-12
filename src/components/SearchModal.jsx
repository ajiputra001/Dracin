import React, { useState } from 'react';
import { Search, X, Star, Crown, Play } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, dramas, onSelectDrama }) {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const results = query.trim() === "" 
    ? [] 
    : dramas.filter(d => 
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase()) ||
        d.provider.toLowerCase().includes(query.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="w-full max-w-xl rounded-3xl bg-[#11131a] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari drama, genre, atau kata kunci (contoh: CEO, Melolo, Romantis)..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-xs text-slate-500 hover:text-white">
              Hapus
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Viewport */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {query.trim() === "" ? (
            <div className="text-center py-8 space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">Ketik judul drama atau genre favoritmu di atas.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['CEO', 'Melolo', 'Time Travel', 'Romantis', 'Action'].map(keyword => (
                  <button 
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 hover:border-amber-400/40"
                  >
                    #{keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Tidak ditemukan drama untuk kata kunci "<span className="text-white font-bold">{query}</span>"
            </div>
          ) : (
            results.map((drama) => (
              <div 
                key={drama.id}
                onClick={() => {
                  onSelectDrama(drama, 1);
                  onClose();
                }}
                className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 hover:border-slate-700 cursor-pointer transition-all group"
              >
                <img src={drama.poster} alt={drama.title} className="w-14 h-18 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-amber-400 font-extrabold">{drama.provider}</span>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300">{drama.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {drama.rating}
                    </span>
                    <span>&bull;</span>
                    <span>{drama.episodesCount} Episode</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-red-600 text-white">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
