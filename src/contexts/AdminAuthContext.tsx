"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

// =============================================
// Admin Authentication Context
// Client-side auth with brute-force protection
// Replace with Supabase Auth later
// =============================================

interface AdminAuthState {
  isAuthenticated: boolean;
  adminEmail: string | null;
  failedAttempts: number;
  requiresCaptcha: boolean;
  isLockedOut: boolean;
  lockoutEndTime: number | null;
}

interface AdminAuthContextType extends AdminAuthState {
  login: (email: string, password: string, captchaAnswer?: string) => { success: boolean; error?: string };
  logout: () => void;
  captchaQuestion: { question: string; answer: number } | null;
  generateCaptcha: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const STORAGE_KEY = "rsvu_admin_auth";
const ATTEMPTS_KEY = "rsvu_admin_attempts";
const LOCKOUT_KEY = "rsvu_admin_lockout";
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

// Default admin credentials (replace with Supabase Auth later)
const ADMIN_EMAIL = "admin@rsvu.edu.bd";
const ADMIN_PASSWORD = "rsvu2024";

function generateCaptchaQuestion(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return { question: `What is ${a} + ${b}?`, answer: a + b };
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    isAuthenticated: false,
    adminEmail: null,
    failedAttempts: 0,
    requiresCaptcha: false,
    isLockedOut: false,
    lockoutEndTime: null,
  });

  const [captchaQuestion, setCaptchaQuestion] = useState<{ question: string; answer: number } | null>(null);

  // Restore auth state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isAuthenticated && parsed.adminEmail) {
          setState((prev) => ({ ...prev, isAuthenticated: true, adminEmail: parsed.adminEmail }));
        }
      }

      const attempts = parseInt(sessionStorage.getItem(ATTEMPTS_KEY) || "0", 10);
      const lockoutEnd = parseInt(sessionStorage.getItem(LOCKOUT_KEY) || "0", 10);

      if (lockoutEnd && Date.now() < lockoutEnd) {
        setState((prev) => ({
          ...prev,
          failedAttempts: attempts,
          requiresCaptcha: true,
          isLockedOut: true,
          lockoutEndTime: lockoutEnd,
        }));
        setCaptchaQuestion(generateCaptchaQuestion());
      } else if (attempts >= MAX_ATTEMPTS) {
        setState((prev) => ({
          ...prev,
          failedAttempts: attempts,
          requiresCaptcha: true,
        }));
        setCaptchaQuestion(generateCaptchaQuestion());
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const generateCaptcha = useCallback(() => {
    setCaptchaQuestion(generateCaptchaQuestion());
  }, []);

  const login = useCallback(
    (email: string, password: string, captchaAnswer?: string): { success: boolean; error?: string } => {
      // Check lockout
      if (state.isLockedOut && state.lockoutEndTime) {
        if (Date.now() < state.lockoutEndTime) {
          const remaining = Math.ceil((state.lockoutEndTime - Date.now()) / 1000);
          return { success: false, error: `Account temporarily locked. Try again in ${remaining} seconds.` };
        }
        // Lockout expired, reset
        sessionStorage.removeItem(LOCKOUT_KEY);
        sessionStorage.setItem(ATTEMPTS_KEY, "0");
        setState((prev) => ({
          ...prev,
          failedAttempts: 0,
          isLockedOut: false,
          lockoutEndTime: null,
          requiresCaptcha: false,
        }));
      }

      // Verify CAPTCHA if required
      if (state.requiresCaptcha && captchaQuestion) {
        if (!captchaAnswer || parseInt(captchaAnswer, 10) !== captchaQuestion.answer) {
          setCaptchaQuestion(generateCaptchaQuestion());
          return { success: false, error: "Incorrect CAPTCHA answer. Please try again." };
        }
      }

      // Verify credentials
      if (email.toLowerCase().trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Success
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, adminEmail: email }));
        sessionStorage.setItem(ATTEMPTS_KEY, "0");
        sessionStorage.removeItem(LOCKOUT_KEY);
        setState({
          isAuthenticated: true,
          adminEmail: email,
          failedAttempts: 0,
          requiresCaptcha: false,
          isLockedOut: false,
          lockoutEndTime: null,
        });
        setCaptchaQuestion(null);
        return { success: true };
      }

      // Failed attempt
      const newAttempts = state.failedAttempts + 1;
      sessionStorage.setItem(ATTEMPTS_KEY, String(newAttempts));

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutEnd = Date.now() + LOCKOUT_DURATION;
        sessionStorage.setItem(LOCKOUT_KEY, String(lockoutEnd));
        setCaptchaQuestion(generateCaptchaQuestion());
        setState((prev) => ({
          ...prev,
          failedAttempts: newAttempts,
          requiresCaptcha: true,
          isLockedOut: true,
          lockoutEndTime: lockoutEnd,
        }));
        return {
          success: false,
          error: `Too many failed attempts. Account locked for 5 minutes. CAPTCHA verification required.`,
        };
      }

      const remaining = MAX_ATTEMPTS - newAttempts;
      if (newAttempts >= MAX_ATTEMPTS - 1) {
        setCaptchaQuestion(generateCaptchaQuestion());
      }

      setState((prev) => ({
        ...prev,
        failedAttempts: newAttempts,
        requiresCaptcha: newAttempts >= MAX_ATTEMPTS - 1,
      }));

      return {
        success: false,
        error: `Invalid credentials. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
      };
    },
    [state.failedAttempts, state.isLockedOut, state.lockoutEndTime, state.requiresCaptcha, captchaQuestion]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      isAuthenticated: false,
      adminEmail: null,
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
