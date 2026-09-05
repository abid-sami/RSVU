"use client";

import React, { useEffect } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useAdminData } from "@/contexts/AdminDataContext";

export const Toast: React.FC = () => {
  const { toast, clearToast } = useAdminData();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(clearToast, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[110] animate-[slideUp_0.3s_ease-out]">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${
          isSuccess
            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
            : "bg-red-500/15 border-red-500/30 text-red-300"
        }`}
      >
        {isSuccess ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
        <span className="text-sm font-medium">{toast.message}</span>
        <button onClick={clearToast} className="ml-2 text-slate-400 hover:text-white transition-colors shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
