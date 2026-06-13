"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";
import gsap from "gsap";

/* ── SVG Icons ── */
const PlusIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const SparkleIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const SendIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const UserIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

const CHAT_HISTORY = [
  { id: 1, group: "Today", title: "Redheaded portrait in gallery" },
  { id: 2, group: "Today", title: "Cinematic sci-fi cityscape" },
  { id: 3, group: "Yesterday", title: "Minimalist logo design" },
  { id: 4, group: "Previous 7 Days", title: "Cyberpunk character art" },
];

const MESSAGES = [
  { 
    id: 1, 
    role: "user", 
    content: "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is wearing a cream-colored cashmere sweater. Modern art gallery background." 
  },
  { 
    id: 2, 
    role: "assistant", 
    images: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop"
    ]
  }
];

export default function ImageStudioChat() {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const bg = isDark ? "#121212" : "#fafafa";
  const fg = isDark ? "#f4f4f5" : "#18181b";
  const surface = isDark ? "#1e1e1e" : "#ffffff";
  const border = isDark ? "#333333" : "#e4e4e7";
  const accent = "#d4896a";

  const [prompt, setPrompt] = useState("");
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      gsap.fromTo(
        feedRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-72px)] transition-colors duration-300" style={{ background: bg, color: fg }}>
      
      {/* Left Sidebar - Chat History */}
      <aside className="w-[300px] shrink-0 flex flex-col hidden md:flex border-r" style={{ background: surface, borderColor: border }}>
        <div className="p-5 flex-1 overflow-y-auto">
          <button className="w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mb-8 shadow-sm transition-all hover:opacity-80 text-white" style={{ background: accent }}>
            <PlusIcon /> New Canvas
          </button>

          {['Today', 'Yesterday', 'Previous 7 Days'].map(group => (
            <div key={group} className="mb-8">
              <h3 className="text-[11px] font-black uppercase tracking-widest mb-3 px-2 opacity-40">{group}</h3>
              <div className="flex flex-col gap-1">
                {CHAT_HISTORY.filter(h => h.group === group).map(chat => (
                  <button key={chat.id} className="text-left text-sm truncate px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors opacity-70 hover:opacity-100 font-medium">
                    {chat.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* User Profile Area */}
        <div className="p-5 border-t flex items-center gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors" style={{ borderColor: border }}>
          <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white shadow-md" style={{ background: accent }}>
            <UserIcon />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate">Highsfields Pro</div>
            <div className="text-[11px] opacity-60 truncate font-medium mt-0.5">Manage Settings</div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative min-w-0 bg-transparent">
        
        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 scroll-smooth pb-48">
          <div ref={feedRef} className="max-w-4xl mx-auto flex flex-col gap-10">
            {MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex gap-5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {/* Assistant Avatar */}
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-md text-white" style={{ background: accent }}>
                    <SparkleIcon />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                  {msg.role === 'user' ? (
                    <div className="rounded-3xl rounded-tr-sm px-6 py-4 text-[15px] shadow-sm leading-relaxed" style={{ background: isDark ? "#27272a" : "#f4f4f5" }}>
                      {msg.content}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        {msg.images?.map((img, i) => (
                          <div key={i} className="relative rounded-2xl overflow-hidden shadow-sm group border" style={{ aspectRatio: '1/1', borderColor: border }}>
                            <Image src={img} alt="Generated image" fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                              <button className="px-4 py-2 text-xs font-bold text-white bg-white/20 rounded-xl backdrop-blur-md hover:bg-white/30 transition-colors shadow-lg">Upscale</button>
                              <button className="px-4 py-2 text-xs font-bold text-white bg-white/20 rounded-xl backdrop-blur-md hover:bg-white/30 transition-colors shadow-lg">Vary</button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="text-[13px] px-4 py-2 rounded-xl font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors border shadow-sm" style={{ borderColor: border }}>Regenerate</button>
                        <button className="text-[13px] px-4 py-2 rounded-xl font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors border shadow-sm" style={{ borderColor: border }}>Copy Prompt</button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            
            <div className="flex flex-col gap-2 p-2 rounded-[28px] shadow-2xl border backdrop-blur-2xl" style={{ background: isDark ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)', borderColor: border }}>
              
              {/* Top settings row */}
              <div className="flex items-center justify-between px-4 pt-3">
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                  {['Highsfields v2', '16:9', 'Photorealistic'].map(badge => (
                    <span key={badge} className="px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors opacity-70">
                      {badge}
                    </span>
                  ))}
                </div>
                <button className="opacity-50 hover:opacity-100 transition-opacity p-1">
                  <SettingsIcon />
                </button>
              </div>

              {/* Input Area */}
              <div className="flex items-end gap-3 px-4 pb-3">
                <textarea 
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..." 
                  className="flex-1 bg-transparent py-2 outline-none resize-none min-h-[44px] max-h-[120px] text-[15px] leading-relaxed placeholder:opacity-40 font-medium"
                  onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      setPrompt("");
                    }
                  }}
                />
                <button 
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all ${prompt.length > 0 ? 'bg-[#d4896a] text-white shadow-lg hover:scale-105 active:scale-95' : 'bg-black/5 dark:bg-white/5 opacity-50'}`}
                >
                  <SendIcon />
                </button>
              </div>
              
            </div>
            
            <div className="text-center mt-3 text-[11px] font-medium opacity-40">
              Highsfields Image generation can make mistakes. Consider verifying important details.
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
