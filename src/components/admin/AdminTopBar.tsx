"use client";

import React from "react";
import { Menu, Shield } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminTopBarProps {
  title: string;
  onMenuToggle: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({ title, onMenuToggle }) => {
  const { role, user } = useAdminAuth();
  const isInventoryManager = role === "inventory_manager";

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
          <div>
            <h1 className="text-lg font-semibold text-white leading-tight">{title}</h1>
            {isInventoryManager && (
              <p className="text-[10px] text-cyan-400 font-mono">Components & Borrowing Access Only</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 font-mono flex items-center gap-1.5">
            <Shield className={`w-3.5 h-3.5 ${isInventoryManager ? "text-cyan-400" : "text-amber-400"}`} />
            <span>{isInventoryManager ? "Inventory Section" : "Super Admin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
