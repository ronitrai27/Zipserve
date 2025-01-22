/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: "Outfit, serif",
        inter: "Inter, serif",
        rubik: "Rubik, serif",
      },
      colors: {
        secondary: "#5f6fff66",
        primary: "#3b75ef",
        primaryLight: "#7ba6f8",
      },
    },
  },
  plugins: [],
};
