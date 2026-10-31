"use client";

import React, { useState } from "react";
import { executiveMembers, advisorsList, ExecutiveMember } from "@/data/membersData";
import { useAdminData } from "@/contexts/AdminDataContext";
import { MemberCard } from "@/components/members/MemberCard";
import { Users, GraduationCap, Sparkles, Cpu, Layers, Search, X } from "lucide-react";

const roleDescriptions: Record<string, { badge: string; title: string; highlight: string; caption: string; icon: React.ElementType }> = {
  Advisor: {
    badge: "HONORABLE MENTORSHIP",
    title: "FACULTY",
    highlight: "ADVISORS",
    caption: "Distinguished university professors and mentors providing strategic counsel, laboratory grants, and technical validation.",
    icon: GraduationCap,
  },
  "Executive Panel": {
    badge: "EXECUTIVE LEADERSHIP",
    title: "EXECUTIVE",
    highlight: "PANEL",
    caption: "The core student leadership council steering RSVU policy, administration, sponsorships, and external representation.",
    icon: Users,
  },
  "Technical Team": {
    badge: "ENGINEERING & R&D",
    title: "TECHNICAL",
    highlight: "TEAM",
    caption: "Specialized student roboticists, firmware architects, and hardware designers driving competitive combat rovers and lab prototypes.",
    icon: Cpu,
  },
  "Management Team": {
    badge: "OPERATIONS & LOGISTICS",
    title: "MANAGEMENT",
    highlight: "TEAM",
    caption: "Student coordinators managing logistics, championship operations, event management, and club communication.",
    icon: Layers,
  },
};

export default function MembersPage() {
  const [filterRole, setFilterRole] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { members: adminMembers } = useAdminData();

  const customMembers: ExecutiveMember[] = adminMembers.map((m) => {
    const isFaculty = m.memberType === "faculty";
    return {
      id: m.id,
      name: m.name,
      designation: isFaculty ? (m.role || m.designation) : m.designation,
      roleType: isFaculty ? ("Advisor" as const) : ("Executive Panel" as const),
      department: m.department || m.education || "Department of CSE",
      batch: isFaculty ? "" : (m.batch || ""),
      avatar: m.photo || "/default-avatar.png",
      bio: isFaculty ? (m.designation || "Faculty Mentor") : `${m.department || "Department of CSE"}, ${m.batch || m.education || ""}`,
      skills: isFaculty ? ["Academic Patron", "Research Supervision"] : ["Robotics"],
      links: {},
    };
  });

  const allMembers: ExecutiveMember[] = [...advisorsList, ...executiveMembers, ...customMembers];

  const getRoleCount = (role: string) => {
    if (role === "All") return allMembers.length;
    return allMembers.filter((m) => m.roleType === role).length;
  };

  const advisors = allMembers.filter((m) => m.roleType === "Advisor");
  const nonAdvisors = allMembers.filter((m) => m.roleType !== "Advisor");

  const isSearching = searchQuery.trim().length > 0;
  const filteredMembers = allMembers.filter((m) => {
    const matchesRole = filterRole === "All" || m.roleType === filterRole;
    if (!isSearching) return matchesRole;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  const roles = ["All", "Advisor", "Executive Panel", "Technical Team", "Management Team"];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>LEADERSHIP & TALENT ARCHITECTURE</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          EXECUTIVE <span className="text-cyan-400">MEMBERS</span> & PANEL
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          The dedicated student engineers, executive officers, project coordinators, and faculty patrons driving the Robotics Society of Varendra University forward.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, role, or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-14">
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
            {role === "All" ? `All Members (${allMembers.length})` : `${role} (${getRoleCount(role)})`}
          </button>
        ))}
      </div>

      {/* Members Content */}
      {isSearching ? (
        <section className="space-y-6">
          <div className="border-b border-cyan-500/20 pb-4 text-left flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-cyan-400">Search Results</p>
              <h2 className="font-tech text-2xl font-black text-white uppercase italic">
                Found {filteredMembers.length} {filteredMembers.length === 1 ? "Member" : "Members"}
              </h2>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-none mx-auto">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-slate-800">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300 font-mono text-sm">No members found matching &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterRole("All");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono uppercase hover:bg-cyan-400/20 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      ) : filterRole === "All" ? (
        <div className="space-y-16">
          {/* Row 1: Faculty Advisors */}
          {advisors.length > 0 && (
            <section className="space-y-6">
              <div className="border-b border-cyan-500/20 pb-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>HONORABLE MENTORSHIP</span>
                </div>
                <h2 className="font-tech text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight">
                  FACULTY <span className="text-cyan-400">ADVISORS</span>
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 font-sans max-w-2xl">
                  Distinguished university professors and mentors providing strategic counsel, laboratory grants, and technical validation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-none mx-auto">
                {advisors.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}

          {/* Row 2: Others (Executive Members & Teams) */}
          {nonAdvisors.length > 0 && (
            <section className="space-y-6">
              <div className="border-b border-cyan-500/20 pb-4 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>STUDENT LEADERSHIP & TEAMS</span>
                </div>
                <h2 className="font-tech text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight">
                  EXECUTIVE <span className="text-cyan-400">MEMBERS ({nonAdvisors.length})</span>
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 font-sans max-w-2xl">
                  The dedicated student engineers, team leads, and project coordinators managing robotics projects, workshops, and society operations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-none mx-auto">
                {nonAdvisors.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Filtered single category view */
        <section className="space-y-6">
          {roleDescriptions[filterRole] && (
            <div className="border-b border-cyan-500/20 pb-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{roleDescriptions[filterRole].badge}</span>
              </div>
              <h2 className="font-tech text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight">
                {roleDescriptions[filterRole].title} <span className="text-cyan-400">{roleDescriptions[filterRole].highlight}</span>
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-sans max-w-2xl">
                {roleDescriptions[filterRole].caption}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-sm sm:max-w-none mx-auto">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
