import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "Nunito", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Fira Sans", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f0f7ec",
          100: "#e0f0d8",
          200: "#c1e1b1",
          300: "#a8d888",
          400: "#7bc043",
          500: "#4c9c2e",
          600: "#3a8735",
          700: "#2d6b29",
          800: "#006341",
          900: "#00442d",
        },
        accent: {
          DEFAULT: "#ff6b00",
          light: "#ff8533",
          dark: "#e05f00",
        },
        warm: {
          50: "#fafaf8",
          100: "#f5f5f3",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "slide-down":
          "slide-down 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "slide-left":
          "slide-left 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
