const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    colors: {
      "dark-1": "#282a36",
      "dark-2": "#353846",
      "light-1": "#f8f8f2",
      "light-2": "#bfbfc3",
      "green-1": "#50fa7b",
      "purple-1": "#bd93f9",
      "blue-1": "#8be9fd",
      "orange-1": "#ffb86c",
      "pink-1": "#ff79c6",
      "red-1": "#ff5555",
      "yellow-1": "#f1fa8c",
    },
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
