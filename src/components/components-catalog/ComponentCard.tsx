import React from "react";
import Image from "next/image";
import { ComponentItem } from "@/data/componentsData";

interface ComponentCardProps {
  item: ComponentItem;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ item }) => {
  return (
    <div className="cyber-panel rounded-xl overflow-hidden flex flex-col border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group">
      {/* Top Image Preview (1:1 Aspect Ratio) & Category Tag */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d131d] via-[#0d131d]/30 to-transparent"></div>

        {/* Category Tag */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-mono text-[8px] sm:text-[9px] uppercase backdrop-blur-md">
            {item.category}
          </span>
        </div>
      </div>

      {/* Component Title */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-center">
        <h4 className="font-tech text-[11px] sm:text-[13px] font-bold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide line-clamp-2 leading-tight">
          {item.name}
        </h4>
      </div>
    </div>
  );
};
