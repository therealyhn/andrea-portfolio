// Why Me section copy, taken from the redesign markup (plan §2.4). Rich sentences are RichText segments.

export const WHY_COPY = {
  eyebrow: "Working together",
  title: [{ text: "Why " }, { text: "me?", em: true }],
  lead: [
    { text: "I offer more than just visuals - I bring a complete understanding of design, " },
    { text: "from concept to final image.", em: true },
  ],
  // two text columns, each a list of paragraphs
  columns: [
    [
      "With a background in fashion design, construction, and drawing, I don’t just create - I understand form, proportion, and how a product should truly look and function. Whether it’s garment design, AI-generated visuals, or hand-drawn concepts and portraits, every project is built on both creative vision and technical knowledge.",
    ],
    [
      "By combining traditional design skills with advanced AI tools, I deliver high-end results faster, more efficiently, and without compromising quality or accuracy.",
      "You’re not just getting execution - you’re getting a creative partner who can develop ideas, visualize them, and bring them to life across different formats.",
    ],
  ],
  skillsTitle: "Skills & tools",
  closeIntro:
    "If you’re looking for someone who can design, visualize, and elevate your brand in a modern and innovative way - you’re in the right place.",
  closeStatement: [
    { text: "Let’s create visuals that don’t just look good - " },
    { text: "but make an impact.", em: true },
  ],
  cta: { label: "Work with me", href: "#contact", variant: "cream", icon: "arrow" },
};

export const SKILLS = [
  "Digital Fashion Design / Fashion Design",
  "AI Design",
  "AI Prompt Developer",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Trinity AI",
  "MidJourney AI",
  "Kling AI",
  "Runway AI",
  "Gemini AI",
];

// Local figure shown until (or instead of) the Sanity `whyFigure` (O06)
export const WHY_FIGURE = {
  src: "/img/whyme-figure.webp",
  width: 780,
  height: 892,
  alt: "Andrea Milenović holding a laptop",
};
