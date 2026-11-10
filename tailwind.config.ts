import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crema: "#FFF6E9",
        tinta: "#1A1423",
        fucsia: "#FF3D7F",
        electrico: "#3D5AFE",
        sol: "#FFD23F",
        menta: "#2EC4B6",
        naranja: "#FF8C42",
        lila: "#C8B6FF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "5px 5px 0 0 #1A1423",
        "brutal-lg": "8px 8px 0 0 #1A1423",
        "brutal-sm": "3px 3px 0 0 #1A1423",
      },
      borderWidth: { 3: "3px" },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--r, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--r, 0deg))" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
