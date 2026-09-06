"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { ChevronDown, ArrowRight, Sparkles, Terminal, Shield, Zap } from "lucide-react";

export const HeroSection: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted on the actual DOM element for modern browser autoplay policy
    video.defaultMuted = true;
    video.muted = true;

    const startPlayback = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy — start on first user interaction
            const onInteract = () => {
              video.play().then(() => setVideoLoaded(true)).catch(() => {});
              window.removeEventListener("click", onInteract);
              window.removeEventListener("touchstart", onInteract);
              window.removeEventListener("scroll", onInteract);
            };
            window.addEventListener("click", onInteract, { once: true });
            window.addEventListener("touchstart", onInteract, { once: true });
            window.addEventListener("scroll", onInteract, { once: true });
          });
      }
    };

    startPlayback();

    // Fallback: make sure opacity isn't stuck at 0 even if load event was already dispatched
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToExplore = () => {
    const el = document.getElementById("explore-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden pt-24 pb-12">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#06090e]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-75 sm:opacity-80 scale-100" : "opacity-0 scale-105"
          }`}
          src={siteConfig.heroVideoUrl}
        >
          <source src={siteConfig.heroVideoUrl} type="video/mp4" />
        </video>

        {/* Video Overlay: High readability dark gradient & cyber mesh */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06090e]/75 via-[#06090e]/60 to-[#06090e]/95 z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#06090e_80%)] z-10 pointer-events-none"></div>
        <div className="absolute inset-0 tech-grid-overlay opacity-25 z-10 pointer-events-none"></div>

        {/* Animated Cyber Accent Lines */}
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-10 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Centered Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-auto flex flex-col items-center">
        {/* Top Tagline / Meta */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)] animate-pulse-slow">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>EST. {siteConfig.established} · VARENDRA UNIVERSITY, RAJSHAHI</span>
        </div>

        {/* Hero Title: ROBOTICS SOCIETY OF VARENDRA UNIVERSITY */}
        <h1 className="font-tech text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase italic leading-[1.05] sm:leading-[1.0] text-glow">
          <span className="block">ROBOTICS</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400">
            SOCIETY
          </span>
          <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-200">
            OF VARENDRA
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-cyan-400 tracking-wider">
            UNIVERSITY
          </span>
        </h1>

        {/* Philosophy Motto */}
        <div className="mt-6 flex items-center justify-center gap-3 text-cyan-300 font-tech font-bold text-base sm:text-xl tracking-[0.25em] uppercase italic">
          <span className="w-6 sm:w-12 h-[1.5px] bg-cyan-500"></span>
          <span className="text-glow-subtle">{siteConfig.tagline}</span>
          <span className="w-6 sm:w-12 h-[1.5px] bg-cyan-500"></span>
        </div>

        {/* Short Club Introduction */}
        <p className="mt-6 max-w-2xl text-sm sm:text-base text-slate-300 font-sans leading-relaxed text-center drop-shadow">
          Empowering the next generation of engineers, roboticists, and hardware architects.
          From competitive autonomous line followers and battle soccer bots to embedded IoT and AI rovers.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <button
            onClick={scrollToExplore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-sm tracking-wider uppercase italic transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE us</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            href="/events"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-tech font-bold text-sm tracking-wider uppercase italic border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>ROBOSPARK 1.1</span>
          </Link>
        </div>
      </div>

      {/* Metrics Banner Bar at the base of Hero */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 mt-12">
        {/* <div className="cyber-panel rounded-xl py-3 sm:py-4 px-2 sm:px-6 border border-cyan-500/30 grid grid-cols-3 divide-x divide-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-4">
            
            <span className="block font-tech font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wider text-glow-subtle leading-tight">
              12
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
              Years
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-4">
           
            <span className="block font-tech font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wider text-glow-subtle leading-tight">
              41
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
              Executive Members
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-1 sm:px-4">
           
            <span className="block font-tech font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wider text-glow-subtle leading-tight">
              5
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
              Events Organized
            </span>
          </div>
        </div> */}

        {/* Scroll indicator */}
        <button
          onClick={scrollToExplore}
          className="mt-6 mx-auto flex flex-col items-center text-slate-400 hover:text-cyan-400 transition-colors group cursor-pointer"
          aria-label="Scroll down to explore"
        >
          
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </button>
      </div>
    </section>
  );
};
