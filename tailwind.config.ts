import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#06090e",
        surface: {
          DEFAULT: "#0b1017",
          hover: "#101722",
          card: "#0d131d",
          border: "#182433",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          electric: "#00f0ff",
          glow: "rgba(0, 240, 255, 0.35)",
        },
        cyber: {
          black: "#040608",
          dark: "#080c12",
          card: "#0e1520",
          border: "#1b283b",
          light: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 240, 255, 0.4)",
        "cyan-glow-sm": "0 0 12px -2px rgba(0, 240, 255, 0.3)",
        "cyan-glow-lg": "0 0 45px -8px rgba(0, 240, 255, 0.5)",
        "card-subtle": "0 8px 30px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
        "cyber-dots": "radial-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px)",
        "hero-gradient": "linear-gradient(180deg, rgba(6, 9, 14, 0.7) 0%, rgba(6, 9, 14, 0.88) 60%, #06090e 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanline 8s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
