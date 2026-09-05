"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminDataProvider } from "@/contexts/AdminDataContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/admin/Toast";

// Page title map
const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/components": "Component Management",
  "/admin/borrowings": "Borrowings & Returns",
  "/admin/events": "Event Management",
  "/admin/members": "Member Management",
  "/admin/achievements": "Achievement Management",
  "/admin/gallery": "Gallery Management",
};

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  // Login page — render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Waiting for mount / not authenticated
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060a10] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const title = pageTitles[pathname] || "Admin";

  const handleLogout = () => {
    setLogoutModalOpen(false);
    logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#060a10] flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setLogoutModalOpen(true)}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <AdminTopBar title={title} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>

      <Toast />

      <ConfirmModal
        isOpen={logoutModalOpen}
        title="Logout Confirmation"
        message="Are you sure you want to logout from the admin panel?"
        confirmLabel="Logout"
        cancelLabel="Stay"
        variant="warning"
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}
