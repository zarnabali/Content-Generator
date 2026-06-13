"use client";

import React, { useEffect, useState } from "react";
import { HistoryStrip } from "@/components/shared/HistoryStrip";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { useAppStore } from "@/store/useAppStore";

interface ContentData {
  history: { id: number; url: string }[];
  gallery: { id: string; url: string }[];
  prompt: string;
}

export default function Home() {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const [data, setData] = useState<ContentData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setError(true));
  }, []);

  return (
    <div
      className="flex flex-col transition-colors duration-300 min-h-screen"
      style={{ background: isDark ? "#18181b" : "#fdf9f7" }}
    >
      {/* ── Page body ── */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12 flex flex-col gap-5">

        {/* Loading */}
        {!data && !error && (
          <div className="flex-1 flex items-center justify-center min-h-[60vh]">
            <div
              className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: "#d4896a", borderTopColor: "transparent" }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex-1 flex items-center justify-center min-h-[60vh] text-sm" style={{ color: "#9a8a84" }}>
            Failed to load content. Please refresh the page.
          </div>
        )}

        {data && (
          <>
            {/* ── History Strip: full width, above everything ── */}
            <HistoryStrip history={data.history} />

            {/* ── Content: Sidebar LEFT + Gallery RIGHT ── */}
            <div className="flex flex-col lg:flex-row gap-5 w-full">
              {/* Sidebar */}
              <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0">
                <Sidebar />
              </aside>

              {/* Gallery */}
              <section className="flex-1 min-w-0" style={{ marginTop: "-76px" }}>
                <GalleryGrid images={data.gallery} prompt={data.prompt} />
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
