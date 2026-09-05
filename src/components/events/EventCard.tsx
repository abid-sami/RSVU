import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ClubEvent } from "@/data/eventsData";
import { Calendar, MapPin, Trophy, Users, ArrowRight, ExternalLink } from "lucide-react";

interface EventCardProps {
  event: ClubEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isUpcoming = event.status === "upcoming";
  const isOngoing = event.status === "ongoing";

  return (
    <div
      id={event.id}
      className={`cyber-panel rounded-xl overflow-hidden flex flex-col justify-between border transition-all duration-300 group ${
        isOngoing
          ? "border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          : "border-cyan-500/20 hover:border-cyan-400/60"
      }`}
    >
      {/* Event Image Banner (1:1 Ratio) */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d131d] via-[#0d131d]/40 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] uppercase tracking-wider backdrop-blur-md">
            {event.category}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded font-mono text-[11px] uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 ${
              isOngoing
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                : isUpcoming
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50"
                : "bg-slate-800/80 text-slate-400 border border-slate-700"
            }`}
          >
            {isOngoing && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            {isOngoing ? "Running Now" : isUpcoming ? "Registration Active" : "Archived"}
          </span>
        </div>

        {/* Prize Pool Tag if applicable */}
        {event.prizePool && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>Prize Pool: {event.prizePool}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-tech text-xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase italic tracking-wide">
            {event.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3">
            {event.shortDescription}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="space-y-2 pt-2 border-t border-cyan-500/15 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{event.date} {event.time ? `• ${event.time}` : ""}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          {event.teamSize && (
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Squad: {event.teamSize}</span>
            </div>
          )}
        </div>

        {/* Feature Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {event.highlights.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {isOngoing ? (
            <Link
              href="/events#register"
              className="w-full py-2.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 hover:text-emerald-200 font-tech font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 group-hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE IN LAB · VIEW DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : isUpcoming ? (
            <Link
              href="/events#register"
              className="w-full py-2.5 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 hover:text-cyan-200 font-tech font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 group-hover:border-cyan-400 transition-all"
            >
              <span>REGISTER SQUAD</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/gallery"
              className="w-full py-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs uppercase text-center flex items-center justify-center gap-1.5 transition-all"
            >
              <span>VIEW EVENT MEDIA</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
