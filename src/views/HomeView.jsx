import React, { useState } from 'react';
import { Play, Plus, Check, Star, Crown, Sparkles, TrendingUp, ChevronRight, Eye, Film } from 'lucide-react';
import { DRAMA_CATEGORIES } from '../data/mockDramas';

export default function HomeView({ 
  dramas, 
  onSelectDrama, 
  daftarkuIds, 
  onToggleDaftarku, 
  watchHistory, 
  activeProvider,
  onOpenVip 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter dramas by active provider or selected category
  const filteredDramas = dramas.filter(d => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'melolo') return d.provider === 'Melolo' || d.category === 'melolo';
    if (selectedCategory === 'vip') return d.isVipFree;
    if (selectedCategory === 'trending') return d.tags.includes('Trending');
    return d.category === selectedCategory;
  });

  const heroDrama = dramas[0] || {};
  const isHeroInDaftarku = daftarkuIds.includes(heroDrama.id);

  const meloloDramas = dramas.filter(d => d.provider === 'Melolo' || d.category === 'melolo');
  const vipDramas = dramas.filter(d => d.isVipFree);

  return (
    <div className="pb-24 space-y-6">
      
      {/* Featured Hero Banner */}
      <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
        <img 
          src={heroDrama.banner || heroDrama.poster} 
          alt={heroDrama.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10]/80 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-black shadow-lg flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            #1 TRENDING
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1 vip-badge-glow">
            <Crown className="w-3.5 h-3.5 fill-slate-950" />
            VIP FREE
          </span>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>{heroDrama.provider || 'S-DRACIN Core'} Special &bull; {heroDrama.episodesCount} Episode Full HD</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md leading-tight">
            {heroDrama.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl font-normal leading-relaxed">
            {heroDrama.synopsis}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => onSelectDrama(heroDrama, 1)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/50 hover:brightness-110 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Tonton Sekarang</span>
            </button>

            <button
              onClick={() => onToggleDaftarku(heroDrama.id)}
              className={`p-3 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isHeroInDaftarku 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
            >
              {isHeroInDaftarku ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              <span className="hidden sm:inline">{isHeroInDaftarku ? 'Tersimpan' : 'Daftarku'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
        {DRAMA_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-900/30 scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Continue Watching Section (Riwayat) */}
      {watchHistory.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-red-500" />
              Lanjutkan Menonton
            </h2>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
            {watchHistory.map((item) => {
              const drama = dramas.find(d => d.id === item.dramaId);
              if (!drama) return null;
              return (
                <div 
                  key={item.dramaId}
                  onClick={() => onSelectDrama(drama, item.lastEpisode)}
                  className="flex-none w-44 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden cursor-pointer hover:border-slate-700 transition-all group"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-bold text-white truncate">{drama.title}</h4>
                    <p className="text-[10px] text-amber-400 font-semibold mt-0.5">Eps {item.lastEpisode} dari {drama.episodesCount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Melolo API Specials Section (Update 1.1.0 Feature) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Melolo Special Drama (v1.1.0)
            </h2>
            <p className="text-xs text-slate-400">Rekomendasi drama Melolo API dengan server super cepat</p>
          </div>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {meloloDramas.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              onSelect={onSelectDrama} 
              isSaved={daftarkuIds.includes(drama.id)}
              onToggleDaftarku={onToggleDaftarku}
            />
          ))}
        </div>
      </div>

      {/* Main Drama Catalog Grid */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            Drama Popular VIP Gratis
          </h2>
          <button 
            onClick={onOpenVip} 
            className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            Akses VIP
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {filteredDramas.map((drama) => (
            <DramaCard 
              key={drama.id} 
              drama={drama} 
              onSelect={onSelectDrama} 
              isSaved={daftarkuIds.includes(drama.id)}
              onToggleDaftarku={onToggleDaftarku}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

function DramaCard({ drama, onSelect, isSaved, onToggleDaftarku }) {
  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden hover:border-slate-600 transition-all duration-300 shadow-md cursor-pointer"
      onClick={() => onSelect(drama, 1)}
    >
      {/* Poster Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
        <img 
          src={drama.poster} 
          alt={drama.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {drama.isVipFree && (
            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black shadow-md flex items-center gap-1">
              <Crown className="w-2.5 h-2.5 fill-slate-950" />
              VIP
            </span>
          )}
          {drama.provider === 'Melolo' && (
            <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold shadow-md">
              Melolo
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleDaftarku(drama.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-xl border backdrop-blur-md transition-all ${
            isSaved 
              ? 'bg-emerald-500 text-white border-emerald-400' 
              : 'bg-black/60 border-white/20 text-white hover:bg-black/80'
          }`}
          aria-label="Simpan ke Daftarku"
        >
          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>

        {/* Bottom Poster Gradient & Rating */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-2 pt-6 flex items-center justify-between text-[11px] font-bold">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{drama.rating}</span>
          </div>
          <span className="text-slate-300 text-[10px]">{drama.episodesCount} Eps</span>
        </div>
      </div>

      {/* Title & Info */}
      <div className="p-2.5 flex flex-col justify-between flex-1">
        <h3 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
          {drama.title}
        </h3>

        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span className="truncate">{drama.category.toUpperCase()}</span>
          <span className="flex items-center gap-0.5 text-slate-400">
            <Eye className="w-3 h-3" />
            {drama.views}
          </span>
        </div>
      </div>
    </div>
  );
}
