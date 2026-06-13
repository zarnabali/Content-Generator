"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";

/* ── SVG Icons ── */
const UndoIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>;
const RedoIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/></svg>;
const ZoomInIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const CursorIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>;
const BrushIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>;
const MagicIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>;
const CropIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"/><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"/></svg>;
const EraserIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20V20Z"/><path d="M17 6L20 9"/></svg>;

export default function CanvasEditor() {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const bg = isDark ? "#0a0a0a" : "#f4f4f5";
  const fg = isDark ? "#f4f4f5" : "#18181b";
  const surface = isDark ? "#18181b" : "#ffffff";
  const border = isDark ? "#27272a" : "#e4e4e7";
  const accent = "#d4896a"; // Consistent brand accent
  
  const [activeTool, setActiveTool] = useState('Brush');
  const [activeTab, setActiveTab] = useState('Adjust');

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] overflow-hidden transition-colors duration-300" style={{ background: bg, color: fg }}>
      
      {/* Top Toolbar */}
      <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b z-20 shadow-sm" style={{ background: surface, borderColor: border }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 opacity-60">
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"><UndoIcon /></button>
            <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"><RedoIcon /></button>
          </div>
          <div className="w-px h-6 bg-black/10 dark:bg-white/10" />
          <div className="text-[13px] font-semibold opacity-50 flex items-center gap-2">
            <span>Untitled_Artwork_01.png</span>
            <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded">1280 x 720</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold opacity-70 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <ZoomInIcon /> 100%
          </div>
          <button className="px-5 py-2 rounded-full text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: accent }}>
            Export
          </button>
        </div>
      </div>

      <main className="flex-1 w-full flex overflow-hidden relative">
        
        {/* Left Floating Tools */}
        <div className="absolute left-6 top-6 bottom-6 w-14 flex flex-col items-center py-4 rounded-2xl shadow-2xl z-20 backdrop-blur-xl border" style={{ background: isDark ? 'rgba(24,24,27,0.8)' : 'rgba(255,255,255,0.8)', borderColor: border }}>
          
          <div className="flex flex-col gap-2 w-full px-2">
            {[
              { id: 'Cursor', Icon: CursorIcon },
              { id: 'Brush', Icon: BrushIcon },
              { id: 'Eraser', Icon: EraserIcon },
              { id: 'Magic', Icon: MagicIcon },
              { id: 'Crop', Icon: CropIcon },
            ].map((tool) => (
              <button 
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${activeTool === tool.id ? 'bg-[#d4896a] text-white shadow-md shadow-[#d4896a]/20' : 'opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'}`}
                title={tool.id}
              >
                <tool.Icon />
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col items-center gap-4 w-full px-2">
            <div className="w-8 h-8 rounded-full shadow-inner border-2 border-white cursor-pointer" style={{ background: accent }} title="Primary Color" />
            <div className="w-8 h-8 rounded-full shadow-inner border-2 border-white cursor-pointer -mt-6 ml-4" style={{ background: '#000000' }} title="Secondary Color" />
          </div>

        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-auto cursor-crosshair">
          {/* Subtle Grid Pattern Background */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          {/* Main Artboard */}
          <div className="relative shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.01] bg-white border" style={{ width: 800, height: 500, borderColor: border }}>
            <Image 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600&h=1000&fit=crop"
              alt="Artboard"
              fill
              className="object-cover"
              unoptimized
            />
            {/* Mock Magic Masking Selection */}
            {activeTool === 'Magic' && (
              <div className="absolute top-[20%] left-[30%] w-[40%] h-[50%] border-2 border-dashed border-[#d4896a] animate-pulse bg-[#d4896a]/10 rounded-3xl mix-blend-overlay" />
            )}
            {/* Mock Brush Hover */}
            {activeTool === 'Brush' && (
              <div className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 border border-white/50 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.5)] pointer-events-none mix-blend-difference" />
            )}
          </div>
        </div>

        {/* Right Properties Panel */}
        <div className="w-[340px] shrink-0 flex flex-col z-20 shadow-2xl border-l" style={{ background: surface, borderColor: border }}>
          
          {/* Tabs */}
          <div className="flex px-2 pt-2 border-b" style={{ borderColor: border }}>
            {['Adjust', 'Layers', 'Generate'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-[#d4896a] border-b-2 border-[#d4896a]' : 'opacity-40 hover:opacity-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
            
            {activeTab === 'Adjust' && (
              <>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest opacity-50 mb-4">Color Adjustments</h3>
                  <div className="space-y-6">
                    {['Brightness', 'Contrast', 'Saturation', 'Warmth'].map((slider, i) => (
                      <div key={slider}>
                        <div className="flex justify-between text-[11px] font-bold mb-2">
                          <span className="opacity-70">{slider}</span>
                          <span className="opacity-40 font-mono">{i === 1 ? '12' : i === 2 ? '-5' : '0'}</span>
                        </div>
                        <input type="range" className="w-full h-1.5 rounded-full appearance-none outline-none" style={{ background: isDark ? '#27272a' : '#e4e4e7', accentColor: fg }} min="-100" max="100" defaultValue={i === 1 ? "12" : i === 2 ? "-5" : "0"} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: border }} />

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest opacity-50 mb-4">Details</h3>
                  <div className="space-y-6">
                    {['Sharpness', 'Clarity', 'Vignette'].map((slider, i) => (
                      <div key={slider}>
                        <div className="flex justify-between text-[11px] font-bold mb-2">
                          <span className="opacity-70">{slider}</span>
                          <span className="opacity-40 font-mono">{i === 0 ? '25' : '0'}</span>
                        </div>
                        <input type="range" className="w-full h-1.5 rounded-full appearance-none outline-none" style={{ background: isDark ? '#27272a' : '#e4e4e7', accentColor: fg }} min="-100" max="100" defaultValue={i === 0 ? "25" : "0"} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Layers' && (
              <div className="flex flex-col gap-2">
                {[
                  { name: "Magic Fill: Pink Sweater", blend: "Normal", active: true, visible: true },
                  { name: "Hue/Saturation 1", blend: "Color", active: false, visible: true },
                  { name: "Background Layer", blend: "Normal", active: false, visible: true }
                ].map((layer, i) => (
                  <div key={i} className={`flex flex-col gap-2 p-3 rounded-2xl cursor-pointer transition-all border ${layer.active ? 'shadow-md border-[#d4896a]/50' : 'opacity-70 hover:opacity-100 border-transparent hover:border-black/10 dark:hover:border-white/10'}`} style={{ background: layer.active ? (isDark ? '#27272a' : '#f4f4f5') : 'transparent' }}>
                    <div className="flex items-center gap-3">
                      <button className={`opacity-50 hover:opacity-100 ${layer.visible ? 'text-[#d4896a]' : ''}`}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 shrink-0 border border-black/10 dark:border-white/10 relative overflow-hidden">
                        {i === 2 && <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="thumb" fill className="object-cover" unoptimized />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">{layer.name}</div>
                        <div className="text-[10px] opacity-50 uppercase tracking-widest">{layer.blend} • 100%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'Generate' && (
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#d4896a]/10 to-transparent border border-[#d4896a]/20">
                  <h3 className="text-[13px] font-black mb-2 text-[#d4896a] flex items-center gap-2"><MagicIcon /> Generative Fill</h3>
                  <p className="text-xs opacity-70 mb-4 leading-relaxed">Use the Magic tool to select an area, then describe what you want to generate inside it.</p>
                  <textarea 
                    className="w-full h-24 rounded-xl p-3 text-sm resize-none shadow-inner outline-none transition-all focus:ring-2 focus:ring-[#d4896a]/50 placeholder:opacity-40"
                    style={{ background: isDark ? "#121212" : "#ffffff", border: `1px solid ${border}` }}
                    placeholder="e.g. A futuristic neon glowing necklace..."
                  />
                  <button className="w-full mt-3 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95" style={{ background: accent }}>
                    Generate
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </main>
    </div>
  );
}
