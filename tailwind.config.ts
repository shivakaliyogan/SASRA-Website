import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#f59e0b",
        vermilion: "#b91c1c",
        temple: "#8a4b18",
        lotus: "#fff7ed",
        gold: "#d6a22d"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(214, 162, 45, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
