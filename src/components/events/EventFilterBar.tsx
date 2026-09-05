"use client";

import React from "react";
import { Sparkles, Radio, Calendar, Clock, Layers } from "lucide-react";

export type EventStatusFilter = "all" | "ongoing" | "upcoming" | "past";

export interface EventFilterBarProps {
  currentFilter: EventStatusFilter;
  onFilterChange: (filter: EventStatusFilter) => void;
  counts?: {
    all?: number;
    ongoing: number;
    upcoming: number;
    past: number;
  };
  className?: string;
  hideAllOption?: boolean;
}

export const EventFilterBar: React.FC<EventFilterBarProps> = ({
  currentFilter,
  onFilterChange,
  counts,
  className = "",
  hideAllOption = false,
}) => {
  const allFilterOptions: {
    id: EventStatusFilter;
    label: string;
    icon: React.ReactNode;
    isLive?: boolean;
    activeClass: string;
  }[] = [
    {
      id: "all",
      label: "All Events",
      icon: <Layers className="w-3.5 h-3.5" />,
      activeClass: "bg-cyan-400 text-cyan-950 shadow-[0_0_20px_rgba(0,240,255,0.5)] border-cyan-300",
    },
    {
      id: "ongoing",
      label: "Running",
      icon: <Radio className="w-3.5 h-3.5" />,
      isLive: true,
      activeClass:
        "bg-emerald-500 text-emerald-950 font-black shadow-[0_0_25px_rgba(16,185,129,0.6)] border-emerald-300",
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: <Calendar className="w-3.5 h-3.5" />,
      activeClass: "bg-cyan-400 text-cyan-950 shadow-[0_0_20px_rgba(0,240,255,0.5)] border-cyan-300",
    },
    {
      id: "past",
      label: "Past Events",
      icon: <Clock className="w-3.5 h-3.5" />,
      activeClass: "bg-slate-200 text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.3)] border-slate-100",
    },
  ];

  const filterOptions = hideAllOption
    ? allFilterOptions.filter((opt) => opt.id !== "all")
    : allFilterOptions;

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <div className="cyber-panel p-1.5 rounded-2xl border border-cyan-500/30 bg-[#080d16]/90 backdrop-blur-md flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 shadow-[0_10px_35px_rgba(0,0,0,0.6)] max-w-full">
        {filterOptions.map((option) => {
          const isActive = currentFilter === option.id;
          const count = counts ? counts[option.id] : undefined;

          return (
            <button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? option.activeClass
                  : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-cyan-500/40 hover:bg-slate-800/60"
              }`}
            >
             

              {/* Filter Icon */}
              <span className={isActive ? "" : option.isLive ? "text-emerald-400" : "text-cyan-400"}>
                {option.icon}
              </span>

              {/* Label */}
              <span>{option.label}</span>

              {/* Count Badge if available */}
              {typeof count === "number" && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-normal ${
                    isActive
                      ? "bg-black/20 text-current"
                      : "bg-slate-800 border border-slate-700/80 text-slate-300"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
