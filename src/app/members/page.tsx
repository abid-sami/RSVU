"use client";

import React, { useState } from "react";
import Image from "next/image";
import { executiveMembers, advisorsList, ExecutiveMember } from "@/data/membersData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Users,
  Github,
  Linkedin,
  Mail,
  Award,
  Sparkles,
  Shield,
  ChevronRight,
  Code,
  ExternalLink,
} from "lucide-react";

export default function MembersPage() {
  const [filterRole, setFilterRole] = useState<string>("All");

  const allMembers: ExecutiveMember[] = [...advisorsList, ...executiveMembers];

  const filteredMembers = allMembers.filter((m) => {
    if (filterRole === "All") return true;
    return m.roleType === filterRole;
  });

  const roles = ["All", "Advisor", "Executive Panel", "Technical Team", "Management Team"];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>LEADERSHIP & TALENT ARCHITECTURE</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          EXECUTIVE <span className="text-cyan-400">MEMBERS</span> & PANEL
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          The brilliant student engineers, software architects, roboticists, and faculty patrons driving the Robotics Society of Varendra University forward.
        </p>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setFilterRole(role)}
            className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              filterRole === role
                ? "bg-cyan-400 text-cyan-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            {role === "All" ? `All Members (${allMembers.length})` : role}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="cyber-panel rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Member Photo Container */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-950">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1017] via-transparent to-transparent"></div>

              {/* Role Type Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded bg-black/80 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase backdrop-blur-md">
                  {member.roleType}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-tech text-lg font-bold text-white uppercase italic tracking-wide group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
                  {member.designation}
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  {member.department}
                </p>

              
              </div>

  
              <div>
                

                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
