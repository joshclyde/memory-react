const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    colors: {
      "dark-1": "#232530",
      "dark-2": "#353846",
      "light-1": "#f8f8f2",
      "light-2": "#BFBFC3",
      "green-1": "#57E889",
      "purple-1": "#CDAEF9",
      "blue-1": "#86E2F5",
    },
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
