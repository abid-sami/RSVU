"use client";

import React, { useState } from "react";
import Image from "next/image";
import { achievementsList, achievementStats, AchievementItem } from "@/data/achievementsData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Trophy,
  Award,
  Calendar,
  Sparkles,
  Users,
  Cpu,
  Building,
  CheckCircle2,
  Medal,
} from "lucide-react";

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "National Championship",
    "Inter-University",
    "Innovation & Research",
  ];

  const filteredAchievements = achievementsList.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Trophy className="w-3.5 h-3.5" />
          <span>HONORS & COMPETITIVE EXCELLENCE</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          CLUB <span className="text-cyan-400">ACHIEVEMENTS</span> & AWARDS
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Detailed competition results, tournament trophies, and engineering innovation accolades won by RSVU squads across Bangladesh.
        </p>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {achievementStats.map((stat, idx) => (
          <div
            key={idx}
            className="cyber-panel rounded-xl p-6 text-center border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
          >
            <div className="font-tech font-black text-3xl sm:text-4xl text-cyan-400 italic text-glow-subtle">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-mono text-slate-200 uppercase tracking-wider font-bold">
              {stat.label}
            </div>
            <div className="mt-1 text-[11px] font-mono text-slate-400">
              {stat.suffix}
            </div>
          </div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? "bg-cyan-400 text-cyan-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements List */}
      <div className="space-y-8">
        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="cyber-panel rounded-2xl overflow-hidden border border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8"
          >
            {/* Left Image Preview */}
            <div className="relative w-full lg:w-72 h-52 sm:h-60 rounded-xl overflow-hidden shrink-0 border border-cyan-500/30 bg-slate-950">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Award Badge Pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
                  <Medal className="w-3.5 h-3.5" />
                  {item.award}
                </span>
              </div>

              {/* Year Tag */}
              <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-slate-700">
                {item.year}
              </div>
            </div>

            {/* Right Details */}
            <div className="flex-1 space-y-4 text-left w-full">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  {item.organizer}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono uppercase">
                  {item.category}
                </span>
              </div>

              <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase italic tracking-wide">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-slate-300">
                Tournament: <strong className="text-cyan-300">{item.competition}</strong>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {item.description}
              </p>

              {/* Bot and Squad Details */}
              <div className="pt-4 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Engineered Bot:</span>
                  <strong className="text-white">{item.projectOrBotName}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Team:</span>
                  <span className="text-slate-300">{item.teamMembers.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
