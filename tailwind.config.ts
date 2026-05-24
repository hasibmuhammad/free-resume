import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
          subtle: "#f1f5f9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgb(15 23 42 / 0.04), 0 1px 2px -1px rgb(15 23 42 / 0.04)",
        card: "0 4px 24px -4px rgb(15 23 42 / 0.08), 0 0 0 1px rgb(15 23 42 / 0.04)",
        elevated:
          "0 12px 40px -12px rgb(79 70 229 / 0.22), 0 0 0 1px rgb(99 102 241 / 0.08)",
        glow: "0 4px 16px -2px rgb(99 102 241 / 0.45), inset 0 1px 0 0 rgb(255 255 255 / 0.15)",
        "glow-lg":
          "0 8px 28px -4px rgb(99 102 241 / 0.5), inset 0 1px 0 0 rgb(255 255 255 / 0.2)",
        "dark-soft":
          "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 0 0 1px rgb(255 255 255 / 0.04)",
        "dark-card":
          "0 4px 24px -4px rgb(0 0 0 / 0.4), 0 0 0 1px rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #a5b4fc 0%, #6366f1 45%, #4338ca 100%)",
        "brand-gradient-hover":
          "linear-gradient(135deg, #c7d2fe 0%, #818cf8 45%, #4f46e5 100%)",
        "mesh-gradient":
          "radial-gradient(at 20% 30%, rgb(99 102 241 / 0.09) 0px, transparent 45%), radial-gradient(at 80% 10%, rgb(124 58 237 / 0.07) 0px, transparent 40%), radial-gradient(at 60% 90%, rgb(129 140 248 / 0.1) 0px, transparent 50%), radial-gradient(at 10% 80%, rgb(199 210 254 / 0.12) 0px, transparent 40%)",
        "mesh-gradient-dark":
          "radial-gradient(at 20% 30%, rgb(99 102 241 / 0.15) 0px, transparent 45%), radial-gradient(at 80% 10%, rgb(124 58 237 / 0.12) 0px, transparent 40%), radial-gradient(at 60% 90%, rgb(79 70 229 / 0.1) 0px, transparent 50%), radial-gradient(at 10% 80%, rgb(49 46 129 / 0.2) 0px, transparent 40%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
