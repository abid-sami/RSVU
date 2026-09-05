"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { upcomingEventCountdown, CountdownConfig } from "@/data/countdownData";
import { Clock, Calendar, MapPin, Sparkles, AlertCircle } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

interface EventCountdownProps {
  config?: CountdownConfig;
}

export const EventCountdown: React.FC<EventCountdownProps> = ({
  config = upcomingEventCountdown,
}) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const target = new Date(config.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.targetDate]);

  // If backend sets isEnabled: false, the countdown gracefully hides
  if (!config.isEnabled) {
    return null;
  }

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      <div className="cyber-panel cyber-corner rounded-2xl p-6 sm:p-8 md:p-10 border border-cyan-500/30 bg-gradient-to-b from-[#0e1724]/90 to-[#070b12]/95 shadow-[0_0_50px_rgba(0,240,255,0.12)]">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block">
                UPCOMING FLAGSHIP EVENT COUNTDOWN
              </span>
              <h3 className="font-tech text-xl sm:text-2xl font-black text-white italic tracking-wide">
                {config.eventTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>OFFICIAL TIMER ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Subtitle & Details */}
        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-300 font-sans">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Target: {new Date(config.targetDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>{config.venue}</span>
          </div>
        </div>

        {/* Big Digit Blocks */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative group rounded-xl bg-[#080d15] border border-cyan-500/20 p-4 sm:p-6 text-center transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]"
            >
              {/* Corner accent marker */}
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-60"></div>

              <div className="font-tech font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight italic text-glow-subtle">
                {mounted ? String(unit.value).padStart(2, "0") : "00"}
              </div>
              <div className="mt-2 text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-cyan-400">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button & Disclaimer */}
        <div className="mt-8 pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Early bot clearance check starts 8:00 AM on arena day. Slots are limited.</span>
          </div>

          {config.registrationOpen && (
            <Link
              href={config.registrationLink || "/events#register"}
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-xs uppercase tracking-wider italic flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>REGISTER YOUR TEAM</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
