"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";

/* ── Custom Professional SVG Icons ── */
const FolderIcon = ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
const ImageIcon = ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const VideoIcon = ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
const StarIcon = ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const TrashIcon = ({ filled }: { filled?: boolean }) => <svg viewBox="0 0 24 24" width="20" height="20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const FilterIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;

const ASSETS = [
  { id: 1, type: 'image', url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop", name: "Project_Alpha_Main.png", date: "Today", size: "2.4 MB" },
  { id: 2, type: 'video', url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=600&fit=crop", name: "Cinematic_Pan_01.mp4", date: "Today", size: "14.2 MB", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, type: 'image', url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop", name: "Character_Concept.png", date: "Yesterday", size: "1.8 MB" },
  { id: 4, type: 'image', url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop", name: "Fashion_Shoot_RAW.png", date: "Yesterday", size: "3.1 MB" },
  { id: 5, type: 'image', url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop", name: "Lighting_Test_A.png", date: "Last Week", size: "2.0 MB" },
  { id: 6, type: 'video', url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=600&fit=crop", name: "Motion_Study_Cat.mp4", date: "Last Week", size: "8.5 MB", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function FolderManager() {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const bg = isDark ? "#121212" : "#fafafa";
  const fg = isDark ? "#f4f4f5" : "#18181b";
  const surface = isDark ? "#1e1e1e" : "#ffffff";
  const border = isDark ? "#333333" : "#e4e4e7";
  const accent = "#d4896a"; // Premium Theme Accent

  const [activeFolder, setActiveFolder] = useState('All Files');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getIcon = (name: string, active: boolean) => {
    switch(name) {
      case 'All Files': return <FolderIcon filled={active} />;
      case 'Images': return <ImageIcon filled={active} />;
      case 'Videos': return <VideoIcon filled={active} />;
      case 'Starred': return <StarIcon filled={active} />;
      case 'Trash': return <TrashIcon filled={active} />;
      default: return <FolderIcon filled={active} />;
    }
  };

  const renderSidebarContent = () => (
    <>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-widest opacity-40 mb-3 px-3">Location</h2>
          <div className="flex flex-col gap-0.5">
            {['All Files', 'Images', 'Videos'].map((folder) => {
              const active = activeFolder === folder;
              return (
                <button
                  key={folder}
                  onClick={() => { setActiveFolder(folder); setMobileSidebarOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[14px] font-semibold ${active ? 'bg-[#d4896a]/10 text-[#d4896a]' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'}`}
                >
                  {getIcon(folder, active)}
                  {folder}
                </button>
              )
            })}
          </div>
        </div>
        
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-widest opacity-40 mb-3 px-3">Filter</h2>
          <div className="flex flex-col gap-0.5">
            {['Starred', 'Trash'].map((folder) => {
              const active = activeFolder === folder;
              return (
                <button
                  key={folder}
                  onClick={() => { setActiveFolder(folder); setMobileSidebarOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[14px] font-semibold ${active ? 'bg-[#d4896a]/10 text-[#d4896a]' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'}`}
                >
                  {getIcon(folder, active)}
                  {folder}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Storage Meter at bottom */}
      <div className="p-5 border-t" style={{ borderColor: border }}>
        <div className="flex items-center justify-between text-xs font-bold mb-3">
          <span className="opacity-70 flex items-center gap-2"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Storage</span>
          <span className="text-[#d4896a]">85%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10">
          <div className="h-full rounded-full" style={{ width: '85%', background: accent }} />
        </div>
        <div className="text-[10px] opacity-50 mt-2 font-medium tracking-wide">85.4 GB of 100 GB used</div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] transition-colors duration-300 overflow-hidden" style={{ background: bg, color: fg }}>
      
      {/* Top Breadcrumb Bar */}
      <div className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b z-20" style={{ background: surface, borderColor: border }}>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <button className="md:hidden p-1 mr-1 rounded opacity-70 hover:opacity-100" onClick={() => setMobileSidebarOpen(true)}>
             <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <span className="hidden sm:inline opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Workspace</span>
          <span className="hidden sm:inline opacity-30">/</span>
          <span className="truncate max-w-[100px] sm:max-w-none">{activeFolder}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
          <div className="relative group w-full max-w-[200px] sm:max-w-xs">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 sm:py-2 w-full rounded-full text-sm outline-none transition-all focus:ring-2 focus:ring-[#d4896a]/50"
              style={{ background: isDark ? '#27272a' : '#f4f4f5', color: fg }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-80 transition-opacity">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
          </div>
          <button className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] sm:text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 whitespace-nowrap" style={{ background: accent }}>
            + New
          </button>
        </div>
      </div>

      <main className="flex-1 w-full flex overflow-hidden flex-col md:flex-row relative">
        
        {/* Left Sidebar - Desktop */}
        <aside className="hidden md:flex w-[260px] shrink-0 flex-col border-r shadow-sm relative" style={{ background: isDark ? '#18181b' : '#fdfdfd', borderColor: border }}>
          {renderSidebarContent()}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)}>
            <div 
              className="absolute top-0 bottom-0 left-0 w-[260px] shadow-2xl flex flex-col border-r animate-in slide-in-from-left-full"
              style={{ background: isDark ? '#18181b' : '#fdfdfd', borderColor: border }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderSidebarContent()}
            </div>
          </div>
        )}

        {/* Right Area - Asset Manager */}
        <section className="flex-1 flex flex-col min-w-0 bg-transparent relative">
          
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth pb-32">
            
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-[#d4896a]">{activeFolder}</h2>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: border }}>
                <FilterIcon /> <span className="hidden sm:inline">Filter</span>
              </button>
            </div>

            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {ASSETS.filter(a => activeFolder === 'All Files' || activeFolder === 'Starred' || (activeFolder === 'Images' && a.type === 'image') || (activeFolder === 'Videos' && a.type === 'video')).map((asset) => (
                <AssetCard key={asset.id} asset={asset} border={border} surface={surface} isDark={isDark} />
              ))}
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

function AssetCard({ asset, border, surface, isDark }: { asset: any, border: string, surface: string, isDark: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col gap-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-full rounded-[24px] overflow-hidden shadow-sm transition-all duration-500 border group-hover:shadow-xl group-hover:-translate-y-1"
        style={{ aspectRatio: "1/1", background: surface, borderColor: isHovered ? (isDark ? '#555' : '#ccc') : border }}
      >
        {asset.type === 'video' && isHovered && asset.videoUrl ? (
          <video 
            src={asset.videoUrl} 
            autoPlay 
            loop 
            muted 
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        ) : (
          <Image 
            src={asset.url}
            alt={asset.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        )}
        
        {/* Top-left Type Badge */}
        <div className="absolute top-4 left-4 z-20">
          <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center text-white shadow-md border border-white/10">
            {asset.type === 'video' ? <VideoIcon /> : <ImageIcon />}
          </div>
        </div>

        {/* Hover Context Actions overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 translate-x-2 group-hover:translate-x-0">
          <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 15l-4-4h3V4h2v7h3l-4 4zm7-2v6H5v-6H3v8h18v-8h-2z"/></svg>
          </button>
        </div>
      </div>

      {/* Info Below Card */}
      <div className="px-1">
        <h3 className="text-[13px] font-bold truncate group-hover:text-[#d4896a] transition-colors">{asset.name}</h3>
        <div className="flex items-center justify-between mt-1 text-[11px] opacity-50 font-semibold uppercase tracking-wider">
          <span>{asset.date}</span>
          <span>{asset.size}</span>
        </div>
      </div>
    </div>
  );
}
