"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventCountdown } from "@/components/events/EventCountdown";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/events/EventCard";
import { EventFilterBar, EventStatusFilter } from "@/components/events/EventFilterBar";
import { upcomingEvents, pastEvents, allEvents, getDefaultEventFilter, ClubEvent } from "@/data/eventsData";
import {
  Calendar,
  Trophy,
  Users,
  Clock,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
} from "lucide-react";

export default function EventsPage() {
  const [filter, setFilter] = useState<EventStatusFilter>(getDefaultEventFilter);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("Robo Soccer");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const counts = {
    all: allEvents.length,
    upcoming: upcomingEvents.length,
    past: pastEvents.length,
  };

  const filteredEvents = allEvents.filter((event) => {
    if (filter === "all") return true;
    return event.status === filter;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setRegistrationModalOpen(false);
      setFormSubmitted(false);
    }, 2500);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NATIONAL & REGIONAL COMPETITIONS</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          RSVU <span className="text-cyan-400">EVENTS</span> & CHAMPIONSHIPS
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          From high-velocity line followers to tactical combat soccer and research symposiums, experience collegiate robotics at its peak.
        </p>
      </div>

      {/* Flagship Event Countdown Component */}
      <div className="mb-16">
        <EventCountdown />
      </div>

      {/* Interactive Filter Bar: All / Upcoming / Past */}
      <div className="mb-10">
        <EventFilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      </div>

      {/* Active Registration Banner (shown for All, Upcoming) */}
      {filter !== "past" && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-xs sm:text-sm text-slate-200">
              Official Registration for <strong>ROBOSPARK 2026</strong> is currently <strong>ACTIVE</strong>.
            </span>
          </div>
          <button
            onClick={() => setRegistrationModalOpen(true)}
            className="px-5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
          >
            REGISTER SQUAD NOW
          </button>
        </div>
      )}

      {/* Filtered Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`w-full flex ${
                filteredEvents.length === 1
                  ? "max-w-xl"
                  : "md:w-[calc(50%-16px)] max-w-xl"
              }`}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="cyber-panel p-12 text-center rounded-2xl border border-cyan-500/20 bg-[#080d16]/80 my-8">
          <p className="text-slate-400 font-mono text-sm">No events found matching this status filter.</p>
          <button
            onClick={() => setFilter("all")}
            className="mt-4 px-5 py-2 rounded bg-cyan-400 text-cyan-950 font-tech font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all"
          >
            VIEW ALL EVENTS
          </button>
        </div>
      )}

      {/* Quick Registration Modal */}
      {registrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="cyber-panel rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-cyan-500/40 bg-[#0c121d] relative">
            <button
              onClick={() => setRegistrationModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-cyan-400 mx-auto animate-bounce" />
                <h3 className="font-tech text-2xl font-bold text-white uppercase italic">
                  REGISTRATION RECEIVED!
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  Your squad confirmation has been logged. Our technical jury will send the arena entry pass and rulebook verification packet to your contact email.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    ROBOSPARK 2026 OFFICIAL PORTAL
                  </span>
                </div>
                <h3 className="font-tech text-2xl font-black text-white uppercase italic tracking-wide">
                  REGISTER YOUR SQUAD
                </h3>

                <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      SELECT COMPETITION SEGMENT
                    </label>
                    <select
                      value={selectedSegment}
                      onChange={(e) => setSelectedSegment(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    >
                      <option>Robo Soccer Championship</option>
                      <option>Line Follower Robot (LFR) Velocity</option>
                      <option>National Hardware Showcase</option>
                      <option>Robotics & AI Poster Presentation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      TEAM / SQUAD NAME
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Varendra CyberBots"
                      className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        INSTITUTE / UNIVERSITY
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Varendra University"
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        TEAM LEADER PHONE
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+880 17XXXXXXXX"
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      LEADER EMAIL ADDRESS
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="captain@example.com"
                      className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setRegistrationModalOpen(false)}
                      className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-xs uppercase tracking-wider italic flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>CONFIRM REGISTRATION</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
