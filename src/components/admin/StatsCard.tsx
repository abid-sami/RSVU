"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: "cyan" | "emerald" | "amber" | "purple" | "rose" | "slate";
}

const colorMap = {
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", icon: "text-cyan-400", value: "text-cyan-300" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "text-emerald-400", value: "text-emerald-300" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "text-amber-400", value: "text-amber-300" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", icon: "text-purple-400", value: "text-purple-300" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", icon: "text-rose-400", value: "text-rose-300" },
  slate: { bg: "bg-slate-500/10", border: "border-slate-500/30", icon: "text-slate-400", value: "text-slate-300" },
};

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon, color = "cyan" }) => {
  const c = colorMap[color];
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 transition-all hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${c.value}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
};
