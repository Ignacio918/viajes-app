/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html,css}",
  ],
  darkMode: 'class', // Agregamos el modo oscuro
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
        background: {
          DEFAULT: "white",
          dark: "#161616",
        },
        "background-foreground": {
          DEFAULT: "#000000",
          dark: "#ffffff",
        },
        ring: {
          DEFAULT: "#E61C5D",
          dark: "#E61C5D",
        },
        "ring-foreground": {
          DEFAULT: "white",
          dark: "#161616",
        },
        primary: {
          DEFAULT: "#E61C5D",
          foreground: "white",
          dark: "#E61C5D",
        },
        secondary: {
          DEFAULT: "#3E3E3E",
          foreground: "white",
          dark: "#f3f4f6",
        },
      },
      boxShadow: {
        custom: "0px 12px 40px 0px rgba(0, 0, 0, 0.04)",
        "custom-dark": "0px 12px 40px 0px rgba(0, 0, 0, 0.2)",
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
        "background-gradient": {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(50px, 50px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        "background-gradient": "background-gradient 10s ease-in-out infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        fadeIn: "fadeIn 1s ease-in-out",
      },
      backgroundImage: {
        "skeleton-gradient":
          "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
        "skeleton-gradient-dark":
          "linear-gradient(90deg, #1f2937 0%, #374151 50%, #1f2937 100%)",
      },
      ringColor: {
        DEFAULT: "#E61C5D",
      },
      ringOffsetColor: {
        DEFAULT: "white",
        dark: "#161616",
      },
      ringOffsetWidth: {
        DEFAULT: "2px",
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
    "animate-background-gradient",
    "bg-skeleton-gradient",
    "bg-skeleton-gradient-dark",
    "ring",
    "ring-offset",
    "ring-primary",
    "ring-secondary",
    "focus-visible:ring",
    "focus-visible:ring-offset",
    // Agregamos clases para modo oscuro
    "dark:bg-background-dark",
    "dark:text-white",
    "dark:ring-offset-dark",
    "dark:shadow-custom-dark",
  ],
};