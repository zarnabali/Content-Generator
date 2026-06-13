"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import gsap from "gsap";
import { useRef } from "react";

// Full history data
const ALL_HISTORY = [
  { id: 1,  url: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476", prompt: "A warm portrait of a woman in soft golden lighting.", date: "June 12, 2026" },
  { id: 2,  url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", prompt: "Mountain landscape at sunrise with mist.", date: "June 11, 2026" },
  { id: 3,  url: "https://images.unsplash.com/photo-1448375240586-882707db888b", prompt: "Dense forest with rays of light filtering through.", date: "June 11, 2026" },
  { id: 4,  url: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241", prompt: "Studio portrait with dramatic shadows.", date: "June 10, 2026" },
  { id: 5,  url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586", prompt: "Portrait of a young man in street fashion.", date: "June 10, 2026" },
  { id: 6,  url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", prompt: "Close-up portrait with bokeh background.", date: "June 9, 2026" },
  { id: 7,  url: "https://images.unsplash.com/photo-1519741497674-611481863552", prompt: "Wedding portrait in golden hour light.", date: "June 9, 2026" },
  { id: 8,  url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", prompt: "Elegant fashion portrait in studio.", date: "June 8, 2026" },
  { id: 9,  url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", prompt: "Natural light portrait against white wall.", date: "June 8, 2026" },
  { id: 10, url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", prompt: "Lifestyle portrait in casual clothes.", date: "June 7, 2026" },
  { id: 11, url: "https://images.unsplash.com/photo-1517841905240-472988babdf9", prompt: "Outdoor portrait at golden hour.", date: "June 7, 2026" },
  { id: 12, url: "https://images.unsplash.com/photo-1557862921-37829c790f19", prompt: "Professional corporate headshot.", date: "June 6, 2026" },
  { id: 13, url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", prompt: "Portrait of a woman smiling naturally.", date: "June 6, 2026" },
  { id: 14, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", prompt: "Artistic black-and-white portrait.", date: "June 5, 2026" },
  { id: 15, url: "https://images.unsplash.com/photo-1504199367641-aba8151af406", prompt: "Thoughtful man in window light.", date: "June 5, 2026" },
  { id: 16, url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", prompt: "Confident man in urban setting.", date: "June 4, 2026" },
  { id: 17, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", prompt: "Casual male portrait outdoors.", date: "June 4, 2026" },
  { id: 18, url: "https://images.unsplash.com/photo-1552058544-f2b08422138a", prompt: "Bold portrait with vivid background.", date: "June 3, 2026" },
];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default function HistoryPage() {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { y: 24, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const bg = isDark ? "#18181b" : "#fdf9f7";
  const cardBg = isDark ? "#27272a" : "#ffffff";
  const fg = isDark ? "#fafafa" : "#1a1a1a";
  const muted = isDark ? "#71717a" : "#9a8a84";
  const border = isDark ? "#3f3f46" : "#e8ddd8";
  const surface = isDark ? "#27272a" : "#f2e8e3";

  return (
    <div className="min-h-screen" style={{ background: bg, color: fg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center gap-4"
        style={{ background: isDark ? "rgba(24,24,27,0.95)" : "rgba(253,249,247,0.95)", borderBottom: `1px solid ${border}` }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
          style={{ background: cardBg, color: fg, border: `1px solid ${border}` }}
        >
          <BackIcon /> Back
        </button>
        <div>
          <h1 className="text-[20px] font-bold" style={{ color: fg }}>Generation History</h1>
          <p className="text-[12px] mt-0.5" style={{ color: muted }}>{ALL_HISTORY.length} generations</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
          {ALL_HISTORY.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(`/history/${item.id}?url=${encodeURIComponent(item.url)}`)}
              className="group flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 text-left"
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <div
                className="relative w-full rounded-[18px] overflow-hidden"
                style={{
                  aspectRatio: "1/1",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  transition: "box-shadow 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04) translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.14)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.07)";
                }}
              >
                <Image
                  src={`${item.url}?w=300&h=300&fit=crop&crop=face`}
                  alt={item.prompt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  unoptimized
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="mt-2 px-1">
                <p className="text-[11px] font-medium line-clamp-2 leading-snug" style={{ color: muted }}>
                  {item.date}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
