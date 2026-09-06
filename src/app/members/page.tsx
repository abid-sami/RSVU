"use client";

import React, { useState } from "react";
import { executiveMembers, advisorsList, ExecutiveMember } from "@/data/membersData";
import { useAdminData } from "@/contexts/AdminDataContext";
import { MemberCard } from "@/components/members/MemberCard";
import { Users } from "lucide-react";

export default function MembersPage() {
  const [filterRole, setFilterRole] = useState<string>("All");
  const { members: adminMembers } = useAdminData();

  const customMembers: ExecutiveMember[] = adminMembers.map((m) => ({
    id: m.id,
    name: m.name,
    designation: m.designation,
    roleType: "Executive Panel",
    department: m.education,
    avatar: m.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: m.education,
    skills: ["Robotics"],
    links: {},
  }));

  const allMembers: ExecutiveMember[] = [...advisorsList, ...executiveMembers, ...customMembers];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-sm sm:max-w-none mx-auto">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
