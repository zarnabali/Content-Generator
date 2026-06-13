"use client";

import { use, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import gsap from "gsap";

const ALL_HISTORY: Record<string, { url: string; prompt: string; date: string; model: string }> = {
  "1":  { url: "https://images.unsplash.com/photo-1523264653568-d3d4032d1476", prompt: "A warm portrait of a woman in soft golden lighting, wearing a cream sweater with delicate earrings. Natural expression, bokeh background.", date: "June 12, 2026", model: "Portrait Pro v2" },
  "2":  { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", prompt: "Mountain landscape at sunrise with morning mist rolling over the peaks. Ultra-wide cinematic view.", date: "June 11, 2026", model: "Landscape XL" },
  "3":  { url: "https://images.unsplash.com/photo-1448375240586-882707db888b", prompt: "Dense enchanted forest with golden rays of light filtering through the canopy. Magical atmosphere.", date: "June 11, 2026", model: "Nature v1" },
  "4":  { url: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241", prompt: "Studio portrait with dramatic split lighting. High contrast black and white.", date: "June 10, 2026", model: "Portrait Pro v2" },
  "5":  { url: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586", prompt: "Portrait of a young man in contemporary street fashion, urban background with bokeh.", date: "June 10, 2026", model: "Portrait Pro v2" },
  "6":  { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", prompt: "Close-up portrait with shallow depth of field, soft background blur.", date: "June 9, 2026", model: "Portrait Pro v2" },
  "7":  { url: "https://images.unsplash.com/photo-1519741497674-611481863552", prompt: "Wedding portrait in golden hour light, romantic atmosphere.", date: "June 9, 2026", model: "Portrait Pro v2" },
  "8":  { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", prompt: "Elegant high-fashion portrait in a studio setting with professional lighting.", date: "June 8, 2026", model: "Fashion v3" },
  "9":  { url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", prompt: "Natural light portrait against a clean white wall, minimalist composition.", date: "June 8, 2026", model: "Portrait Pro v2" },
  "10": { url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", prompt: "Casual lifestyle portrait in warm natural outdoor light.", date: "June 7, 2026", model: "Portrait Pro v2" },
  "11": { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9", prompt: "Outdoor portrait at golden hour, warm tones and natural expression.", date: "June 7, 2026", model: "Portrait Pro v2" },
  "12": { url: "https://images.unsplash.com/photo-1557862921-37829c790f19", prompt: "Professional corporate headshot with clean background.", date: "June 6, 2026", model: "Business v1" },
  "13": { url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", prompt: "Portrait of a woman smiling naturally in soft light.", date: "June 6, 2026", model: "Portrait Pro v2" },
  "14": { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", prompt: "Artistic portrait with high-end retouching and dramatic shadows.", date: "June 5, 2026", model: "Artistic v2" },
  "15": { url: "https://images.unsplash.com/photo-1504199367641-aba8151af406", prompt: "Thoughtful man gazing through a window in natural side light.", date: "June 5, 2026", model: "Portrait Pro v2" },
  "16": { url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", prompt: "Confident man in an urban setting, street photography style.", date: "June 4, 2026", model: "Street v1" },
  "17": { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", prompt: "Casual male portrait outdoors with natural lighting.", date: "June 4, 2026", model: "Portrait Pro v2" },
  "18": { url: "https://images.unsplash.com/photo-1552058544-f2b08422138a", prompt: "Bold artistic portrait with vivid background colors.", date: "June 3, 2026", model: "Artistic v2" },
};

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HistoryDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const item = ALL_HISTORY[id];

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );
    }
  }, []);

  const bg = isDark ? "#18181b" : "#fdf9f7";
  const cardBg = isDark ? "#27272a" : "#ffffff";
  const fg = isDark ? "#fafafa" : "#1a1a1a";
  const muted = isDark ? "#71717a" : "#9a8a84";
  const border = isDark ? "#3f3f46" : "#e8ddd8";
  const surface = isDark ? "#27272a" : "#f2e8e3";
  const pillBg = isDark ? "#3f3f46" : "#f2e8e3";

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: bg, color: fg }}>
        <p className="text-lg font-semibold">Image not found</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer transition-all hover:shadow-md active:scale-95"
          style={{ background: "#d4896a", color: "#fff" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrl = `${item.url}?w=1200&h=1600&fit=crop&crop=face`;

  return (
    <div className="min-h-screen" style={{ background: bg, color: fg }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between"
        style={{ background: isDark ? "rgba(24,24,27,0.95)" : "rgba(253,249,247,0.95)", borderBottom: `1px solid ${border}` }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
          style={{ background: cardBg, color: fg, border: `1px solid ${border}` }}
        >
          <BackIcon /> Back
        </button>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
            style={{ background: cardBg, color: fg, border: `1px solid ${border}` }}
          >
            <ShareIcon /> Share
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95"
            style={{ background: "#d4896a", color: "#fff", boxShadow: "0 4px 16px rgba(212,137,106,0.35)" }}
          >
            <DownloadIcon /> Download
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-[1100px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">

        {/* Image */}
        <div
          className="relative w-full lg:w-[420px] xl:w-[480px] shrink-0 rounded-[28px] overflow-hidden"
          style={{ aspectRatio: "3/4", boxShadow: "0 12px 48px rgba(0,0,0,0.12)" }}
        >
          <Image
            src={imageUrl}
            alt={item.prompt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority
            unoptimized
          />
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Date & model */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="px-4 py-1.5 rounded-full text-[12px] font-semibold"
              style={{ background: pillBg, color: fg }}
            >
              {item.date}
            </span>
            <span
              className="px-4 py-1.5 rounded-full text-[12px] font-semibold"
              style={{ background: "#d4896a20", color: "#d4896a" }}
            >
              {item.model}
            </span>
          </div>

          {/* Prompt */}
          <div
            className="rounded-[22px] p-6"
            style={{ background: surface }}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: muted }}>
              Prompt Used
            </p>
            <p className="text-[14px] leading-[1.8]" style={{ color: fg }}>
              {item.prompt}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/")}
              className="w-full py-3.5 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
              style={{ background: "#d4896a", color: "#fff", boxShadow: "0 4px 18px rgba(212,137,106,0.30)" }}
            >
              ✦ Re-Generate with this Prompt
            </button>
            <button
              className="w-full py-3.5 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
              style={{ background: cardBg, color: fg, border: `1px solid ${border}` }}
            >
              Edit Prompt & Generate
            </button>
          </div>

          {/* Meta */}
          <div
            className="rounded-[18px] p-5 text-[12px] leading-loose"
            style={{ background: cardBg, border: `1px solid ${border}` }}
          >
            <p className="font-bold mb-2" style={{ color: fg }}>Generation Details</p>
            <div className="grid grid-cols-2 gap-x-4" style={{ color: muted }}>
              <span>Resolution</span><span className="font-medium" style={{ color: fg }}>1024 × 1024</span>
              <span>Steps</span><span className="font-medium" style={{ color: fg }}>30</span>
              <span>Guidance</span><span className="font-medium" style={{ color: fg }}>7.5</span>
              <span>Quality</span><span className="font-medium" style={{ color: fg }}>HD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
