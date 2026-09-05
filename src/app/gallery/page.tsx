"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { galleryItems, GalleryItem } from "@/data/galleryData";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import { Sparkles, Tag, Calendar, Eye, ZoomIn } from "lucide-react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = ["All", "Competitions", "Workshops", "Hardware Labs", "Team & Events"];

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VISUAL CHRONICLES & LAB MEMORIES</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          ACTIVITY <span className="text-cyan-400">GALLERY</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Explore high-resolution moments from our national robotics battles, hardware fabrication clinics, sensor calibration sessions, and award ceremonies.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? "bg-cyan-400 text-cyan-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            {cat} {cat === "All" ? `(${galleryItems.length})` : ""}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className="cyber-panel rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/70 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-slate-950 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-transparent"></div>

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded bg-black/75 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              {/* Hover Zoom Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-950/40 backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-cyan-400 text-cyan-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                  <ZoomIn className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Caption Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-tech text-base sm:text-lg font-bold text-white uppercase italic tracking-wide group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 font-sans leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-[10px] uppercase tracking-wider text-cyan-400">
                  #{item.tag}
                </span>
                <span className="flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> View Photo
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={selectedIdx}
        onClose={() => setSelectedIdx(null)}
        onNavigate={(newIdx) => setSelectedIdx(newIdx)}
      />
    </div>
  );
}
