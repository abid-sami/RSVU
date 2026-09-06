"use client";

import React from "react";
import Image from "next/image";
import { ExecutiveMember } from "@/data/membersData";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

interface MemberCardProps {
  member: ExecutiveMember;
}

/**
 * Parses and formats department and batch metadata.
 */
function parseDeptAndBatch(deptString?: string, explicitBatch?: string) {
  if (explicitBatch) {
    return {
      department: (deptString || "Department of CSE").replace(/^Dept\./i, "Department"),
      batch: explicitBatch.replace(/^Batch:\s*/i, ""),
    };
  }
  if (deptString) {
    if (deptString.includes(",")) {
      const parts = deptString.split(",");
      const dept = parts[0].trim().replace(/^Dept\./i, "Department");
      const batchPart = parts.slice(1).join(",").trim().replace(/^Batch:\s*/i, "");
      return {
        department: dept,
        batch: batchPart,
      };
    }
    const batchMatch = deptString.match(/(\d+(?:st|nd|rd|th)?\s*Batch)/i);
    if (batchMatch) {
      const batchPart = batchMatch[1];
      const deptPart = deptString.replace(batchPart, "").trim().replace(/^Dept\./i, "Department").replace(/,\s*$/, "");
      return {
        department: deptPart || "Department of CSE",
        batch: batchPart,
      };
    }
    return {
      department: deptString.replace(/^Dept\./i, "Department"),
      batch: null,
    };
  }
  return {
    department: "Department of CSE",
    batch: null,
  };
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const { department, batch } = parseDeptAndBatch(member.department, member.batch);
  const links = member.links || {};
  const hasLinks = Boolean(links.github || links.linkedin || links.email || links.facebook);

  return (
    <div className="w-full bg-[#0d1322] border border-slate-700/60 hover:border-cyan-500/50 rounded-[24px] p-6 sm:p-7 shadow-xl shadow-black/50 hover:shadow-[0_10px_35px_rgba(0,240,255,0.18)] transition-all duration-300 flex flex-col justify-between items-center text-center group relative overflow-hidden">
      {/* Background Cyber Ambient Flare */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-28 bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

      {/* Top Profile Area */}
      <div className="w-full flex flex-col items-center">
        {/* Avatar Container: Centered circular profile picture enclosed by a glowing cyan/neon gradient ring */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] group-hover:scale-105 transition-all duration-500">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#0d1322] bg-slate-950">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 120px, 140px"
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Name: Bold, prominent white typography */}
        <h3 className="font-tech text-xl sm:text-2xl font-black text-white uppercase italic tracking-wide group-hover:text-cyan-300 transition-colors mt-5">
          {member.name}
        </h3>

        {/* Role Pill: Dark-tinted cyan pill button directly below the name with bright cyan text */}
        <div className="mt-2.5 inline-flex items-center px-4 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase shadow-[0_0_12px_rgba(0,240,255,0.15)]">
          {member.designation}
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full mt-auto">
        {/* Divider: Thin, subtle horizontal line separating profile area from metadata */}
        <div className="w-full my-5 border-t border-slate-700/60" />

        {/* Metadata Stack: Centered text content */}
        <div className="space-y-1">
          {/* Department of CSE (clean white or light gray text) */}
          <p className="text-sm font-sans text-slate-200 font-medium tracking-wide">
            {department}
          </p>

          {/* Batch: (bright cyan text label) */}
          {batch ? (
            <p className="text-xs font-mono font-semibold tracking-wider">
              <span className="text-cyan-400">Batch: </span>
              <span className="text-cyan-300">{batch}</span>
            </p>
          ) : (
            <p className="text-xs font-mono text-slate-400">
              <span className="text-cyan-400/80">{member.roleType}</span>
            </p>
          )}
        </div>

        {/* Subtle Social Links Row */}
        {hasLinks && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-center gap-3">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s GitHub`}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn`}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {links.email && (
              <a
                href={`mailto:${links.email}`}
                aria-label={`Email ${member.name}`}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-110"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
