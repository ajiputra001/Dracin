import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, Play, Crown, RefreshCw, Flame, Heart } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose, dramas, onSelectDrama }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Halo! Saya DRACIN AI 🤖✨ Asisten pintar nonton dramamu. Kamu lagi pengen nonton drama jenis apa hari ini? Ceritakan suasana hatimu!',
      recommendations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    "🔥 Drama CEO & Balas Dendam Terbaik",
    "💖 Drama Romantis Manis Bikin Baper",
    "📌 Rekomendasi Drama Melolo Terbaru",
    "⚡ Drama Action Silat & Time Travel"
  ];

  const handleSendPrompt = (promptText) => {
    const userText = promptText || input;
    if (!userText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    if (!promptText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let matchedDramas = [];
      const lower = userText.toLowerCase();

      if (lower.includes('ceo') || lower.includes('dendam') || lower.includes('kaya')) {
        matchedDramas = dramas.filter(d => d.category === 'ceo' || d.tags.includes('CEO'));
      } else if (lower.includes('melolo')) {
        matchedDramas = dramas.filter(d => d.provider === 'Melolo' || d.category === 'melolo');
      } else if (lower.includes('romantis') || lower.includes('baper') || lower.includes('cinta')) {
        matchedDramas = dramas.filter(d => d.category === 'romance' || d.tags.includes('Romantis'));
      } else if (lower.includes('action') || lower.includes('silat') || lower.includes('time') || lower.includes('travel')) {
        matchedDramas = dramas.filter(d => d.category === 'action' || d.category === 'timetravel');
      } else {
        matchedDramas = dramas.slice(0, 3);
      }

      if (matchedDramas.length === 0) matchedDramas = dramas.slice(0, 3);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Berdasarkan permintaanmu "${userText}", ini 3 rekomendasi drama terbaik dengan Akses VIP Gratis yang cocok buat kamu tonton sekarang!`,
        recommendations: matchedDramas.slice(0, 3)
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="w-full max-w-lg h-[650px] max-h-[85vh] rounded-3xl bg-[#11131a] border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-red-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Bot className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-white">DRACIN AI Assistant</h3>
                <span className="px-2 py-0.2 rounded bg-amber-400 text-slate-950 text-[9px] font-black">
                  v1.1 SMART
                </span>
              </div>
              <p className="text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Rekomendasi Cerdas Berbasis Mood
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {m.sender === 'ai' ? (
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-xs">
                  Kamu
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${m.sender === 'user' ? 'items-end text-right' : ''}`}>
                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
                }`}>
                  {m.text}
                </div>

                {/* AI Drama Cards Recommendations */}
                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="space-y-2 pt-1 text-left">
                    {m.recommendations.map((drama) => (
                      <div 
                        key={drama.id}
                        onClick={() => {
                          onSelectDrama(drama, 1);
                          onClose();
                        }}
                        className="p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3 hover:border-amber-500/50 cursor-pointer transition-all group"
                      >
                        <img src={drama.poster} alt={drama.title} className="w-12 h-16 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-amber-400 font-extrabold">{drama.provider}</span>
                          <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300">
                            {drama.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{drama.synopsis}</p>
                        </div>
                        <button className="p-2 rounded-xl bg-red-600 text-white shadow">
                          <Play className="w-4 h-4 fill-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>DRACIN AI sedang menganalisis selera dramamu...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestions Chips */}
        <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(p)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-bold text-slate-300 hover:text-amber-400 hover:border-amber-500/40 whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendPrompt(); }} className="p-3 bg-slate-900 flex items-center gap-2 border-t border-slate-800">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan rekomendasi drama ke DRACIN AI..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold disabled:opacity-50 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
