// Work chapter copy, keyed by the CMS category name (`naziv`) trimmed and in lower case (src/lib/cms.js).
// A category without an entry here gets its own name as the short title; media without an alt text in
// the CMS get a generated one.

const DESIGN_STORY = [
  "I have been working in design for over three years, developing projects that span the full product lifecycle - from initial concept to final realization.",
  "My professional journey began at TREND TEX, where I worked on the development of workwear, uniforms, and protective clothing systems. I was involved in creating concept proposals, sketches, and technical drawings, as well as participating in the prototype development process - including pattern making, garment construction, and sewing. This experience provided me with a strong understanding of functionality, materials, and production processes.",
  "I continued my development within the FASHION HOUSE LUNA, where I focused on designing fashion pieces, trend research, and creating commercially successful models. Several designs I worked on remain part of the brand’s active collections.",
  "My approach combines creative vision with technical precision, ensuring that each design is both aesthetically refined and production-ready, with a clear understanding of market needs and end users.",
  "Below is a selection of works from both professional collaborations and independent projects.",
];

const AI_STORY = [
  "With the rise of AI, I have expanded my work into creating high-end, production-ready visual content for the fashion industry.",
  "I specialize in generating ultra-realistic AI imagery where garments are presented exactly as they are - whether on a model, in a studio setting, or on location. From e-commerce visuals to editorials and full campaign imagery, I create content that is visually refined, consistent, and ready for immediate use.",
  "AI enables a faster, more flexible production process, allowing brands to achieve diverse visual outputs without the limitations of traditional shoots. With just a product image, I can transform it into a complete visual campaign - adapted to different formats, platforms, and brand identities.",
  "This approach combines creative direction with precision and efficiency, delivering high-quality results that elevate brand presence and communication.",
  "Selected works are presented below.",
];

export const CHAPTER_COPY = {
  "design of clothes": { short: "Fashion design", unit: "designs", lead: DESIGN_STORY[0], story: DESIGN_STORY },
  "ai design and images generation": { short: "AI imagery", unit: "AI images", lead: AI_STORY[0], story: AI_STORY },
  "ai fashion video": { short: "AI video", unit: "films", lead: "Short AI-generated fashion films, from yacht editorials to holiday campaigns.", story: [] },
  portraits: { short: "Portraits", unit: "portraits", lead: "Hand-drawn pencil portraits.", story: [] },
};

export const WORK_COPY = {
  eyebrow: "Portfolio",
  title: [{ text: "My " }, { text: "work", em: true }],
  summaryLead: "from technical drawing to AI campaign",
  chapter: "Chapter",
  readStory: "Read the full story",
  stepSuffix: "items",
  stripHint: "Scroll horizontally.",
  playFilm: "Play film",
};

// Previous / next buttons of a chapter strip ("<label> <short> items") and of the lightbox ("<label>")
export const MEDIA_STEPS = [
  { dir: -1, icon: "left", label: "Previous" },
  { dir: 1, icon: "arrow", label: "Next" },
];

export const LIGHTBOX_COPY = {
  close: "Close",
  zoomHintTouch: "Tap the image to zoom",
  zoomHintPointer: "Click the image to zoom",
};
