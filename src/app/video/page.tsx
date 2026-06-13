"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

/* ── SVG Icons ── */
const PlayIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const MaximizeIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>;

export default function VideoStudio() {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const bg = isDark ? "#121212" : "#fafafa";
  const fg = isDark ? "#f4f4f5" : "#18181b";
  const surface = isDark ? "#1e1e1e" : "#ffffff";
  const border = isDark ? "#333333" : "#e4e4e7";
  const accent = "#d4896a";
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => setProgress((video.currentTime / video.duration) * 100);
    const onEnded = () => setIsPlaying(false);
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300" style={{ background: bg, color: fg }}>
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar - Video Settings */}
        <aside className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
          <div className="rounded-3xl p-6 shadow-sm border" style={{ background: surface, borderColor: border }}>
            <h2 className="text-lg font-black mb-6">Video Controls</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-3 block">Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {['16:9', '9:16', '1:1'].map(r => (
                    <button key={r} className={`py-2.5 rounded-xl text-sm font-semibold transition-all border ${r === '16:9' ? 'shadow-sm' : 'opacity-60 hover:opacity-100'}`} style={{ borderColor: border, background: r === '16:9' ? (isDark ? '#27272a' : '#f4f4f5') : 'transparent' }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-3 block">Camera Motion</label>
                <input type="range" className="w-full h-1.5 rounded-full appearance-none bg-black/10 dark:bg-white/10 outline-none" style={{ accentColor: accent }} min="1" max="10" defaultValue="5" />
                <div className="flex justify-between text-[11px] font-semibold opacity-50 mt-2 uppercase">
                  <span>Static</span>
                  <span>Dynamic</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-3 block">Duration</label>
                <div className="flex rounded-xl p-1 border" style={{ background: isDark ? '#18181b' : '#f4f4f5', borderColor: border }}>
                  {['4 Seconds', '8 Seconds'].map((d, i) => (
                    <button key={d} className={`flex-1 py-2 rounded-lg text-[13px] font-bold transition-all ${i === 0 ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`} style={{ background: i === 0 ? surface : 'transparent' }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-2 shadow-sm border flex flex-col relative" style={{ background: surface, borderColor: border }}>
            <textarea 
              placeholder="Describe the cinematic scene..." 
              className="w-full h-36 bg-transparent outline-none resize-none text-[15px] p-4 font-medium placeholder:opacity-40"
            />
            <button className="w-full py-4 rounded-2xl text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95" style={{ background: accent }}>
              Generate Video
            </button>
          </div>
        </aside>

        {/* Right Area - Player & Timeline */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Player Container */}
          <div className="w-full flex-1 rounded-3xl overflow-hidden relative flex items-center justify-center shadow-2xl border" style={{ background: '#000', borderColor: border, minHeight: '500px' }}>
            
            <video 
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              loop
              playsInline
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=675&fit=crop"
            />
            
            {/* Play/Pause Overlay Button */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100 bg-black/20'}`} onClick={togglePlay}>
              <button className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:scale-110 hover:bg-white/30 transition-all shadow-2xl">
                {isPlaying ? <PauseIcon /> : <div className="ml-2"><PlayIcon /></div>}
              </button>
            </div>

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-4">
              {/* Custom Scrubber */}
              <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-white rounded-full relative" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
              </div>
              <div className="flex items-center justify-between text-white">
                <button onClick={togglePlay} className="hover:opacity-80 transition-opacity">
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button className="hover:opacity-80 transition-opacity"><MaximizeIcon /></button>
              </div>
            </div>

          </div>

          {/* Timeline Strip */}
          <div className="h-[140px] rounded-3xl p-5 shadow-sm border flex flex-col justify-between" style={{ background: surface, borderColor: border }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest opacity-50">Timeline</span>
              <span className="text-xs font-bold font-mono opacity-70">00:00:00:00</span>
            </div>
            
            <div className="h-16 w-full rounded-xl relative overflow-hidden flex border" style={{ borderColor: border, background: isDark ? '#18181b' : '#f4f4f5' }}>
              {/* Playhead */}
              <div className="absolute top-0 bottom-0 w-[2px] z-10 shadow-[0_0_10px_rgba(167,139,250,0.8)]" style={{ left: `${progress}%`, background: accent }} />
              
              {/* Mock Thumbnails */}
              <div className="w-full h-full flex opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex-1 border-r h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all" 
                    style={{ borderColor: border, background: `url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&fit=crop) center/cover` }} 
                  />
                ))}
              </div>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
