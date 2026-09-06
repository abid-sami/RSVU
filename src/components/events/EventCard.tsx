import React from "react";
import Link from "next/link";
import { ClubEvent } from "@/data/eventsData";
import { Calendar, MapPin, Trophy, Users, ArrowRight, ExternalLink, Banknote } from "lucide-react";

interface EventCardProps {
  event: ClubEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isUpcoming = event.status === "upcoming";
  const isRegOpen = event.registration ? event.registration === "Open" : (event.registrationOpen ?? isUpcoming);

  return (
    <div
      id={event.id}
      className="w-full cyber-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 group relative overflow-hidden bg-gradient-to-b from-[#0e1626]/90 via-[#0a101d]/95 to-[#060a12] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
    >
      {/* Top ambient glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Header Row: Status Indicator */}
      <div className="flex items-center justify-start gap-3 mb-4">
        {/* Status Badge */}
        <span
          className={`px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 ${
            !isUpcoming
              ? "bg-slate-800/60 text-slate-400 border border-slate-700/60"
              : isRegOpen
              ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
              : "bg-red-500/15 text-red-300 border border-red-500/30"
          }`}
        >
          {isUpcoming && isRegOpen && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          )}
          {!isUpcoming ? "Archived" : isRegOpen ? "Registration Open" : "Registration Closed"}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4 flex-1">
        {/* Title & Badges Section */}
        <div className="space-y-2.5">
          <h3 className="font-tech text-xl sm:text-2xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase italic tracking-wide leading-snug">
            {event.title}
          </h3>

          {/* Prize Tag right after name */}
          {event.prizePool && (
            <div className="pt-0.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Prize Pool: {event.prizePool}</span>
              </div>
            </div>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          {event.shortDescription}
        </p>

        {/* Metadata Details */}
        <div className="space-y-2.5 pt-4 border-t border-cyan-500/15 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-300">{event.date} {event.time ? `• ${event.time}` : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate text-slate-300">{event.venue}</span>
          </div>
          {event.teamSize && (
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-300">Squad: {event.teamSize}</span>
            </div>
          )}
          {event.fee && (
            <div className="flex items-center gap-2">
              <Banknote className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-300">
                Registration Fee: <span className="text-emerald-400 font-semibold">{event.fee}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="pt-5 mt-4 border-t border-slate-800/80">
        {isUpcoming ? (
          isRegOpen ? (
            <Link
              href="/events#register"
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 hover:text-cyan-200 font-tech font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            >
              <span>REGISTER SQUAD</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="w-full py-2.5 px-4 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-500 font-mono text-xs uppercase text-center font-bold tracking-wider">
              REGISTRATION CLOSED
            </div>
          )
        ) : (
          <Link
            href="/gallery"
            className="w-full py-2.5 px-4 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-mono text-xs uppercase text-center flex items-center justify-center gap-1.5 transition-all"
          >
            <span>VIEW EVENT MEDIA</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
};
