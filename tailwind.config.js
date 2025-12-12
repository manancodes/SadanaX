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
        bg: "#0A0A0B",
        card: "#151515",
        text: "#FFFFFF",
        subtext: "#9A9A9A",
        accent: "#C99383",
        pill: "rgba(255,255,255,0.04)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
