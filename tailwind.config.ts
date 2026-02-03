import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        taupe: {
          50: "#faf8f5",
          100: "#f0ebe5",
          200: "#e0d5c9",
          300: "#c9b9a8",
          400: "#b09a84",
          500: "#a08b76",
          600: "#8a7563",
          700: "#735f51",
          800: "#5c4c42",
          900: "#4a3d36",
          950: "#2a221e",
        },
      },
    },
  },
  plugins: [],
};

export default config;
