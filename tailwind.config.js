/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
      },
      colors: {
        background: {
          DEFAULT: "#f4efe9",
          soft: "#ede6de",
          dark: "#2b0f12",
        },
        surface: {
          DEFAULT: "#3a1318",
          soft: "#4a1a20",
        },
        text: {
          heading: "#2b0f12",
          base: "#5c4a4a",
          light: "#f5ede6",
          muted: "#c9bdb5",
        },
        border: {
          subtle: "rgba(43,15,18,0.15)",
          soft: "rgba(43,15,18,0.08)",
        },
        primary: {
          DEFAULT: "#7a1f28",
          dark: "#5c161d",
          light: "#9c2c36",
        },
        accent: {
          gold: "#c9a46a",
          cream: "#f7efe7",
        },
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          md: "2rem",
          lg: "2.5rem",
        },
        screens: {
          lg: "1024px",
          xl: "1200px",
          "2xl": "1440px",
        },
      },
    },
  },
  plugins: [],
};
