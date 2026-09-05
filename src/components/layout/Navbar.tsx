"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06090e]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-black/40"
          : "bg-gradient-to-b from-[#06090e]/95 to-transparent py-4 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-cyber-card border border-cyan-500/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Image
                src={siteConfig.localLogoUrl || "/logo.webp"}
                alt="RSVU Robotics Logo"
                fill
                sizes="40px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-tech text-base md:text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase italic">
                  ROBOTICS SOCIETY 
                </span>
                <span className="text-cyan-500 font-mono text-xs hidden sm:inline"></span>
              </div>
              <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                VARENDRA UNIVERSITY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-mono font-medium tracking-wider transition-all duration-200 relative group rounded ${
                    isActive
                      ? "text-cyan-300 bg-cyan-500/10 border border-cyan-500/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}
                    {link.name}
                  </span>
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-3/4"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/events#register"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider text-cyan-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] group"
            >
              <Sparkles className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
              <span>ROBOSPARK 1.1</span>
              <ChevronRight className="w-3 h-3 -mr-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-slate-300 hover:text-white focus:outline-none hover:border-cyan-400 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden border-b border-cyan-500/20 bg-[#06090e]/98 backdrop-blur-xl ${
          mobileMenuOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="px-5 space-y-1.5">
          
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded text-sm font-mono tracking-wider transition-colors ${
                  isActive
                    ? "text-cyan-300 bg-cyan-500/15 border-l-2 border-cyan-400 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? "text-cyan-400 translate-x-1" : "text-slate-600"
                  }`}
                />
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/events#register"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-tech font-bold uppercase tracking-wider text-cyan-950 bg-cyan-400 hover:bg-cyan-300 rounded shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>REGISTER FOR ROBOSPARK 1.1</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
