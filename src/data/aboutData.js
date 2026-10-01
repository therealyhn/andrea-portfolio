// About section copy, taken from the redesign markup (plan §2.4). Rich sentences are RichText segments.

export const ABOUT_COPY = {
  eyebrow: "About me",
  statement: [
    { text: "Designer focused on " },
    { text: "fashion", em: true },
    { text: ", visual identity, graphic design and " },
    { text: "AI-driven", em: true },
    { text: " creativity." },
  ],
  paragraphs: [
    "My work is driven by a constant exploration of visual form, innovation, and contemporary creative technologies.",
    "Through the integration of traditional design principles and advanced AI tools, I develop concepts that merge aesthetics, functionality, and modern digital thinking.",
    "I specialize in creating distinctive visual identities, fashion concepts, and digital design solutions that communicate clarity, originality, and strong visual presence.",
    "My goal is to push creative boundaries and transform ideas into powerful visual experiences that resonate within today’s evolving design landscape.",
  ],
  cta: { label: "See the portfolio", href: "#work", variant: "wine", icon: "arrow" },
};

// Local copies of the redesign's Sanity crops (plan §2.8), same widths
export const ABOUT_ART = {
  main: {
    src: "/img/about/illustration-720.webp",
    srcSet:
      "/img/about/illustration-480.webp 480w, /img/about/illustration-720.webp 720w, /img/about/illustration-1080.webp 1080w",
    sizes: "(max-width:700px) 80vw, (max-width:1100px) 36vw, 26vw",
    width: 720,
    height: 960,
    alt: "Hand-drawn fashion illustrations of a red and a purple dress",
  },
  inset: {
    src: "/img/about/ai-visual-640.webp",
    srcSet: "/img/about/ai-visual-320.webp 320w, /img/about/ai-visual-640.webp 640w",
    sizes: "(max-width:700px) 44vw, 14vw",
    width: 480,
    height: 634,
    alt: "AI-generated visual of two women in burgundy tailoring",
  },
  captions: [
    { label: "By hand", text: "Fashion illustration" },
    { label: "With AI", text: "Generated visual" },
  ],
};

export const CV_BLOCKS = [
  {
    title: "Work experience",
    items: [
      { period: "2025 - 2026", role: "Fashion and AI Designer", place: "Luna D.O.O." },
      { period: "2024 - 2025", role: "Designer", place: "TREND TEX" },
    ],
  },
  {
    title: "Education",
    items: [{ period: "2015 - 2019", role: "High School \"Svetozar Marković\"", place: "Surdulica, General program" }],
  },
];
