"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { HeroSection } from "@/components/hero/HeroSection";
import { EventCountdown } from "@/components/events/EventCountdown";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/events/EventCard";
import { ComponentCard } from "@/components/components-catalog/ComponentCard";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import { EventFilterBar, EventStatusFilter } from "@/components/events/EventFilterBar";
import { allEvents, ongoingEvents, upcomingEvents, pastEvents, getDefaultEventFilter } from "@/data/eventsData";
import { componentsList, ComponentItem } from "@/data/componentsData";
import { achievementsList, achievementStats } from "@/data/achievementsData";
import { galleryItems } from "@/data/galleryData";
import { clubTargets } from "@/data/targetData";
import {
  Compass,
  Cpu,
  Target,
  Trophy,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Code,
  Layers,
  Award,
  ExternalLink,
  ChevronRight,
  Boxes,
} from "lucide-react";

export default function HomePage() {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number | null>(null);
  const [borrowModalItem, setBorrowModalItem] = useState<ComponentItem | null>(null);
  const [eventFilter, setEventFilter] = useState<EventStatusFilter>(getDefaultEventFilter);

  const eventCounts = {
    all: allEvents.length,
    ongoing: ongoingEvents.length,
    upcoming: upcomingEvents.length,
    past: pastEvents.length,
  };

  const displayedEvents = allEvents.filter((event) => {
    if (eventFilter === "all") return true;
    return event.status === eventFilter;
  });

  return (
    <div className="relative">
      {/* 1. Fullscreen Hero Section */}
      <HeroSection />

      {/* Explore Section Anchor */}
      <div id="explore-section" className="relative pt-12">
        {/* 2. Event Countdown Component (Configurable & Backend Ready) */}
        <EventCountdown />

        {/* 3. About Club Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
          <SectionHeading
            badge="SYSTEM ARCHITECTURE & IDENTITY"
            title="THE GENESIS OF"
            highlightText="RSVU ROBOTICS"
            subtitle="Founded in 2014 at Varendra University, we empower visionary students to engineer intelligent hardware, mobile autonomous robots, and robotic AI."
          />

          {/* About Grid: Philosophy + Mission + Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Big Panel: Philosophy */}
            <div className="lg:col-span-7 cyber-panel cyber-corner rounded-2xl p-8 sm:p-10 border border-cyan-500/20 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CORE PHILOSOPHY</span>
                </div>

                <h3 className="font-tech text-2xl sm:text-3xl font-black text-white italic tracking-wide uppercase leading-snug">
                  &ldquo;LEARN. BUILD. INNOVATE.&rdquo;
                </h3>

                <p className="mt-4 text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                  At the Robotics Society of Varendra University (RSVU), we believe that robotics cannot be learned solely from textbooks. True engineering excellence is forged through burning solder, calibrating PID controller loops, calculating motor torques, and testing prototypes under arena pressure.
                </p>

               
              </div>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-cyan-500/15">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-cyan-500/15">
                  <div className="text-cyan-400 font-mono text-xs font-bold mb-1 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    <span>01. LEARN</span>
                  </div>
                  <p className="text-[12px] text-slate-400 font-sans">
                    Structured hands-on firmware & PCB workshops from day one.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-cyan-500/15">
                  <div className="text-cyan-400 font-mono text-xs font-bold mb-1 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>02. BUILD</span>
                  </div>
                  <p className="text-[12px] text-slate-400 font-sans">
                    Access to our loanable hardware vault, 3D printers, and test arena.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-cyan-500/15">
                  <div className="text-cyan-400 font-mono text-xs font-bold mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>03. INNOVATE</span>
                  </div>
                  <p className="text-[12px] text-slate-400 font-sans">
                    Deploy research rovers and compete in national championships.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-tech font-bold text-xs uppercase tracking-wider group"
                >
                  <span>READ COMPLETE CLUB HISTORY & LAB ROADMAP</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Mission & Stats Card */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Mission Card */}
              <div className="cyber-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 bg-gradient-to-br from-[#0c131f] to-[#080d16]">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-tech text-lg font-bold text-white uppercase italic tracking-wide">
                  MISSION & VISION
                </h4>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  To establish Varendra University as the premier autonomous robotics and embedded hardware center of North Bengal, bridging academic theory with national technological impact.
                </p>
              </div>

              {/* Lab Facilities Card */}
              <div className="cyber-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 bg-gradient-to-br from-[#0c131f] to-[#080d16]">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Boxes className="w-5 h-5" />
                </div>
                <h4 className="font-tech text-lg font-bold text-white uppercase italic tracking-wide">
                  ROBOTICS & EMBEDDED LAB 402
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Equipped with digital oscilloscopes, soldering rework stations, laser track arenas, and open component cabinets for club research squads.
                </p>

                <div className="mt-4 pt-4 border-t border-cyan-500/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400">Available to active members</span>
                  <Link
                    href="/components"
                    className="text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Check Inventory</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Events Section with Status Filter */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono tracking-wider uppercase mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>CHAMPIONSHIP SEGMENTS & WORKSHOPS</span>
              </div>
              <h2 className="font-tech text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                RSVU <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">EVENTS</span>
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 text-xs font-tech font-bold uppercase tracking-wider transition-all"
            >
              <span>VIEW COMPLETE EVENT SCHEDULE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Filter Bar: Running / Upcoming / Past */}
          <div className="mb-10">
            <EventFilterBar
              currentFilter={eventFilter}
              onFilterChange={setEventFilter}
              counts={eventCounts}
              hideAllOption={true}
            />
          </div>

          {/* Flagship Segments Grid */}
          {displayedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedEvents.slice(0, 8).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="cyber-panel p-10 text-center rounded-2xl border border-cyan-500/20 bg-[#080d16]/80 my-4">
              <p className="text-slate-400 font-mono text-sm">No events currently found for this status filter.</p>
              <button
                onClick={() => setEventFilter("all")}
                className="mt-4 px-5 py-2 rounded bg-cyan-400 text-cyan-950 font-tech font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all"
              >
                VIEW ALL EVENTS
              </button>
            </div>
          )}
        </section>

        {/* 5. Components Availability Showcase */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono tracking-wider uppercase mb-3">
                <Cpu className="w-3.5 h-3.5" />
                <span>HARDWARE VAULT</span>
              </div>
              <h2 className="font-tech text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                COMPONENTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">AVAILABILITY</span>
              </h2>
              <p className="mt-3 text-sm text-slate-400 font-sans max-w-xl">
                Browse our real-time inventory of microcontrollers, high-RPM motors, LiDAR sensors, and power systems available for university project check-out.
              </p>
            </div>
            <Link
              href="/components"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-cyan-950 text-xs font-tech font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <span>FULL INVENTORY CATALOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Components Grid Preview (First 4 items) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {componentsList.slice(0, 4).map((comp) => (
              <ComponentCard key={comp.id} item={comp} />
            ))}
          </div>
        </section>

        {/* 6. Achievements & Honors Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
          <SectionHeading
            badge="HALL OF GLORY"
            title="OUR"
            highlightText="ACHIEVEMENTS"
            subtitle="Our squads continually battle across top engineering institutions, earning championship trophies and technical distinction for Varendra University."
          />

          {/* Stats Highlight Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {achievementStats.map((stat, idx) => (
              <div
                key={idx}
                className="cyber-panel rounded-xl p-6 text-center border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
              >
                <div className="font-tech font-black text-3xl sm:text-4xl text-cyan-400 italic text-glow-subtle">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-mono text-slate-300 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
                <div className="mt-1 text-[11px] font-mono text-slate-400">
                  {stat.suffix}
                </div>
              </div>
            ))}
          </div>

          {/* Top 3 Achievements Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievementsList.slice(0, 3).map((ach) => (
              <div
                key={ach.id}
                className="cyber-panel rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
                      <Trophy className="w-3 h-3" />
                      {ach.award}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{ach.year}</span>
                  </div>

                  <h3 className="font-tech text-lg font-bold text-white group-hover:text-cyan-300 uppercase italic transition-colors">
                    {ach.title}
                  </h3>

                  <p className="mt-1 text-xs font-mono text-cyan-400">
                    {ach.competition}
                  </p>

                  <p className="mt-3 text-xs text-slate-300 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cyan-500/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Bot: <strong className="text-slate-200">{ach.projectOrBotName}</strong></span>
                  <span className="text-cyan-400">{ach.organizer.split("(")[0]}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 font-tech font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>VIEW FULL TROPHY ARCHIVE & RESEARCH CITATIONS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 7. Club Target & Development Roadmap */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
          <SectionHeading
            badge="FUTURE INITIATIVES"
            title="STRATEGIC GOALS &"
            highlightText="DEVELOPMENT TARGETS"
            subtitle="The roadmap steering our technological expansion, laboratory equipment acquisition, and upcoming national outreach."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubTargets.map((target) => (
              <div
                key={target.id}
                className="cyber-panel rounded-xl p-6 sm:p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                      {target.milestone} • {target.phase}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {target.statusPercent}% Complete
                    </span>
                  </div>

                  <h3 className="font-tech text-xl font-bold text-white uppercase italic tracking-wide">
                    {target.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {target.description}
                  </p>

                  {/* Target milestones checklist */}
                  <div className="mt-4 space-y-2">
                    {target.targets.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 pt-4 border-t border-cyan-500/15">
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-cyan-500/20">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,240,255,0.6)]"
                      style={{ width: `${target.statusPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Activity Gallery Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VISUAL CHRONICLES</span>
              </div>
              <h2 className="font-tech text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                ACTIVITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">GALLERY</span>
              </h2>
              <p className="mt-3 text-sm text-slate-400 font-sans max-w-xl">
                Snapshots from our hands-on robotics workshops, national stadium clashes, and lab experimentation.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 text-xs font-tech font-bold uppercase tracking-wider transition-all"
            >
              <span>BROWSE ALL ALBUMS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6 Photo Grid with Hover Lightbox Click */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.slice(0, 6).map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryIdx(idx)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/40 to-transparent"></div>

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded bg-black/70 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Caption on bottom */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-300">
                  <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                    {item.date}
                  </span>
                  <h4 className="font-tech text-base font-bold text-white uppercase italic tracking-wide group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Final Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-500/10">
          <div className="cyber-panel cyber-corner rounded-3xl p-8 sm:p-14 text-center border border-cyan-500/40 bg-gradient-to-b from-[#0e1724] to-[#06090e] shadow-[0_0_50px_rgba(0,240,255,0.15)] relative overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/20 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BECOME AN INNOVATOR</span>
              </div>

              <h2 className="font-tech text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase italic tracking-tight text-glow-subtle">
                READY TO BUILD THE <span className="text-cyan-400">FUTURE?</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Whether you are passionate about autonomous mobile rovers, combat bot engineering, computer vision, or embedded IoT telemetry — your journey starts here.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-sm tracking-wider uppercase italic transition-all shadow-[0_0_25px_rgba(0,240,255,0.5)] flex items-center justify-center gap-2"
                >
                  <span>JOIN RSVU ROBOTICS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/members"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white font-tech font-bold text-sm tracking-wider uppercase italic transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>MEET OUR EXECUTIVE PANEL</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={galleryItems}
        currentIndex={selectedGalleryIdx}
        onClose={() => setSelectedGalleryIdx(null)}
        onNavigate={(newIdx) => setSelectedGalleryIdx(newIdx)}
      />

      {/* Borrow Requisition Dialog Modal */}
      {borrowModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="cyber-panel rounded-2xl p-6 sm:p-8 max-w-md w-full border border-cyan-500/40 bg-[#0c121d] relative">
            <h3 className="font-tech text-xl font-bold text-white uppercase italic tracking-wide">
              COMPONENT REQUISITION
            </h3>
            <p className="mt-2 text-xs text-slate-400 font-mono">
              Item: <span className="text-cyan-400 font-bold">{borrowModalItem.name}</span>
            </p>
            <div className="mt-4 p-3 rounded bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono text-slate-300">
              <div>Location: {borrowModalItem.location}</div>
              <div>Available: {borrowModalItem.availableQuantity} units</div>
              <div>Model: {borrowModalItem.model}</div>
            </div>
            <p className="mt-4 text-xs text-slate-300 font-sans">
              To check out this hardware for competition or laboratory prototyping, submit an authorized lab voucher at Robotics Lab Room 402 or contact General Secretary.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setBorrowModalItem(null)}
                className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs uppercase"
              >
                Close
              </button>
              <Link
                href="/contact"
                onClick={() => setBorrowModalItem(null)}
                className="px-4 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-xs uppercase"
              >
                Contact Lab Incharge
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
