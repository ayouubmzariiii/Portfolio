/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--color-background)", // Deep Black
        primary: "var(--color-primary)",    // Neon Volt
        card: "var(--color-card)",       // Card Background
        secondary: "var(--color-secondary)",  // Muted text
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        display: ["Russo One", "sans-serif"],
        mono: ["monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};