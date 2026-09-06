import React from "react";
import Image from "next/image";
import { Medal, Building, Cpu, Users } from "lucide-react";
import { AchievementItem } from "@/data/achievementsData";

interface AchievementCardProps {
  item: AchievementItem;
  hideMembersOnMobile?: boolean;
}

export function AchievementCard({ item, hideMembersOnMobile = false }: AchievementCardProps) {
  return (
    <div className="cyber-panel rounded-2xl overflow-hidden border border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-stretch lg:items-center gap-6 lg:gap-8">
      {/* Left Image Preview */}
      <div className="relative w-full lg:w-80 h-48 sm:h-56 lg:h-64 rounded-xl overflow-hidden shrink-0 border border-cyan-500/30 bg-slate-950">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Award Badge Pill */}
        <div className="absolute top-3 left-3 max-w-[85%]">
          <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 backdrop-blur-md truncate">
            <Medal className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{item.award}</span>
          </span>
        </div>

        {/* Year Tag */}
        <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-slate-700">
          {item.year}
        </div>
      </div>

      {/* Right Details */}
      <div className="flex-1 min-w-0 space-y-3.5 sm:space-y-4 text-left w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 min-w-0">
            <Building className="w-3.5 h-3.5 shrink-0" />
            <span className="break-words">{item.organizer}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono uppercase shrink-0">
            {item.category}
          </span>
        </div>

        <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase italic tracking-wide break-words">
          {item.title}
        </h3>

        <div className="text-xs font-mono text-slate-300 break-words">
          Tournament: <strong className="text-cyan-300">{item.competition}</strong>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed break-words">
          {item.description}
        </p>

        {/* Bot and Squad Details */}
        <div className="pt-3.5 sm:pt-4 border-t border-cyan-500/15 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="flex items-start gap-2 min-w-0">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-slate-400 block text-[10px] sm:text-[11px] uppercase tracking-wider">Team Name</span>
              <strong className="text-white break-words block">{item.projectOrBotName}</strong>
            </div>
          </div>

          <div className={`items-start gap-2 min-w-0 ${hideMembersOnMobile ? "hidden sm:flex" : "flex"}`}>
            <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-slate-400 block text-[10px] sm:text-[11px] uppercase tracking-wider">Team Members</span>
              <span className="text-slate-300 break-words block leading-relaxed">{item.teamMembers.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
