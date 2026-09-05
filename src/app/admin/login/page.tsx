"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Lock, Mail, KeyRound, ShieldAlert, Eye, EyeOff, Cpu, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const { isAuthenticated, login, requiresCaptcha, captchaQuestion, failedAttempts } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Tiny delay for UX
    setTimeout(() => {
      const result = login(email, password, captchaAnswer);
      if (result.success) {
        router.replace("/admin");
      } else {
        setError(result.error || "Login failed");
        setCaptchaAnswer("");
      }
      setIsSubmitting(false);
    }, 300);
  };

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#060a10] flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0" style={{
          backgroundSize: "48px 48px",
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.015) 1px, transparent 1px)
          `,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">RSVU Admin Panel</h1>
          <p className="text-sm text-slate-400 mt-1">Robotics Society of Varendra University</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0c121d] border border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Secure Login</span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Failed attempts warning */}
          {failedAttempts > 0 && failedAttempts < 5 && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-300">
                {5 - failedAttempts} login attempt{5 - failedAttempts !== 1 ? "s" : ""} remaining before lockout.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rsvu.edu.bd"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA (shown after failed attempts) */}
            {requiresCaptcha && captchaQuestion && (
              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">CAPTCHA Verification</span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{captchaQuestion.question}</p>
                <input
                  type="text"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Your answer"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-amber-500/30 text-slate-200 text-sm focus:border-amber-400 focus:outline-none transition-colors placeholder:text-slate-500"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-cyan-950 border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-4 text-center text-[11px] text-slate-500 font-mono">
            Authorized administrators only
          </p>
        </div>
      </div>
    </div>
  );
}
