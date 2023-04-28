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
      backgroundColor: {
        gray: {
          100: "#f7f6f8", // Subtle purple-tinted gray
          200: "#ebe9ec", // Subtle purple-tinted gray
          300: "#d6d3d8", // Subtle purple-tinted gray
          400: "#a8a4ab", // Subtle purple-tinted gray
          500: "#7a757e", // Subtle purple-tinted gray
          600: "#6b6570", // Subtle purple-tinted gray
          700: "#4c474e", // Subtle purple-tinted gray
          800: "#2d292e", // Subtle purple-tinted gray
          900: "#1f1c20", // Subtle purple-tinted gray
        },
        customPurple: {
          100: "#6e656b",
          200: "#a7a0a4",
          400: "#a372d0",
          500: "#8757b4",
          800: "#2f2542",
        },
        grayPurple: "#2e2938"
      },
      textColor: {
        gray: {
          100: "#f7f6f8", // Subtle purple-tinted gray
          200: "#ebe9ec", // Subtle purple-tinted gray
          300: "#d6d3d8", // Subtle purple-tinted gray
          400: "#a8a4ab", // Subtle purple-tinted gray
          500: "#7a757e", // Subtle purple-tinted gray
          600: "#6b6570", // Subtle purple-tinted gray
          700: "#4c474e", // Subtle purple-tinted gray
          800: "#2d292e", // Subtle purple-tinted gray
          900: "#1f1c20", // Subtle purple-tinted gray
        },
        customPurple: {
          100: "#6e656b",
          200: "#a7a0a4",
          400: "#a372d0",
          500: "#8757b4",
          800: "2f2542",
        },
      }
    },
  },
  variants: {},
  plugins: [],
  layers: {},
};
