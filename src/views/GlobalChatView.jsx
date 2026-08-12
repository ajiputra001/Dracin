import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Crown, Users, Sparkles, ShieldCheck } from 'lucide-react';

export default function GlobalChatView({ userProfile }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "PaleviDev",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
      isVip: true,
      text: "Selamat datang di S-DRACIN Update 1.1.0! Selamat menikmati drama favorit gratis VIP 🎬",
      time: "10:15"
    },
    {
      id: 2,
      user: "Sinta_Dracin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
      isVip: true,
      text: "Drama Melolo 'Kembalinya Sang Ratu Silat' seru banget episode 12 nya!",
      time: "10:18"
    },
    {
      id: 3,
      user: "Rian_Kdrama",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop",
      isVip: true,
      text: "Fitur prev/next episode di player baru ngebantu banget min, mantap!",
      time: "10:22"
    }
  ]);

  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: userProfile?.name || 'Dracin Lover',
      avatar: userProfile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop",
      isVip: true,
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMsg("");
  };

  return (
    <div className="pb-24 flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className="p-4 rounded-t-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-base font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-500" />
            Global Chat S-DRACIN
          </h1>
          <p className="text-[11px] text-slate-400">Komunitas penonton drama real-time</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Users className="w-3.5 h-3.5" />
          <span>1,420 Online</span>
        </div>
      </div>

      {/* Messages Scroll Viewport */}
      <div className="flex-1 p-4 bg-slate-950/60 border-x border-slate-900 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isMe = m.user === (userProfile?.name || 'Dracin Lover');
          return (
            <div 
              key={m.id}
              className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
            >
              <img 
                src={m.avatar} 
                alt={m.user} 
                className="w-9 h-9 rounded-xl object-cover border border-amber-400/40 flex-shrink-0"
              />

              <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end text-right' : ''}`}>
                <div className={`flex items-center gap-1.5 text-xs ${isMe ? 'justify-end' : ''}`}>
                  <span className="font-bold text-white">{m.user}</span>
                  {m.isVip && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-black">
                      VIP
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500">{m.time}</span>
                </div>

                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  isMe 
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}>
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 rounded-b-3xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
        <input 
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Ketik pesan publik..."
          className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputMsg.trim()}
          className="p-2.5 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 transition-all active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
