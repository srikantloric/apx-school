/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        elevation1:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
        elevation2:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
        elevation3:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
      },
      colors: {
        primary: {
          DEFAULT: "#bd0745", // Maroon
          light: "#6cb2eb", // Lighter shade of primary
          dark: "#000000d9", // Darker shade of primary
        },
        secondary: {
          DEFAULT: "#202c45", // Base secondary color
          light: "#f6f6f6", // Lighter shade of secondary
          dark: "#f9d923", // Darker shade of secondary
        },
        fade: {
          DEFAULT: "#8c8587", //light gray fade
          light: "#fdc800", //yellow
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite", // Define marquee animation
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" }, // Start from right
          "100%": { transform: "translateX(-100%)" }, // End at left
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
