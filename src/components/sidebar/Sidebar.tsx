"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import gsap from "gsap";

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
      <path d="M5 5l.67 2 2 .67-2 .67L5 10l-.67-2-2-.67 2-.67z" opacity=".6" />
      <path d="M19 14l.67 2 2 .67-2 .67L19 19l-.67-2-2-.67 2-.67z" opacity=".6" />
    </svg>
  );
}

export function Sidebar() {
  const { mode, setMode, prompt, setPrompt, isGenerating, setGenerating, theme } = useAppStore();
  const isDark = theme === "dark";
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [advOpen, setAdvOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, delay: 0.1, ease: "power3.out" }
      );
    }
  }, []);

  const handleGenerate = () => {
    if (isGenerating || !prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  const bg = isDark ? "#27272a" : "#f2e8e3";
  const cardBg = isDark ? "#3f3f46" : "#ffffff";
  const borderColor = isDark ? "#52525b" : "#e8ddd8";
  const textColor = isDark ? "#fafafa" : "#1a1a1a";
  const mutedColor = isDark ? "#71717a" : "#9a8a84";
  const surfaceBg = isDark ? "#1c1c1f" : "#faf5f2";

  return (
    <div
      ref={sidebarRef}
      className="w-full flex flex-col gap-4 rounded-[28px] p-5 transition-colors duration-300"
      style={{ background: bg, opacity: 0 }}
    >
      {/* Image / Video Toggle */}
      <div
        className="flex rounded-full p-1 gap-1"
        style={{ background: surfaceBg }}
      >
        {(["Image", "Video"] as const).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-250 cursor-pointer active:scale-95"
              style={{
                background: active ? cardBg : "transparent",
                color: active ? textColor : mutedColor,
                boxShadow: active ? "0 1px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {m}
            </button>
          );
        })}
      </div>

      {/* Prompt Textarea Card */}
      <div
        className="relative flex flex-col rounded-[22px] overflow-hidden transition-all duration-300"
        style={{
          background: cardBg,
          border: `1.5px solid ${borderColor}`,
        }}
      >
        <textarea
          className="w-full min-h-[188px] resize-none bg-transparent p-5 pb-16 text-[13px] leading-relaxed outline-none placeholder:opacity-60"
          style={{ color: textColor }}
          placeholder="Describe you imaginations to be converted to piece of art ...."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {/* Generate button inside card, bottom-right */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-bold cursor-pointer transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #d4896a 0%, #c07a5a 100%)",
              boxShadow: "0 4px 20px rgba(212,137,106,0.38)",
            }}
          >
            <SparklesIcon />
            {isGenerating ? "Generating…" : "Generate"}
          </button>
        </div>
      </div>

      {/* Dropdowns Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { label: "# Images" },
          { label: "1:1" },
          { label: <>Model: <strong>Name</strong></> },
        ].map((d, i) => (
          <button
            key={i}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95 whitespace-nowrap"
            style={{
              background: cardBg,
              color: textColor,
              border: `1px solid ${borderColor}`,
            }}
          >
            {d.label} <ChevronDown />
          </button>
        ))}
      </div>

      {/* Advance Accordion */}
      <div className="flex flex-col gap-0">
        <button
          onClick={() => setAdvOpen((v) => !v)}
          className="flex items-center justify-between px-6 py-3.5 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          style={{ background: cardBg, color: textColor, border: `1px solid ${borderColor}` }}
        >
          <span>Advance</span>
          <span style={{ display: "inline-flex", transform: advOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
            <ChevronDown />
          </span>
        </button>
        {advOpen && (
          <div
            className="mt-2 px-5 py-4 rounded-[20px] text-[12px] flex flex-col gap-3"
            style={{ background: cardBg, border: `1px solid ${borderColor}`, color: textColor }}
          >
            <label className="flex items-center justify-between gap-2">
              <span className="font-medium">Quality</span>
              <select
                className="text-[11px] rounded-full px-3 py-1.5 outline-none cursor-pointer"
                style={{ background: surfaceBg, color: textColor, border: `1px solid ${borderColor}` }}
              >
                <option>Standard</option>
                <option>HD</option>
                <option>Ultra HD</option>
              </select>
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="font-medium">Steps</span>
              <input type="range" min="10" max="50" defaultValue="30" className="w-28 cursor-pointer" style={{ accentColor: "#d4896a" }} />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="font-medium">Guidance</span>
              <input type="range" min="1" max="20" defaultValue="7" className="w-28 cursor-pointer" style={{ accentColor: "#d4896a" }} />
            </label>
          </div>
        )}
      </div>

      {/* Styles Accordion */}
      <div className="flex flex-col gap-0">
        <button
          onClick={() => setStyleOpen((v) => !v)}
          className="flex items-center justify-between px-6 py-3.5 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          style={{ background: cardBg, color: textColor, border: `1px solid ${borderColor}` }}
        >
          <span>Styles</span>
          <span style={{ display: "inline-flex", transform: styleOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
            <ChevronDown />
          </span>
        </button>
        {styleOpen && (
          <div
            className="mt-2 px-4 py-4 rounded-[20px]"
            style={{ background: cardBg, border: `1px solid ${borderColor}` }}
          >
            <p className="text-[11px] font-bold mb-3 uppercase tracking-wider" style={{ color: mutedColor }}>
              Style Presets
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["Realistic", "Anime", "Oil Paint", "Watercolor", "Sketch", "3D Render"].map((s) => {
                const selected = selectedStyle === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSelectedStyle(selected ? "" : s)}
                    className="py-2 rounded-full text-[10px] font-semibold cursor-pointer transition-all duration-200 active:scale-95"
                    style={{
                      background: selected ? "#d4896a" : surfaceBg,
                      color: selected ? "#fff" : textColor,
                      border: `1px solid ${selected ? "#d4896a" : borderColor}`,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
