"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
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
  ShieldCheck,
} from "lucide-react";

const allNavItems = [
  { label: "Home", href: "/", icon: Home, roles: ["admin", "inventory_manager"] },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["admin"] },
  { label: "Components", href: "/admin/components", icon: Cpu, roles: ["admin", "inventory_manager"] },
  { label: "Borrowings", href: "/admin/borrowings", icon: ArrowLeftRight, roles: ["admin", "inventory_manager"] },
  { label: "Events", href: "/admin/events", icon: CalendarDays, roles: ["admin"] },
  { label: "Members", href: "/admin/members", icon: Users, roles: ["admin"] },
  { label: "Achievements", href: "/admin/achievements", icon: Trophy, roles: ["admin"] },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon, roles: ["admin"] },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, onLogout }) => {
  const pathname = usePathname();
  const { role, user } = useAdminAuth();

  const isInventoryManager = role === "inventory_manager";

  // Filter items based on current role
  const visibleNavItems = allNavItems.filter((item) =>
    role === "admin" ? true : item.roles.includes(role || "")
  );

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
          <Link
            href={isInventoryManager ? "/admin/components" : "/admin"}
            className="flex items-center gap-2.5"
            onClick={onClose}
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide">
                {isInventoryManager ? "RSVU Inventory" : "RSVU Admin"}
              </span>
              <span className="block text-[10px] text-cyan-400 font-mono uppercase tracking-widest">
                {isInventoryManager ? "Components & Borrowing" : "Super Admin Panel"}
              </span>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 py-1 flex items-center justify-between">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Navigation</p>
            {isInventoryManager && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                Restricted
              </span>
            )}
          </div>

          {visibleNavItems.map((item) => {
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

        {/* User Card & Footer */}
        <div className="p-3 border-t border-slate-800/60 space-y-2">
          {user && (
            <div className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800/60 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
