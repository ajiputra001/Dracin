import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Check, 
  Star, 
  Crown, 
  Share2, 
  Eye, 
  Film, 
  Sparkles, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function DetailView({ 
  drama, 
  onBack, 
  onPlayEpisode, 
  isSaved, 
  onToggleDaftarku,
  watchHistory 
}) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!drama) return null;

  const historyItem = watchHistory.find(h => h.dramaId === drama.id);
  const lastWatchedEp = historyItem ? historyItem.lastEpisode : 1;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: drama.title,
        text: `Nonton drama ${drama.title} gratis VIP di S-DRACIN!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      {/* Top Navigation & Backdrop Hero */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <img 
          src={drama.banner || drama.poster} 
          alt={drama.title}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-black/40" />

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/60 border border-white/20 text-white backdrop-blur-md hover:bg-black/80 transition-all active:scale-95 z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 flex flex-col md:flex-row items-start md:items-end gap-5">
          {/* Poster Image */}
          <div className="w-28 h-40 sm:w-36 sm:h-52 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl flex-shrink-0 bg-slate-950">
            <img src={drama.poster} alt={drama.title} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1">
                <Crown className="w-3 h-3 fill-slate-950" />
                VIP FREE
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-xs font-bold">
                {drama.provider}
              </span>
              <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {drama.year}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {drama.title}
            </h1>
            <p className="text-xs text-slate-400 italic">{drama.titleOriginal}</p>

            {/* Meta stats */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{drama.rating} Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{drama.views} Penonton</span>
              </div>
              <div className="flex items-center gap-1">
                <Film className="w-4 h-4 text-slate-400" />
                <span>{drama.episodesCount} Episode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onPlayEpisode(drama, lastWatchedEp)}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 hover:brightness-110 active:scale-95 transition-all"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>{historyItem ? `Lanjut Eps ${lastWatchedEp}` : 'Tonton Eps 1'}</span>
        </button>

        <button
          onClick={() => onToggleDaftarku(drama.id)}
          className={`p-3.5 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
            isSaved 
              ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
              : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800'
          }`}
        >
          {isSaved ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          <span className="hidden sm:inline">{isSaved ? 'Tersimpan' : 'Daftarku'}</span>
        </button>

        <button
          onClick={handleShare}
          className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-all active:scale-95 relative"
          title="Bagikan Drama"
        >
          <Share2 className="w-5 h-5" />
          {copiedShare && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold whitespace-nowrap shadow">
              Link Tersalin!
            </span>
          )}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {drama.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            #{tag}
          </span>
        ))}
      </div>

      {/* Synopsis Card */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-2">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Sinopsis Ringkas
        </h3>
        <p className={`text-xs text-slate-300 leading-relaxed ${showFullSynopsis ? '' : 'line-clamp-3'}`}>
          {drama.synopsis}
        </p>
        <button 
          onClick={() => setShowFullSynopsis(!showFullSynopsis)}
          className="text-xs font-bold text-amber-400 hover:underline pt-1"
        >
          {showFullSynopsis ? 'Sembunyikan' : 'Baca Selengkapnya'}
        </button>
      </div>

      {/* Episode Selection List Grid */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-red-500" />
            Daftar Episode ({drama.episodesCount})
          </h2>
          <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
            Akses VIP Unlocked Gratis
          </span>
        </div>

        <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {drama.episodes.map((ep) => {
            const isWatched = lastWatchedEp >= ep.episodeNumber && historyItem;
            const isCurrent = lastWatchedEp === ep.episodeNumber && historyItem;

            return (
              <button
                key={ep.episodeNumber}
                onClick={() => onPlayEpisode(drama, ep.episodeNumber)}
                className={`relative flex flex-col items-center justify-center py-3 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-md shadow-red-900/40 scale-105'
                    : isWatched
                    ? 'bg-slate-900 border-emerald-500/40 text-emerald-400 hover:border-emerald-400'
                    : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <span>Eps {ep.episodeNumber}</span>

                {isWatched && !isCurrent && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-1" />
                )}

                {ep.isVip && !isWatched && !isCurrent && (
                  <Crown className="w-2.5 h-2.5 text-amber-400 fill-amber-400/30 absolute top-1 right-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
