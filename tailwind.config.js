/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        fancy: ['Georgia', 'serif'],
      },
    },
  },
  variants: {},
  plugins: [],
  layers: {},
};
