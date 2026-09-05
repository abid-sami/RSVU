import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Mail, MapPin, Phone, Github, Linkedin, Facebook, Youtube, ExternalLink, Heart, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#040609] border-t border-cyan-500/20 text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 tech-grid-overlay opacity-30 pointer-events-none"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative w-10 h-10 rounded-lg bg-cyber-card border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all overflow-hidden">
                <Image
                  src={siteConfig.localLogoUrl || "/logo.webp"}
                  alt="RSVU Robotics Logo"
                  fill
                  sizes="40px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-tech text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase italic">
                  ROBOTICS SOCIETY
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  VARENDRA UNIVERSITY
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md font-sans">
              The premier robotics and autonomous engineering society of Varendra University.
              Dedicated to hands-on research in autonomous systems, mobile rovers, and competitive robotics.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>LEARN. BUILD. INNOVATE.</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm"></span>
              EXPLORE
            </h4>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  About Society
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Events & RoboSpark
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Components Bank
                </Link>
              </li>
              <li>
                <Link href="/members" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Executive Members
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Activity Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Event Segments */}
          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm"></span>
              ROBOTICS SEGMENTS
            </h4>
            <ul className="space-y-2 text-sm font-mono text-slate-400">
              <li>
                <Link href="/events#robo-soccer" className="hover:text-cyan-300 transition-colors">
                  Robo Soccer Duel
                </Link>
              </li>
              <li>
                <Link href="/events#line-follower" className="hover:text-cyan-300 transition-colors">
                  Line Follower (LFR)
                </Link>
              </li>
              <li>
                <Link href="/events#hardware-showcase" className="hover:text-cyan-300 transition-colors">
                  Hardware Showcase
                </Link>
              </li>
              <li>
                <Link href="/events#poster-presentation" className="hover:text-cyan-300 transition-colors">
                  Research Posters
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-cyan-300 transition-colors">
                  Component Borrowing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Join Society
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Lab Info */}
          <div className="space-y-3">
            <h4 className="font-tech text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm"></span>
              HEADQUARTERS
            </h4>
            <div className="space-y-3 text-xs text-slate-400 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.labLocation}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-cyan-300 transition-colors font-mono">
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-mono">{siteConfig.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Developer Credit & Copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-slate-400 flex items-center gap-2">
            <span>© {new Date().getFullYear()} RSVU Robotics · Varendra University. All Rights Reserved.</span>
          </div>

          {/* Prominent Developer Credit as requested */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/90 border border-cyan-500/30 text-slate-300 hover:border-cyan-400 transition-colors">
            <span className="text-cyan-400 font-semibold"><a href="https://sami.iam.bd">Developed by Ragib Hasan Abid Sami</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
