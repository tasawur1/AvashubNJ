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
        brand: {
          teal: "#007C89",
          "teal-light": "#EAF7F7",
          "purple-deep": "#906398",
          "purple-bright": "#BD7ABB",
          "logo-purple": "#A66CAB",
          gold: "#FDBA2D",
          navy: "#171347",
          lavender: "#FAEFF9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(144, 99, 152, 0.15)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
