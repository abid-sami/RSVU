"use client";

import React from "react";
import { Menu, Bell } from "lucide-react";

interface AdminTopBarProps {
  title: string;
  onMenuToggle: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ title, onMenuToggle }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#080d16]/95 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 font-mono">
            Admin Panel
          </div>
        </div>
      </div>
    </header>
  );
};
