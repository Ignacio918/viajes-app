/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#44178C',
        secondary: '#ECE8F4',
        gray: {
          600: '#828282',
        },
      },
    },
  },
  plugins: [],
}