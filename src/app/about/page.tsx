import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { advisorsList } from "@/data/membersData";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Compass,
  Cpu,
  Target,
  Trophy,
  Users,
  Award,
  Calendar,
  Sparkles,
  Zap,
  Code,
  ShieldCheck,
  ChevronRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the history, vision, mission, and advisors of Robotics Society of Varendra University.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2014",
      title: "The Genesis",
      description: "Founded by passionate CSE & EEE undergraduates at Varendra University to promote hands-on micro-controller coding and basic analog bots.",
    },
    {
      year: "2019",
      title: "First Inter-University Podium",
      description: "RSVU robotics squads secured their first national award in Line Following at RUET, placing Varendra University firmly on the robotics map.",
    },
    {
      year: "2021",
      title: "Establishment of Lab 402",
      description: "Inauguration of the dedicated Robotics & Embedded Systems Research Lab with university funding for high-RPM motor test benches.",
    },
    {
      year: "2023",
      title: "Launch of RoboSpark",
      description: "Organized Northern Bangladesh's premier robotics festival, hosting 400+ competitors from across the country.",
    },
    {
      year: "2025-2026",
      title: "Autonomous AI Rovers & Beyond",
      description: "Expanding into ROS 2 autonomous mapping, computer vision edge AI, and preparing international contest delegations.",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ABOUT RSVU ROBOTICS</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          ENGINEERING <span className="text-cyan-400">EXCELLENCE</span> SINCE 2014
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          The Robotics Society of Varendra University (RSVU) is the apex student organization cultivating hardware innovation, robotics championships, and autonomous technology research in Rajshahi.
        </p>
      </div>

      {/* Main Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
        <div className="lg:col-span-6 cyber-panel cyber-corner rounded-2xl p-8 sm:p-10 border border-cyan-500/30">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">
            OUR GUIDING ETHOS
          </span>
          <h2 className="font-tech text-2xl sm:text-3xl font-black text-white italic tracking-wide uppercase">
            &ldquo;LEARN. BUILD. INNOVATE.&rdquo;
          </h2>
          <div className="w-16 h-1 bg-cyan-400 my-4"></div>

          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Founded with the fundamental belief that true robotics engineering happens when theoretical classroom physics meets physical electronic components. Our members do not just study diagrams; they design multi-layer PCBs, tune PID feedback loops with laser timers, mill custom chassis, and push lithium-polymer batteries to their peak discharge limits.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            We foster an inclusive, cross-disciplinary community where computer science software architects, electrical power engineers, and mechanical designers collaborate as one unified collective.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-cyan-500/20 text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Free Student Mentorship</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Full Lab Equipment Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Competition Funding Support</span>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="cyber-panel rounded-2xl p-8 border border-cyan-500/20 bg-gradient-to-r from-[#0d1420] to-[#070b12]">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-tech text-xl font-bold text-white uppercase italic tracking-wide">
              OUR VISION
            </h3>
            <p className="mt-3 text-sm text-slate-300 font-sans leading-relaxed">
              To transform Varendra University into the premier robotics and autonomous systems research hub of Bangladesh, producing world-class engineers capable of solving complex automation, industrial robotics, and AI challenges on a global stage.
            </p>
          </div>

          <div className="cyber-panel rounded-2xl p-8 border border-cyan-500/20 bg-gradient-to-r from-[#0d1420] to-[#070b12]">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-tech text-xl font-bold text-white uppercase italic tracking-wide">
              OUR MISSION
            </h3>
            <p className="mt-3 text-sm text-slate-300 font-sans leading-relaxed">
              Democratize access to state-of-the-art robotics hardware, facilitate year-round rigorous technical bootcamps, compete at the highest tier of national and international collegiate robotics contests, and inspire the next generation through open STEM outreach.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="mb-20">
        <SectionHeading
          badge="JOURNEY CHRONOLOGY"
          title="MILESTONES OF"
          highlightText="RSVU ROBOTICS"
          subtitle="How our society evolved from a modest workbench into an award-winning robotics vanguard."
        />

        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-32 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Year badge on left for desktop */}
              <div className="hidden sm:block absolute -left-32 top-0 font-tech font-bold text-lg text-cyan-400 italic">
                {m.year}
              </div>

              {/* Glowing Dot on timeline */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#06090e] border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300"></div>

              <div className="cyber-panel rounded-xl p-6 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
                <span className="sm:hidden font-mono text-xs text-cyan-400 font-bold block mb-1">
                  YEAR {m.year}
                </span>
                <h4 className="font-tech text-xl font-bold text-white uppercase italic tracking-wide">
                  {m.title}
                </h4>
                <p className="mt-2 text-sm text-slate-300 font-sans leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Advisors Section */}
      <div className="mb-20">
        <SectionHeading
          badge="ACADEMIC PATRONAGE"
          title="FACULTY ADVISORS &"
          highlightText="MENTORS"
          subtitle="Distinguished university professors who provide academic oversight, laboratory grants, and technical validation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {advisorsList.map((adv) => (
            <div
              key={adv.id}
              className="cyber-panel rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all group"
            >
              <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0 border-2 border-cyan-500/40 group-hover:border-cyan-400">
                <Image
                  src={adv.avatar}
                  alt={adv.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>

              <div className="text-center sm:text-left space-y-2">
                <h4 className="font-tech text-xl font-bold text-white uppercase italic tracking-wide group-hover:text-cyan-300 transition-colors">
                  {adv.name}
                </h4>
                <p className="text-xs font-mono text-cyan-400 font-semibold">
                  {adv.designation}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  {adv.department}
                </p>
                <p className="text-xs text-slate-300 font-sans pt-2 leading-relaxed">
                  {adv.bio}
                </p>

                <div className="pt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {adv.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="text-center pt-8 border-t border-cyan-500/15">
        <Link
          href="/members"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-sm tracking-wider uppercase italic transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          <span>MEET THE COMPLETE EXECUTIVE COMMITTEE</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
