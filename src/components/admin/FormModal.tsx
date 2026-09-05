"use client";

import React from "react";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  maxWidth?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel = "Save",
  isSubmitting = false,
  maxWidth = "max-w-lg",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className={`bg-[#0c121d] border border-slate-700/60 rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/40">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">{children}</div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-700/40 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable form field helper
export const FormField: React.FC<{
  label: string;
  children: React.ReactNode;
  required?: boolean;
}> = ({ label, children, required }) => (
  <div>
    <label className="block text-xs font-medium text-slate-300 mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

export const inputClass =
  "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors placeholder:text-slate-500";

export const selectClass =
  "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-colors";
