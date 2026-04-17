import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F7F4",
        surface: "#FFFFFF",
        border: "#E2DDD8",
        accent: {
          DEFAULT: "#2C4A6E",
          hover: "#1E3550",
        },
        dark: {
          bg: "#1C2B3A",
          text: "#F0EDE8",
        },
        text: {
          primary: "#1C1C1E",
          secondary: "#6B6B6B",
          muted: "#9A9A9A",
        },
        error: "#C0392B",
        success: "#2D6A4F",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
