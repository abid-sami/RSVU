"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Facebook,
  Linkedin,
  Github,
  Youtube,
  CheckCircle2,
  Clock,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 3500);
  };

  const faqs = [
    {
      q: "Who can join the Robotics Society of Varendra University?",
      a: "Membership is open to all enrolled undergraduate students of Varendra University from any engineering or science department (CSE, EEE, Pharmacy, etc.). No prior robotics experience is needed for freshman recruitments.",
    },
    {
      q: "How can non-VU students or teams register for RoboSpark?",
      a: "RoboSpark is a national open championship. Teams from any accredited polytechnic institute or university in Bangladesh are warmly welcomed to compete in Robo Soccer, LFR, and Hardware Showcase.",
    },
    {
      q: "How does the Component Requisition system work?",
      a: "Active society members can requisition development boards, sensors, and actuators from Lab 402 for up to 14 days by submitting their student ID and project plan to the Technical Lead.",
    },
    {
      q: "Where is the physical robotics research lab located?",
      a: "Our dedicated lab is located at Room 402, Engineering Block, Varendra University Permanent Campus, Bypass Road, Chandrima, Rajshahi.",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>COMMUNICATION TELEMETRY</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          CONTACT <span className="text-cyan-400">RSVU ROBOTICS</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Have an inquiry about upcoming tournaments, sponsorship partnerships, or joining our research squads? We look forward to connecting.
        </p>
      </div>

      {/* Main Grid: Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        {/* Left Column: University & Lab Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="cyber-panel cyber-corner rounded-2xl p-8 border border-cyan-500/30">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">
              PERMANENT HEADQUARTERS
            </span>
            <h3 className="font-tech text-2xl font-bold text-white uppercase italic tracking-wide">
              {siteConfig.fullName}
            </h3>

            <div className="mt-6 space-y-4 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <strong className="block text-white font-tech uppercase text-xs">University Campus:</strong>
                  <span>{siteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <strong className="block text-white font-tech uppercase text-xs">Physical Lab:</strong>
                  <span>{siteConfig.contact.labLocation}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-slate-300">
                  <strong className="block text-white font-tech uppercase text-xs">Email:</strong>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-cyan-400 hover:underline font-mono">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-slate-300">
                  <strong className="block text-white font-tech uppercase text-xs">Hotline:</strong>
                  <span className="font-mono">{siteConfig.contact.phone}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-cyan-500/20">
              <span className="text-xs font-mono text-slate-400 block mb-3 uppercase">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="cyber-panel rounded-2xl p-8 sm:p-10 border border-cyan-500/25 bg-gradient-to-b from-[#0e1624] to-[#070b12]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                DIRECT TRANSMISSION
              </span>
            </div>
            <h3 className="font-tech text-2xl font-black text-white uppercase italic tracking-wide">
              SEND A MESSAGE
            </h3>
            <p className="mt-1 text-xs text-slate-400 font-sans">
              Our executive board responds within 24 to 48 hours.
            </p>

            {submitted ? (
              <div className="my-12 py-10 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
                <h4 className="font-tech text-2xl font-bold text-white uppercase italic">
                  TRANSMISSION SENT SUCCESSFULLY
                </h4>
                <p className="text-xs text-slate-300 font-mono max-w-sm mx-auto">
                  Thank you for reaching out. We have logged your message and forwarded it to our executive secretariat.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      YOUR FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanzim Ahmed"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-cyan-500/20 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. tanzim@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-cyan-500/20 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    SUBJECT TOPIC
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-cyan-500/20 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  >
                    <option>General Inquiry</option>
                    <option>RoboSpark 2026 Registration</option>
                    <option>Hardware Component Checkout</option>
                    <option>University Partnership & Sponsorship</option>
                    <option>Join RSVU Recruitment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your inquiry or proposal here..."
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-cyan-500/20 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-tech font-bold text-xs uppercase tracking-wider italic flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="pt-12 border-t border-cyan-500/15">
        <SectionHeading
          badge="KNOWLEDGE ARCHIVE"
          title="FREQUENTLY ASKED"
          highlightText="QUESTIONS"
          subtitle="Everything you need to know about joining, borrowing hardware, and competing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="cyber-panel rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-tech text-base font-bold text-white uppercase italic">
                    {faq.q}
                  </h4>
                  <p className="mt-2 text-xs text-slate-300 font-sans leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
