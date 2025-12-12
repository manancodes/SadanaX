/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0D", // main dark background
        card: "#1A1A1D",
        primary: "#4A7DFF",
        secondary: "#A2A2A6",
        accent: "#6C6CFF",
        success: "#4CE68F",
        danger: "#FF5A7A",
      },
    },
  },
  plugins: [],
};
