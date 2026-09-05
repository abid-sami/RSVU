"use client";

import React from "react";
import Link from "next/link";
import { useAdminData } from "@/contexts/AdminDataContext";
import { StatsCard } from "@/components/admin/StatsCard";
import {
  Cpu,
  ArrowLeftRight,
  Users,
  CalendarDays,
  Trophy,
  ImageIcon,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  { label: "Manage Components", href: "/admin/components", icon: Cpu, color: "cyan" as const },
  { label: "Borrowings & Returns", href: "/admin/borrowings", icon: ArrowLeftRight, color: "emerald" as const },
  { label: "Manage Events", href: "/admin/events", icon: CalendarDays, color: "amber" as const },
  { label: "Manage Members", href: "/admin/members", icon: Users, color: "purple" as const },
  { label: "Achievements", href: "/admin/achievements", icon: Trophy, color: "rose" as const },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon, color: "slate" as const },
];

export default function AdminDashboardPage() {
  const { getStats } = useAdminData();
  const stats = getStats();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back, Admin</h2>
        <p className="text-sm text-slate-400 mt-1">Here&apos;s an overview of your RSVU Robotics data.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatsCard label="Total Components" value={stats.totalComponents} icon={Cpu} color="cyan" />
        <StatsCard label="Components Given" value={stats.totalComponentsGiven} icon={ArrowLeftRight} color="emerald" />
        <StatsCard label="Total Members" value={stats.totalMembers} icon={Users} color="purple" />
        <StatsCard label="Total Events" value={stats.totalEvents} icon={CalendarDays} color="amber" />
        <StatsCard label="Achievements" value={stats.totalAchievements} icon={Trophy} color="rose" />
        <StatsCard label="Gallery Images" value={stats.totalGalleryImages} icon={ImageIcon} color="slate" />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-800/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
                <link.icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <span className="flex-1 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
