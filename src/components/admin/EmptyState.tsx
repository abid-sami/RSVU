"use client";

import React from "react";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data yet",
  message = "Get started by adding your first item.",
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mb-4">
        {icon || <PackageOpen className="w-8 h-8 text-slate-500" />}
      </div>
      <h3 className="text-base font-semibold text-slate-300">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cyan-950 text-sm font-semibold transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
