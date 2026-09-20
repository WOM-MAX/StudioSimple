/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta oficial EstudioSimple (DESIGN.md)
        "brand-canvas": "#1C3257",
        "brand-navy": "#123A72",
        "brand-dark": "#101415",
        "brand-surface": "#1D2022",
        "brand-surface-high": "#272A2C",
        "brand-orange": "#F57C00",
        "brand-orange-bright": "#F8AD22",
        "brand-turquoise": "#18AFCB",
        "brand-turquoise-bright": "#57D6F3",
        "brand-green": "#4CAF50",
        "brand-yellow": "#FBC02D",
        
        // Tokens de compatibilidad con prototipos HTML
        "primary-container": "#123a72",
        "secondary-container": "#f27a00",
        "tertiary": "#57d6f3",
        "surface": "#101415",
        "surface-container": "#1d2022",
        "surface-container-high": "#272a2c",
        "on-surface": "#e0e3e5",
        "on-surface-variant": "#c3c6d1",
        "background": "#101415"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
