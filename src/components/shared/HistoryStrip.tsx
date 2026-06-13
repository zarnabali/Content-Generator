"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";

// Extended history with 18 items to test scrollability
const EXTRA_HISTORY = [
  "https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1504199367641-aba8151af406?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop&crop=face",
];

interface HistoryItem { id: number; url: string; }
interface HistoryStripProps { history?: HistoryItem[]; }

export function HistoryStrip({ history }: HistoryStripProps) {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Use prop items + extra items to show scrollability
  const allItems = [
    ...(history ?? []),
    ...EXTRA_HISTORY.filter((_, i) => i >= (history?.length ?? 0)).map((url, i) => ({
      id: (history?.length ?? 0) + i + 1,
      url,
    })),
  ].slice(0, 18);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }
    );
    if (thumbsRef.current) {
      gsap.fromTo(
        Array.from(thumbsRef.current.children),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.04, duration: 0.4, delay: 0.2, ease: "back.out(1.4)" }
      );
    }
  }, []);

  return (
    /* outer: clips the rounded background but NOT the thumbnail hover-scale */
    <div
      ref={containerRef}
      className="w-full rounded-[28px] flex items-center px-3 py-3 relative z-10"
      style={{
        background: isDark ? "#27272a" : "#f2e8e3",
        opacity: 0,
        gap: 0,
      }}
    >
      {/* History Label Card */}
      <button
        onClick={() => router.push("/history")}
        className="flex flex-col items-center justify-center shrink-0 rounded-[20px] cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
        style={{
          background: isDark ? "#3f3f46" : "#ffffff",
          width: 88,
          height: 82,
          marginRight: 12,
        }}
      >
        <span className="text-[13px] font-bold" style={{ color: isDark ? "#fafafa" : "#1a1a1a" }}>
          History
        </span>
        <span
          className="text-[9px] font-semibold uppercase tracking-widest mt-0.5"
          style={{ color: isDark ? "#71717a" : "#9a8a84" }}
        >
          View All
        </span>
      </button>

      {/* Vertical separator */}
      <div
        className="shrink-0"
        style={{
          width: 1,
          height: 36,
          background: isDark ? "#52525b" : "#ddd0ca",
          marginRight: 8,
        }}
      />

      {/* Scrollable thumbnails — overflow-visible so scale pops OUT */}
      <div
        ref={thumbsRef}
        className="flex items-center flex-1"
        style={{
          gap: 10,
          overflowX: "auto",
          overflowY: "visible",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 4,
          scrollbarWidth: "none",
        }}
      >
        {allItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`/history/${item.id}?url=${encodeURIComponent(item.url)}`)}
            className="relative shrink-0 rounded-[14px] overflow-hidden cursor-pointer focus:outline-none"
            style={{
              width: 78,
              height: 78,
              flexShrink: 0,
              transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = "scale(1.20)";
              el.style.boxShadow = "0 10px 28px rgba(0,0,0,0.22)";
              el.style.zIndex = "20";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.transform = "scale(1)";
              el.style.boxShadow = "none";
              el.style.zIndex = "auto";
            }}
          >
            <Image
              src={item.url}
              alt={`History item ${item.id}`}
              fill
              className="object-cover"
              sizes="78px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
