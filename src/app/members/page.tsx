"use client";

import React, { useState } from "react";
import { executiveMembers, advisorsList, ExecutiveMember } from "@/data/membersData";
import { useAdminData } from "@/contexts/AdminDataContext";
import { MemberCard } from "@/components/members/MemberCard";
import { Users, GraduationCap, Sparkles, Cpu, Layers } from "lucide-react";

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
      avatar: m.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      bio: isFaculty ? (m.designation || "Faculty Mentor") : `${m.department || "Department of CSE"}, ${m.batch || m.education || ""}`,
      skills: isFaculty ? ["Academic Patron", "Research Supervision"] : ["Robotics"],
      links: {},
    };
  });

  const allMembers: ExecutiveMember[] = [...advisorsList, ...executiveMembers, ...customMembers];

  const advisors = allMembers.filter((m) => m.roleType === "Advisor");
  const nonAdvisors = allMembers.filter((m) => m.roleType !== "Advisor");

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
            {role === "All" ? `All Members (${allMembers.length})` : role}
          </button>
        ))}
      </div>

      {/* Members Content: Sectioned rows with captions */}
      {filterRole === "All" ? (
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
                  EXECUTIVE <span className="text-cyan-400">MEMBERS</span>
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
