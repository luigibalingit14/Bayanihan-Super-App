import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        "ph-blue": "#0032A0",
        "ph-red": "#BF0D3E",
        "ph-yellow": "#FED141",
        "ph-blue-light": "#1a4fc8",
        "ph-blue-dark": "#002a80",
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.18)",
          hover: "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "ph-gradient": "linear-gradient(135deg, #001a5c 0%, #003080 40%, #002050 100%)",
        "hero-radial":
          "radial-gradient(ellipse at top, rgba(0,56,168,0.4) 0%, transparent 70%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
        "glass-hover":
          "0 16px 48px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.25)",
        "ph-glow": "0 0 24px rgba(0, 56, 168, 0.6)",
        "red-glow": "0 0 24px rgba(206, 17, 38, 0.6)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
