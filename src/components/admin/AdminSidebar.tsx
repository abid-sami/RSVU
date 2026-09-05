"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Cpu,
  ArrowLeftRight,
  CalendarDays,
  Users,
  Trophy,
  ImageIcon,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Components", href: "/admin/components", icon: Cpu },
  { label: "Borrowings", href: "/admin/borrowings", icon: ArrowLeftRight },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Members", href: "/admin/members", icon: Users },
  { label: "Achievements", href: "/admin/achievements", icon: Trophy },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, onLogout }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#080d16] border-r border-slate-800/60 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-slate-800/60 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide">RSVU Admin</span>
              <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-widest">Control Panel</span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Navigation</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 ${isActive ? "text-cyan-400" : ""}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-800/60">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
