"use client";

import React, { useState, useMemo } from "react";
import { componentsList } from "@/data/componentsData";
import { ComponentCard } from "@/components/components-catalog/ComponentCard";
import { Cpu, Search, AlertTriangle } from "lucide-react";

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Microcontrollers",
    "Sensors",
    "Motors & Drivers",
    "Power & Battery",
    "Wireless & IoT",
    "Chassis & Hardware",
  ];

  const filteredComponents = useMemo(() => {
    return componentsList.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-cyan text-xs font-mono uppercase tracking-wider mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>HARDWARE VAULT & INVENTORY</span>
        </div>
        <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tight text-glow">
          COMPONENTS <span className="text-cyan-400">CATALOG</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Catalog of development boards, precision sensors, high-current drivers, and battery packs available for RSVU research teams and university projects.
        </p>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parts, chips, sensors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none shadow-inner"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-400 text-cyan-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Count Indicator */}
      <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
        <div>
          Showing <span className="text-cyan-400 font-bold">{filteredComponents.length}</span> components
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </div>
      </div>

      {/* Components Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredComponents.map((item) => (
            <ComponentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="cyber-panel rounded-2xl p-12 text-center border border-cyan-500/20 max-w-md mx-auto">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h3 className="font-tech text-lg font-bold text-white uppercase italic">
            NO HARDWARE FOUND
          </h3>
          <p className="mt-2 text-xs text-slate-400 font-mono">
            No components matched your search &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 px-4 py-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-xs uppercase"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
