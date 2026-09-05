"use client";

import React, { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { inputClass } from "./FormModal";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  maxSizeMB?: number;
  helpText?: string;
}

/**
 * Resizes and compresses image data using HTML5 Canvas to prevent hitting localStorage quotas.
 */
function compressImage(file: File, maxDim = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG or GIF, preserve raw data URL to keep vectors and animations
    if (file.type === "image/svg+xml" || file.type === "image/gif") {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use image/jpeg for photos or image/webp
        const outputFormat = file.type === "image/png" ? "image/png" : "image/jpeg";
        const compressed = canvas.toDataURL(outputFormat, quality);
        resolve(compressed);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label = "Image",
  value,
  onChange,
  required = false,
  maxSizeMB = 10,
  helpText,
}) => {
  const [mode, setMode] = useState<"device" | "url">(
    value && !value.startsWith("data:") ? "url" : "device"
  );
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${maxSizeMB}MB.`);
      return;
    }

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setError("Unsupported image format. Please use JPG, PNG, WebP, GIF, or SVG.");
      return;
    }

    try {
      setIsProcessing(true);
      const dataUrl = await compressImage(file);
      onChange(dataUrl);
    } catch {
      setError("Failed to read image file from device. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input so the same file can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const isLocalDevice = value?.startsWith("data:");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-slate-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {/* Source Toggle Tabs */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode("device");
              setError(null);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === "device"
                ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Upload className="w-3 h-3" />
            Device Upload
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("url");
              setError(null);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              mode === "url"
                ? "bg-cyan-500/20 text-cyan-400 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            Web URL
          </button>
        </div>
      </div>

      {/* Mode 1: Device Upload (Drag & Drop + File Picker) */}
      {mode === "device" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
            onChange={onFileInputChange}
            className="hidden"
          />
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              isDragging
                ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
                : "border-slate-700/70 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/70"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-slate-200 text-center">
              <span className="text-cyan-400 underline decoration-cyan-400/50 underline-offset-2">
                Click to upload from device
              </span>{" "}
              or drag & drop
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports JPG, PNG, WebP, GIF, SVG (up to {maxSizeMB}MB)
            </p>
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] rounded-xl flex items-center justify-center gap-2 text-xs text-cyan-400">
                <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                Optimizing image...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Web URL */}
      {mode === "url" && (
        <div className="relative">
          <input
            type="url"
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => {
              setError(null);
              onChange(e.target.value);
            }}
            placeholder="https://example.com/image.jpg"
            className={inputClass}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1.5 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Image Preview Box */}
      {value ? (
        <div className="relative flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => setError("Unable to preview this image URL.")}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-xs font-medium text-slate-200">
                {isLocalDevice ? "Image loaded from device" : "Web image loaded"}
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
              {isLocalDevice ? "Local Data URI (optimized)" : value}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              {mode === "device" && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Change file
                </button>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange("");
              setError(null);
            }}
            className="p-1.5 rounded-lg hover:bg-red-500/15 text-slate-400 hover:text-red-400 transition-colors shrink-0"
            title="Remove image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : null}

      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}
    </div>
  );
};
