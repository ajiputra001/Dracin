import React, { useState } from 'react';
import { Crown, User, Bookmark, History, ShieldCheck, FileText, Check, Sparkles, Edit3 } from 'lucide-react';

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop"
];

export default function ProfileView({ userProfile, onUpdateProfile, daftarkuCount, historyCount, onViewPrivacy }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile?.name || 'Dracin Lover');
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar || AVATAR_OPTIONS[0]);

  const handleSave = () => {
    onUpdateProfile({
      name: nameInput,
      avatar: selectedAvatar
    });
    setIsEditing(false);
  };

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      {/* Profile Card Header */}
      <div className="relative rounded-3xl p-6 bg-gradient-to-b from-red-950/30 via-slate-900 to-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <img 
            src={selectedAvatar} 
            alt="User Avatar"
            className="w-24 h-24 rounded-3xl object-cover border-4 border-amber-400/80 shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-lg">
            <Crown className="w-4 h-4 fill-slate-950" />
          </div>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2 max-w-xs mx-auto">
              <input 
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-500 text-sm font-bold text-white text-center"
              />
              <button 
                onClick={handleSave}
                className="p-2 rounded-xl bg-emerald-500 text-white font-bold"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-extrabold text-white">{userProfile?.name || 'Dracin Lover'}</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black">
            <Crown className="w-3.5 h-3.5 fill-amber-400" />
            <span>AKSES VIP UNLOCKED</span>
          </div>
        </div>

        {/* Avatar selector modal inline when editing */}
        {isEditing && (
          <div className="pt-2 border-t border-slate-800 w-full">
            <p className="text-xs text-slate-400 font-semibold mb-2">Pilih Avatar Profil:</p>
            <div className="flex items-center justify-center gap-3">
              {AVATAR_OPTIONS.map((imgUrl, i) => (
                <img 
                  key={i}
                  src={imgUrl}
                  alt="avatar option"
                  onClick={() => setSelectedAvatar(imgUrl)}
                  className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                    selectedAvatar === imgUrl ? 'border-amber-400 scale-110' : 'border-transparent opacity-60'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-red-600/20 text-red-500">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-white">{daftarkuCount}</span>
            <p className="text-xs text-slate-400">Daftarku Tersimpan</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-white">{historyCount}</span>
            <p className="text-xs text-slate-400">Riwayat Menonton</p>
          </div>
        </div>
      </div>

      {/* App Info & Links */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Informasi Aplikasi
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
            <span className="text-slate-400">Versi Aplikasi</span>
            <span className="font-extrabold text-white">v1.1.0 (Stable)</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
            <span className="text-slate-400">Security Patch</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              1.0.0 Beta Active
            </span>
          </div>

          <button 
            onClick={onViewPrivacy}
            className="w-full flex items-center justify-between py-2 text-left hover:text-amber-400 transition-colors"
          >
            <span className="text-slate-300 font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              Kebijakan Privasi (Privacy Policy)
            </span>
            <span className="text-slate-500">&rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
}
