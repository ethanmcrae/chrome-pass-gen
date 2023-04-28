/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        fancy: ['Georgia', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  variants: {},
  plugins: [],
  layers: {},
};
