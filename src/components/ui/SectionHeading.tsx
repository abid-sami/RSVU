import React from "react";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightText,
  subtitle,
  align = "center",
}) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 ${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl`}>
      {/* Badge with pulse dot */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono tracking-wider uppercase mb-3 ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span>{badge}</span>
      </div>

      {/* Main Bold Italic Heading */}
      <h2 className="font-tech text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase italic leading-tight">
        {title}{" "}
        {highlightText && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 text-glow-subtle">
            {highlightText}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Cyber accent line */}
      <div className={`mt-4 flex items-center gap-2 ${isCenter ? "justify-center" : "justify-start"}`}>
        <div className="w-12 h-[2px] bg-cyan-500/80"></div>
        <div className="w-2 h-2 rotate-45 border border-cyan-400 bg-cyan-400/20"></div>
        <div className="w-12 h-[2px] bg-cyan-500/80"></div>
      </div>
    </div>
  );
};
