"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryItem } from "@/data/galleryData";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null;
  const currentItem = currentIndex !== null ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(nextIdx);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(nextIdx);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-900/80 border border-cyan-500/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all z-20"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-cyan-500/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all z-20 hidden sm:flex items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-cyan-500/40 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all z-20 hidden sm:flex items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Modal Container */}
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0a0f18] shadow-[0_0_60px_rgba(0,240,255,0.2)]">
        {/* Main Image */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black flex items-center justify-center">
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption and meta bar */}
        <div className="w-full p-4 sm:p-6 bg-gradient-to-t from-[#06090e] via-[#090e17] to-[#0c121e] border-t border-cyan-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {currentItem.category}
                </span>
                <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {currentItem.date}
                </span>
              </div>

              <h3 className="font-tech text-lg sm:text-xl font-bold text-white uppercase italic">
                {currentItem.title}
              </h3>
            </div>

            <div className="text-xs font-mono text-cyan-400 bg-slate-900/80 px-3 py-1 rounded border border-cyan-500/20">
              {currentIndex + 1} / {items.length}
            </div>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans">
            {currentItem.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
