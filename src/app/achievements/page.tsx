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

import { AchievementCard } from "@/components/achievements/AchievementCard";

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
      <div className="space-y-6 sm:space-y-8">
        {filteredAchievements.map((item) => (
          <AchievementCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
