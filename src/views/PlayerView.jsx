import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Crown, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  ListVideo,
  Settings,
  Sparkles
} from 'lucide-react';

export default function PlayerView({ 
  drama, 
  episodeNumber, 
  onBack, 
  onSelectEpisode, 
  onSaveHistory 
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [durationStr, setDurationStr] = useState("00:00");
  const [playbackQuality, setPlaybackQuality] = useState("1080p VIP");
  const [showEpisodeDrawer, setShowEpisodeDrawer] = useState(false);

  const currentEpIndex = (episodeNumber || 1) - 1;
  const currentEp = drama?.episodes[currentEpIndex] || drama?.episodes[0];
  const hasPrev = currentEpIndex > 0;
  const hasNext = currentEpIndex < (drama?.episodes.length || 0) - 1;

  useEffect(() => {
    if (drama && episodeNumber) {
      onSaveHistory(drama.id, episodeNumber);
    }
  }, [drama, episodeNumber, onSaveHistory]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((cur / dur) * 100);

    setCurrentTimeStr(formatTime(cur));
    setDurationStr(formatTime(dur));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between select-none animate-in fade-in duration-300">
      
      {/* Top Floating Bar */}
      <div className="absolute top-0 inset-x-0 z-20 p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-black/50 border border-white/20 text-white backdrop-blur-md hover:bg-black/80 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {drama?.title}
              </h2>
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black flex items-center gap-0.5">
                <Crown className="w-2.5 h-2.5 fill-slate-950" />
                VIP 1080p
              </span>
            </div>
            <p className="text-[11px] text-amber-300 font-semibold">
              Episode {currentEp?.episodeNumber} dari {drama?.episodesCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quality Switcher */}
          <button 
            onClick={() => {
              const qualities = ["1080p VIP", "720p HD", "480p SD"];
              const nextQ = qualities[(qualities.indexOf(playbackQuality) + 1) % qualities.length];
              setPlaybackQuality(nextQ);
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-extrabold text-amber-400 flex items-center gap-1 hover:bg-slate-800"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{playbackQuality}</span>
          </button>

          {/* Episode List Trigger */}
          <button 
            onClick={() => setShowEpisodeDrawer(!showEpisodeDrawer)}
            className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
            title="Daftar Episode"
          >
            <ListVideo className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={currentEp?.videoUrl}
          autoPlay
          playsInline
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            if (hasNext) onSelectEpisode(drama, episodeNumber + 1);
          }}
          onClick={togglePlay}
        />

        {/* Big Center Play/Pause Indicator on tap */}
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="absolute p-5 rounded-full bg-red-600/90 text-white shadow-2xl backdrop-blur-md transform transition-all hover:scale-110 active:scale-95"
          >
            <Play className="w-10 h-10 fill-white ml-1" />
          </button>
        )}
      </div>

      {/* Bottom Floating Control Bar (Update 1.1.0 Prev/Next feature) */}
      <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent space-y-3">
        
        {/* Seekbar & Time */}
        <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-300">
          <span>{currentTimeStr}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
          />
          <span>{durationStr}</span>
        </div>

        {/* Prev / Next & Player Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Episode Prev Button */}
          <button
            disabled={!hasPrev}
            onClick={() => onSelectEpisode(drama, episodeNumber - 1)}
            className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              hasPrev
                ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-slate-800 active:scale-95'
                : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="truncate">Eps Prev</span>
          </button>

          {/* Center Play/Pause */}
          <button
            onClick={togglePlay}
            className="p-3 rounded-2xl bg-red-600 text-white shadow-lg hover:bg-red-700 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Fullscreen */}
          <button
            onClick={handleFullScreen}
            className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white"
          >
            <Maximize className="w-5 h-5" />
          </button>

          {/* Episode Next Button (Update 1.1.0 Highlight) */}
          <button
            disabled={!hasNext}
            onClick={() => onSelectEpisode(drama, episodeNumber + 1)}
            className={`flex-1 py-2.5 px-3 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              hasNext
                ? 'bg-gradient-to-r from-red-600 to-rose-600 border-red-500 text-white shadow-lg shadow-red-900/40 hover:brightness-110 active:scale-95'
                : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
            }`}
          >
            <span className="truncate">Eps Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Episode Overlay Drawer */}
      {showEpisodeDrawer && (
        <div className="absolute inset-y-0 right-0 z-30 w-full max-w-xs bg-[#11131a]/95 backdrop-blur-xl border-l border-white/10 p-4 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <ListVideo className="w-4 h-4 text-amber-400" />
                Pilih Episode
              </h3>
              <button 
                onClick={() => setShowEpisodeDrawer(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Tutup
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {drama?.episodes.map((ep) => {
                const isActive = ep.episodeNumber === episodeNumber;
                return (
                  <button
                    key={ep.episodeNumber}
                    onClick={() => {
                      onSelectEpisode(drama, ep.episodeNumber);
                      setShowEpisodeDrawer(false);
                    }}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-red-600 text-white border-red-500 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Eps {ep.episodeNumber}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
