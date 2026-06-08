import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Portal Funil brand palette ──────────────────────────────
        navy:    "#071426",  // primary dark — fundo principal
        cobalt:  "#0B2A5B",  // secondary blue — fundo médio
        gold: {
          DEFAULT: "#F4C542",  // primary accent — ouro
          dark:    "#B8860B",  // ouro escuro — labels, textos de destaque
          hover:   "#D4A514",  // hover do ouro
        },
        surface: "#F5F7FA",  // background claro das páginas
      },
    },
  },
  plugins: [],
};

export default config;