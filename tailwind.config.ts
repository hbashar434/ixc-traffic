import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        low: "#34D399",
        moderate: "#FBBF24",
        high: "#F87171",
        critical: "#DC2626",
        stable: "#3B82F6",
        fluctuating: "#8B5CF6",
        offline: "#6B7280",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        neutral: "#9CA3AF",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Oswald"],
        body: ['"Open Sans"'],
      },
    },
  },
  plugins: [],
};
export default config;
