"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type AdminRole = "admin" | "inventory_manager";

export interface AdminUser {
  email: string;
  name: string;
  role: AdminRole;
}

interface AdminAuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  adminEmail: string | null;
  role: AdminRole | null;
  failedAttempts: number;
  requiresCaptcha: boolean;
  isLockedOut: boolean;
  lockoutEndTime: number | null;
}

interface LoginResult {
  success: boolean;
  error?: string;
  role?: AdminRole;
  isLockedOut?: boolean;
}

interface AdminAuthContextType extends AdminAuthState {
  login: (email: string, password: string, captchaAnswer?: string) => Promise<LoginResult>;
  logout: () => void;
  captchaQuestion: { question: string; answer: number } | null;
  generateCaptcha: () => void;
  canAccess: (path: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const STORAGE_KEY = "rsvu_admin_auth";
const LOCKOUT_KEY = "rsvu_admin_lockout";
const ATTEMPTS_KEY = "rsvu_admin_attempts";

function generateCaptchaQuestion(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return { question: `What is ${a} + ${b}?`, answer: a + b };
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    isAuthenticated: false,
    user: null,
    adminEmail: null,
    role: null,
    failedAttempts: 0,
    requiresCaptcha: false,
    isLockedOut: false,
    lockoutEndTime: null,
  });

  const [captchaQuestion, setCaptchaQuestion] = useState<{ question: string; answer: number } | null>(null);

  // Restore auth state and check 24h lockout on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isAuthenticated && parsed.user) {
          setState((prev) => ({
            ...prev,
            isAuthenticated: true,
            user: parsed.user,
            adminEmail: parsed.user.email,
            role: parsed.user.role,
          }));
        }
      }

      const lockoutEnd = parseInt(localStorage.getItem(LOCKOUT_KEY) || "0", 10);
      const attempts = parseInt(localStorage.getItem(ATTEMPTS_KEY) || "0", 10);

      if (lockoutEnd && Date.now() < lockoutEnd) {
        setState((prev) => ({
          ...prev,
          failedAttempts: attempts,
          requiresCaptcha: true,
          isLockedOut: true,
          lockoutEndTime: lockoutEnd,
        }));
        setCaptchaQuestion(generateCaptchaQuestion());
      } else if (lockoutEnd && Date.now() >= lockoutEnd) {
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const generateCaptcha = useCallback(() => {
    setCaptchaQuestion(generateCaptchaQuestion());
  }, []);

  // Check if current role has permission to access a path
  const canAccess = useCallback(
    (path: string): boolean => {
      if (!state.isAuthenticated || !state.role) return false;
      if (state.role === "admin") return true;

      // Inventory Manager only has access to Components & Borrowings
      if (state.role === "inventory_manager") {
        return path === "/admin/components" || path === "/admin/borrowings";
      }

      return false;
    },
    [state.isAuthenticated, state.role]
  );

  const login = useCallback(
    async (
      email: string,
      password: string,
      captchaAnswer?: string
    ): Promise<LoginResult> => {
      // Check client-side 24-hour lockout
      if (state.isLockedOut && state.lockoutEndTime) {
        if (Date.now() < state.lockoutEndTime) {
          const msLeft = state.lockoutEndTime - Date.now();
          const hours = Math.floor(msLeft / (1000 * 60 * 60));
          const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);
          const timeStr =
            hours > 0
              ? `${hours}h ${minutes}m`
              : minutes > 0
              ? `${minutes}m ${seconds}s`
              : `${seconds}s`;

          return {
            success: false,
            isLockedOut: true,
            error: `Security Alert: This account is blocked for 24 hours due to 10 failed attempts. Remaining: ${timeStr}.`,
          };
        }
        // Lockout expired
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
        setState((prev) => ({
          ...prev,
          failedAttempts: 0,
          isLockedOut: false,
          lockoutEndTime: null,
          requiresCaptcha: false,
        }));
      }

      try {
        const res = await fetch("/api/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            captchaAnswer,
            expectedCaptcha: captchaQuestion?.answer,
          }),
        });

        const data = await res.json();

        // Account is locked out for 24 hours (HTTP 423)
        if (res.status === 423 || data.isLockedOut) {
          const lockoutTimestamp = data.lockedUntil ? new Date(data.lockedUntil).getTime() : Date.now() + 24 * 60 * 60 * 1000;
          localStorage.setItem(LOCKOUT_KEY, String(lockoutTimestamp));
          localStorage.setItem(ATTEMPTS_KEY, "10");

          setState((prev) => ({
            ...prev,
            isLockedOut: true,
            lockoutEndTime: lockoutTimestamp,
            failedAttempts: 10,
            requiresCaptcha: true,
          }));

          return {
            success: false,
            isLockedOut: true,
            error: data.error || "Account blocked for 24 hours.",
          };
        }

        if (!data.success) {
          const attempts = data.failedAttempts || state.failedAttempts + 1;
          localStorage.setItem(ATTEMPTS_KEY, String(attempts));

          if (data.requiresCaptcha || attempts >= 3) {
            setCaptchaQuestion(generateCaptchaQuestion());
          }

          setState((prev) => ({
            ...prev,
            failedAttempts: attempts,
            requiresCaptcha: data.requiresCaptcha || attempts >= 3,
          }));

          return {
            success: false,
            error: data.error || "Invalid credentials.",
          };
        }

        // Authentication Successful
        const user: AdminUser = {
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        };

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ isAuthenticated: true, user })
        );
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);

        setState({
          isAuthenticated: true,
          user,
          adminEmail: user.email,
          role: user.role,
          failedAttempts: 0,
          requiresCaptcha: false,
          isLockedOut: false,
          lockoutEndTime: null,
        });

        setCaptchaQuestion(null);
        return { success: true, role: user.role };
      } catch (err: any) {
        return {
          success: false,
          error: "Connection error. Please verify backend service.",
        };
      }
    },
    [state.isLockedOut, state.lockoutEndTime, state.failedAttempts, captchaQuestion]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      isAuthenticated: false,
      user: null,
      adminEmail: null,
      role: null,
      failedAttempts: 0,
      requiresCaptcha: false,
      isLockedOut: false,
      lockoutEndTime: null,
    });
    setCaptchaQuestion(null);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        captchaQuestion,
        generateCaptcha,
        canAccess,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
