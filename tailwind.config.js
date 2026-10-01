import plugin from "tailwindcss/plugin.js";

const supportsScrollTimeline = "@supports (animation-timeline: view())";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "2k": "1920px",
        "4k": "2560px",
        upto1100: { raw: "(max-width: 1100px)" },
        upto959: { raw: "(max-width: 959px)" },
        upto700: { raw: "(max-width: 700px)" },
        upto600: { raw: "(max-width: 600px)" },
        upto560: { raw: "(max-width: 560px)" },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "sans-serif"],
        serif: ['"Bodoni Moda"', "Didot", '"Bodoni 72"', '"Bodoni MT"', "Georgia", "serif"],
        sans: ['"Instrument Sans"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
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
        wine: {
          DEFAULT: "#4a0917",
          2: "#38060f",
          3: "#22040a",
          glow: "#6e1428",
          tile: "#3a0a14",
          media: "#22060c",
          deep: "#150307",
        },
        paper: {
          DEFAULT: "#f4ede4",
          2: "#eae0d3",
          card: "#fbf7f1",
        },
        ink: {
          DEFAULT: "#2a0710",
          soft: "#6b4a4f",
          body: "#4a2f34",
          story: "#3d252a",
          hint: "#a08d8f",
        },
        cream: {
          DEFAULT: "#f6efe6",
          soft: "#d4bfbb",
          faint: "#ab8e8c",
          blush: "#f2c6c1",
        },
        rouge: "#b8172f",
        line: {
          dark: "rgba(246,239,230,.16)",
          light: "rgba(42,7,16,.16)",
        },
      },
      fontSize: {
        11: "11px",
        12: "12px",
        13: "13px",
        14: "14px",
        15: "15px",
        16: "16px",
        17: "17px",
        22: "22px",
      },
      letterSpacing: {
        12: ".12em",
        14: ".14em",
        18: ".18em",
        20: ".2em",
        neg1: "-.01em",
        neg2: "-.02em",
      },
      lineHeight: {
        86: ".86",
        100: "1",
        102: "1.02",
        110: "1.1",
        120: "1.2",
        125: "1.25",
        140: "1.4",
        160: "1.6",
        165: "1.65",
        170: "1.7",
        175: "1.75",
      },
      spacing: {
        gutter: "clamp(16px,4vw,64px)",
        hd: "var(--hd)",
      },
      maxWidth: {
        wrap: "1560px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(.2,.7,.1,1)",
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms",
        450: "450ms",
        600: "600ms",
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
  plugins: [
    plugin(({ addVariant, addBase, addUtilities }) => {
      addVariant("cq-portrait", "@container (orientation: portrait)");
      addVariant("cq-land-1199", "@container (orientation: landscape) and (max-width: 1199px)");
      addVariant("cq-land-1023", "@container (orientation: landscape) and (max-width: 1023px)");
      addVariant("cq-short", "@container (orientation: landscape) and (max-height: 560px)");
      addVariant("fonts-pending", "html:not(.fonts) &");

      addBase({
        "@keyframes rise": {
          from: { opacity: "0", transform: "translateY(32%)" },
          to: { opacity: "1", transform: "none" },
        },
        "@keyframes fade": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        "@keyframes figIn": {
          from: { opacity: "0", transform: "translate(-50%,4%)" },
          to: { opacity: "1", transform: "translate(-50%,0)" },
        },
        "@keyframes figOut": {
          to: { transform: "translate(-50%,10%)" },
        },
        "@keyframes mastOut": {
          to: { transform: "translateY(-26%)", opacity: ".25" },
        },
      });

      addUtilities({
        ".motion-rise": {
          animation: "rise 1.25s var(--ease) both",
          animationDelay: "calc(.15s + var(--i) * .06s)",
        },
        ".motion-fade": {
          animation: "fade 1.2s var(--ease) var(--fade-delay, 0s) both",
        },
        ".motion-fig": {
          animation: "figIn 1.5s var(--ease) .1s both",
          [supportsScrollTimeline]: {
            animation: "figIn 1.5s var(--ease) .1s both, figOut linear both",
            animationTimeline: "auto, --heroT",
            animationRange: "normal, exit 0% exit 100%",
          },
        },
        ".motion-mast": {
          [supportsScrollTimeline]: {
            animation: "mastOut linear both",
            animationTimeline: "--heroT",
            animationRange: "exit 0% exit 100%",
          },
        },
        ".timeline-hero": {
          [supportsScrollTimeline]: {
            viewTimeline: "--heroT block",
          },
        },
        ".opsz-20": { fontVariationSettings: '"opsz" 20' },
        ".opsz-34": { fontVariationSettings: '"opsz" 34' },
        ".opsz-36": { fontVariationSettings: '"opsz" 36' },
        ".opsz-40": { fontVariationSettings: '"opsz" 40' },
        ".opsz-52": { fontVariationSettings: '"opsz" 52' },
      });
    }),
  ],
};
