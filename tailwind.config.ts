import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#141414",
        "surface-2": "#1C1C1C",
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          dark: "#A8862E",
        },
        foreground: "#FFFFFF",
        muted: "#8A8A8A",
        emerald: "#1F4D3A",
        border: "#2A2A2A",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        gold: "0 0 20px rgba(201, 168, 76, 0.15)",
        "gold-strong": "0 0 40px rgba(201, 168, 76, 0.25)",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "counter": "counter 2s ease-out forwards",
        "shimmer": "shimmer 2.5s infinite",
        "typing": "typing 1s steps(3) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(201,168,76,0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(201,168,76,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        typing: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E8C97A, #C9A84C, #A8862E)",
        "gold-gradient-h": "linear-gradient(90deg, #E8C97A, #C9A84C, #A8862E)",
        "dark-gradient": "linear-gradient(135deg, #0A0A0A, #141414, #1C1C1C)",
        "mesh": "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.03) 0%, transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
