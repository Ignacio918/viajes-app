/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
        dark: "#161616",
        pink: {
          600: "#E61C5D",
        },
        gray: {
          800: "#3E3E3E",
        },
      },
      boxShadow: {
        custom: "0px 12px 40px rgba(0, 0, 0, 0.04)", // Sombra personalizada
      },
      maxWidth: {
        "8xl": "2560px",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      aspectRatio: {
        illustration: "704/781",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        fadeIn: "fadeIn 0.3s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "skeleton-gradient":
          "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
      },
    },
  },
  plugins: [],
  safelist: [
    "font-urbanist",
    "text-primary",
    "text-secondary",
    "text-dark",
    "bg-primary",
    "bg-secondary",
    "bg-dark",
    "animate-fadeIn",
    "animate-pulse",
    "animate-spin",
    "animate-shimmer",
    "bg-skeleton-gradient",
  ],
};