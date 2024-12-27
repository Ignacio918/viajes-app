// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: '#44178C',
        secondary: '#ECE8F4',
        dark: '#161616',
        gray: {
          input: '#828282',
          border: '#ECE8F4',
        },
      },
      maxWidth: {
        '8xl': '2560px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      aspectRatio: {
        'illustration': '704/781',
      },
    },
  },
  plugins: [],
  safelist: [
    'font-urbanist',
    'text-primary',
    'text-secondary',
    'text-dark',
    'bg-primary',
    'bg-secondary',
    'bg-dark',
  ],
}