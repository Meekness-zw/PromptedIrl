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
        cream: "#F2E8DC",
        "cream-light": "#FAF5EF",
        pink: "#E8527A",
        "pink-dark": "#C43D62",
        "pink-light": "#F5C6D4",
        "pink-bg": "#FAEDF2",
        ink: "#0D0D0D",
        muted: "#6B6B6B",
        border: "#D9CEBF",
        "border-dark": "#B8AA98",
        warm: "#8C7B6B",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      fontSize: {
        "display-2xl": "clamp(5.5rem, 18vw, 16rem)",
        "display-xl": "clamp(3.5rem, 10vw, 9rem)",
        "display-lg": "clamp(2.5rem, 6vw, 5.5rem)",
      },
      borderRadius: {
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      letterSpacing: {
        editorial: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
