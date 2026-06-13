"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useAppStore } from "@/store/useAppStore";

interface GalleryImage { id: string; url: string; }

interface GalleryGridProps {
  images: GalleryImage[];
  prompt: string;
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function GalleryCard({ img }: { img: GalleryImage }) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer overflow-hidden"
      style={{
        borderRadius: 22,
        aspectRatio: "3/4",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
      }}
    >
      <Image
        src={img.url}
        alt="Generated image"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-all duration-400" />
      {/* Download button */}
      <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          <DownloadIcon />
        </div>
      </div>
    </div>
  );
}

export function GalleryGrid({ images, prompt }: GalleryGridProps) {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.6, delay: 0.25, ease: "power3.out" }
    );
  }, [images]);

  const topImages = images.slice(0, 5);
  const remainingImages = images.slice(5);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full"
    >
      {/* First 5 images (Row 1) */}
      {topImages.map((img) => (
        <GalleryCard key={img.id} img={img} />
      ))}

      {/* 6th item: Prompt card (Row 2 Col 1) */}
      <div
        className="flex flex-col justify-between rounded-[22px] p-5 cursor-text overflow-hidden"
        style={{
          background: isDark ? "#27272a" : "#f2e8e3",
          aspectRatio: "3/4",
        }}
      >
        <p
          className="text-[12.5px] leading-[1.78] font-normal overflow-hidden"
          style={{ color: isDark ? "#d4d4d8" : "#3d3028" }}
        >
          {prompt}
        </p>
        <div className="flex justify-end mt-3">
          <button
            className="px-4 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95"
            style={{
              background: isDark ? "#3f3f46" : "#ffffff",
              color: isDark ? "#fafafa" : "#1a1a1a",
              border: `1px solid ${isDark ? "#52525b" : "#e8ddd8"}`,
            }}
          >
            Model
          </button>
        </div>
      </div>

      {/* Remaining images */}
      {remainingImages.map((img) => (
        <GalleryCard key={img.id} img={img} />
      ))}
    </div>
  );
}
