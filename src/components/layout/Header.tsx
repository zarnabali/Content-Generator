"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── SVG Icons ─── */
function HomeIcon({ filled }: { filled?: boolean }) {
  return filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function ImageIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
function VideoIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}
function WandIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M3 21L21 3M9.5 9.5l5 5M14.5 14.5l-5-5" /><path d="M15 4V2m0 20v-2M4 15H2m20 0h-2" />
    </svg>
  );
}
function FolderIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

type NavId = "/" | "/image" | "/video" | "/edit" | "/folder";
const NAV = [
  { id: "/" as NavId, Icon: HomeIcon },
  { id: "/image" as NavId, Icon: ImageIcon },
  { id: "/video" as NavId, Icon: VideoIcon },
  { id: "/edit" as NavId, Icon: WandIcon },
  { id: "/folder" as NavId, Icon: FolderIcon },
];

export function Header() {
  const { theme, toggleTheme } = useAppStore();
  const isDark = theme === "dark";
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }
      );
    }
  }, []);

  const bg = isDark ? "rgba(24,24,27,0.96)" : "rgba(253,249,247,0.96)";
  const border = isDark ? "#3f3f46" : "#e8ddd8";
  const fg = isDark ? "#fafafa" : "#1a1a1a";
  const muted = isDark ? "#71717a" : "#a09090";
  const pillBg = isDark ? "#3f3f46" : "#edddd6";
  const btnBg = isDark ? "#27272a" : "#ffffff";

  return (
    <>
      <header
        ref={headerRef}
        className="w-full z-50 sticky top-0 backdrop-blur-md"
        style={{ background: bg, borderBottom: `1px solid ${border}`, opacity: 0 }}
      >
        <div
          className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 flex items-center justify-between"
          style={{ minHeight: 72 }}
        >
          {/* ── LEFT: Logo & Mobile Toggle ── */}
          <div className="flex-1 basis-0 flex items-center justify-start gap-4">
            <button 
              className="md:hidden p-1 opacity-70 hover:opacity-100" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: fg }}
            >
              <MenuIcon />
            </button>
            <Link
              href="/"
              className="text-[22px] sm:text-[26px] md:text-[30px] font-black leading-none hover:opacity-60 transition-opacity"
              style={{ color: fg }}
            >
              H
            </Link>
          </div>

          {/* ── CENTER: pill ABOVE icons (Hidden on mobile) ── */}
          <div className="hidden md:flex flex-col items-center gap-3 w-full max-w-[500px]">
            {/* Progress pill – wide */}
            <div
              className="rounded-full overflow-hidden w-full"
              style={{ height: 6, background: pillBg }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: "20%", background: "#d4896a" }}
              />
            </div>

            {/* Icons row – spaced out to match pill width */}
            <nav className="flex items-center justify-between w-full px-4">
              {NAV.map(({ id, Icon }) => {
                const active = pathname === id || (id !== "/" && pathname.startsWith(id));
                return (
                  <Link
                    key={id}
                    href={id}
                    className="flex flex-col items-center gap-[5px] group cursor-pointer"
                    aria-label={id}
                  >
                    <span
                      className="transition-colors duration-200 group-hover:opacity-75"
                      style={{ color: active ? fg : muted }}
                    >
                      <Icon filled={active} />
                    </span>
                    <span
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: 5,
                        height: 5,
                        background: active ? fg : "transparent",
                      }}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ── RIGHT: Actions ── */}
          <div className="flex-1 basis-0 flex items-center justify-end gap-2 sm:gap-3">
            <button
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-[11.5px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
              style={{ background: btnBg, color: fg, border: `1px solid ${border}` }}
            >
              <GlobeIcon /> Gallery
            </button>
            <button
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-[11.5px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
              style={{ background: btnBg, color: fg, border: `1px solid ${border}` }}
            >
              <HelpIcon /> Support
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-90"
              style={{ color: isDark ? "#d4896a" : muted }}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className="w-8 h-8 rounded-full overflow-hidden shrink-0 cursor-pointer hover:scale-110 transition-transform active:scale-95"
              style={{ border: `2px solid ${border}` }}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 top-[72px] bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full border-b flex flex-col p-4 gap-2 shadow-2xl animate-in slide-in-from-top-2"
            style={{ background: bg, borderColor: border }}
            onClick={e => e.stopPropagation()}
          >
            {NAV.map(({ id, Icon }) => {
              const active = pathname === id || (id !== "/" && pathname.startsWith(id));
              return (
                <Link
                  key={id}
                  href={id}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active ? "bg-[#d4896a]/10 font-bold" : "font-medium opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  style={{ color: active ? "#d4896a" : fg }}
                >
                  <Icon filled={active} />
                  <span className="capitalize text-[15px]">
                    {id === '/' ? 'Home' : id.replace('/', '')}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
