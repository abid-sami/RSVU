"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: "bg-red-500/20 text-red-400 border-red-500/30",
      btn: "bg-red-500 hover:bg-red-400 text-white",
    },
    warning: {
      icon: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      btn: "bg-amber-500 hover:bg-amber-400 text-black",
    },
    info: {
      icon: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      btn: "bg-cyan-500 hover:bg-cyan-400 text-cyan-950",
    },
  };

  const style = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0c121d] border border-slate-700/60 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${style.icon}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{message}</p>
          </div>
          <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${style.btn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
