import React, { useState, useRef } from 'react';
import { Play, Pause, Heart, Bookmark, MessageCircle, Share2, Crown, Sparkles, ChevronUp, ChevronDown, Check } from 'lucide-react';

export default function ReelsView({ dramas, onSelectDrama, daftarkuIds, onToggleDaftarku }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likes, setLikes] = useState({ 'dr-01': 1420, 'dr-02': 980, 'dr-03': 2100 });
  const [likedMap, setLikedMap] = useState({});
  const videoRef = useRef(null);

  const currentDrama = dramas[currentIndex] || dramas[0];
  const isSaved = daftarkuIds.includes(currentDrama.id);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentIndex < dramas.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const toggleLike = (id) => {
    setLikedMap(prev => {
      const isLiked = prev[id];
      setLikes(l => ({ ...l, [id]: (l[id] || 500) + (isLiked ? -1 : 1) }));
      return { ...prev, [id]: !isLiked };
    });
  };

  return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col justify-between select-none animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            REELS DRAMA SHORT
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
            VIP FREE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-white disabled:opacity-30"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button 
            disabled={currentIndex === dramas.length - 1}
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-white disabled:opacity-30"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Reels Video Viewport */}
      <div className="relative w-full h-full flex items-center justify-center bg-black" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={currentDrama.episodes[0]?.videoUrl}
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {!isPlaying && (
          <div className="absolute p-5 rounded-full bg-red-600/90 text-white shadow-2xl backdrop-blur-md">
            <Play className="w-10 h-10 fill-white ml-1" />
          </div>
        )}
      </div>

      {/* Bottom Information Overlay & Right Floating Actions */}
      <div className="absolute bottom-16 inset-x-0 z-20 p-5 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end justify-between gap-4">
        
        {/* Left Drama Details */}
        <div className="space-y-2 max-w-[70%]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-black">
              {currentDrama.provider}
            </span>
            <span className="text-xs font-semibold text-amber-400">
              Eps 1 / {currentDrama.episodesCount}
            </span>
          </div>

          <h2 className="text-lg font-black text-white leading-snug drop-shadow">
            {currentDrama.title}
          </h2>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed drop-shadow">
            {currentDrama.synopsis}
          </p>

          <button
            onClick={() => onSelectDrama(currentDrama, 1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-extrabold shadow-lg shadow-red-900/50 hover:brightness-110 active:scale-95 transition-all mt-1"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Tonton Selengkapnya</span>
          </button>
        </div>

        {/* Right Floating Actions (TikTok style) */}
        <div className="flex flex-col items-center gap-4 text-white">
          {/* Like */}
          <button 
            onClick={() => toggleLike(currentDrama.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`p-3 rounded-full border backdrop-blur-md transition-all ${
              likedMap[currentDrama.id] 
                ? 'bg-rose-600 border-rose-500 text-white scale-110' 
                : 'bg-black/60 border-white/20 text-white group-hover:scale-105'
            }`}>
              <Heart className={`w-6 h-6 ${likedMap[currentDrama.id] ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[11px] font-extrabold">{likes[currentDrama.id] || 1200}</span>
          </button>

          {/* Bookmark / Daftarku */}
          <button 
            onClick={() => onToggleDaftarku(currentDrama.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`p-3 rounded-full border backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-emerald-500 border-emerald-400 text-white scale-110' 
                : 'bg-black/60 border-white/20 text-white group-hover:scale-105'
            }`}>
              {isSaved ? <Check className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
            </div>
            <span className="text-[11px] font-extrabold">{isSaved ? 'Tersimpan' : 'Daftarku'}</span>
          </button>

          {/* Comments */}
          <button 
            onClick={() => onSelectDrama(currentDrama, 1)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-3 rounded-full bg-black/60 border border-white/20 text-white group-hover:scale-105 backdrop-blur-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-extrabold">342</span>
          </button>
        </div>

      </div>

    </div>
  );
}
