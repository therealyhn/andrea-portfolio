// Work chapter copy and media metadata. Chapters are keyed by Sanity item _key, media by asset ref.
// Media added in Sanity later (no entry here) get a generated alt text in normalizeSiteMedia.

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
  "133fe10f8203": { short: "Fashion design", unit: "designs", lead: DESIGN_STORY[0], story: DESIGN_STORY },
  "13ff0c82d1e2": { short: "AI imagery", unit: "AI images", lead: AI_STORY[0], story: AI_STORY },
  "ab4639cfebd6": { short: "AI video", unit: "films", lead: "Short AI-generated fashion films, from yacht editorials to holiday campaigns.", story: [] },
  "dc1d157cfab6": { short: "Portraits", unit: "portraits", lead: "Hand-drawn pencil portraits.", story: [] },
};

export const MEDIA_ALT = {
  "image-2872cd72ed02c57dc408f271bcbfa3040d054b87-3508x4961-jpg": "My design for fashion brand LUNA: black dress with belt",
  "image-5d2f167702871c182dd3cd4a5ad28e6c4977a79c-3508x4961-jpg": "My design for fashion brand LUNA: beige trench dress",
  "image-5f8e365d5c5bebc334790ad00b9d09f387712ff8-3508x4961-jpg": "My design for fashion brand LUNA: beige midi dress",
  "image-e2a2dba1d1503f29b4e7e1086cbee8efbe734486-3508x4961-jpg": "My design for fashion brand LUNA: cream blouse with tie",
  "image-5b2268d64ae538aa648402098725e51e169dc095-3508x4961-jpg": "My design for fashion brand LUNA: cream dress with flutter sleeves",
  "image-7932b380cadcd6f1d726e16b7153db353098b1ee-3508x4961-jpg": "My design for fashion brand LUNA: red satin dress",
  "image-ca61e2da51be84fb8a86a8130ddc750428e02ca4-3508x4961-jpg": "Fashion technical drawing: top and shorts",
  "image-5853a0ed90b96f1cae1379880991a865a877b39c-3000x4000-jpg": "Fashion illustration next to the finished dress",
  "image-4081305308c2e99eefbace4e4843a5eb6b9af165-750x1334-jpg": "Purple medical uniform: details and fit",
  "image-3c80542ed4343345f760735fd06e1fb4cb558707-3024x4032-jpg": "White lab coat with embroidered logo",
  "image-edb25cda24564d15e835ec5e32345be8f2e5e7e9-3508x4961-jpg": "From sketch to finished product: white lab coat",
  "image-271e059567440e996eeaf46bbd0bdb2116fd509a-3508x4961-jpg": "From sketch to finished product: lab coat with blue panels",
  "image-743826bb12d88c91bb039733b32cc4366004d4ac-3508x4961-jpg": "From sketch to finished product: purple medical uniform",
  "image-248b26f95ece9cdc54cccc662fc94f0e0631988f-3508x4961-jpg": "From sketch to finished product: purple medical tunic",
  "image-edcb2c06db16dced70ec841b93240f9e7213bed2-3508x4961-jpg": "From sketch to finished product: workwear with blue panels",
  "image-2afbae58dd4b304bbc2a5ee6a2c881cc2255788b-3508x4961-jpg": "From sketch to finished product: red and white uniform",
  "image-ee5e47d51c51e0a64a1c0fa29aac6c4a20645cb7-3508x4961-jpg": "From sketch to finished product: red and white uniform set",
  "image-72b70af88224b8bd1b4527f77f99240e0ee2aae9-3508x4961-jpg": "Technical drawings: high-visibility workwear jacket",
  "image-8cb3dc8ccef6e534e931d27fff0207c429d694ee-3508x4961-jpg": "Technical drawings: workwear set",
  "image-1d9d11e22e854aa62cc7880783fd88553f67143f-3508x4961-jpg": "Suggestion of color combinations for workwear",
  "image-d5fcac20dddf3067520be85745c85a9b5524ce4a-3508x4961-jpg": "Sketches and moodboard",
  "image-bdc9e2e778b40f133efac47e91d4827fd2de3e5a-3024x4032-jpg": "Hand-drawn fashion illustration of a red dress",
  "image-875885b9ad66c2437d29aaa3299b2ead55b65c51-2040x1275-jpg": "Fashion illustrations of blue workwear",
  "image-8eef6cd03a30a47009472830bf2368c0bc88cb7b-2480x3507-jpg": "Technical drawing of an orange high-visibility jacket",
  "image-0b4e58c20309e161d3fb1a0ce2e7dccf6da46353-4961x3508-jpg": "From a product photo to studio and location photos: navy coat",
  "image-ae1f16b77f8619fa65bf29b0cecefa80a4b200ca-3508x4961-jpg": "AI-generated visual: beige trench coat",
  "image-cd2734bb4ed2a59ffd6e410497b13118e63014d1-3508x4961-jpg": "AI-generated visual: draped brown top",
  "image-f86d460d36b6ead0fcfd152681d37a99743dedf8-3508x4961-jpg": "AI-generated visual: teal satin set",
  "image-e9c858ea482de46a56630085b843a0594e1384f8-3508x4961-jpg": "AI-generated visual: pink tailored set",
  "image-252fa9ddae005ff5621eb64f97286583e6b626f4-3508x4961-jpg": "Catalogue from a single product photo: Ana Rosso bag",
  "image-9b13b7d1992d1a3e648d72a41e3320febfdea207-3508x4961-jpg": "Catalogue from a single product photo: white bag",
  "image-3baf4b5ae5ffdc677e4e8a15c0a4748bbc38f937-3508x4961-jpg": "Catalogue from a single product photo: red bags",
  "image-88649cabee301181e4d5fd45b6b963f956d7ad4d-3508x4961-jpg": "Campaign from product photos: holiday shoes and clothes",
  "image-f02a80237e31aca22f8a95fd88c06252bd39aa75-3508x4961-jpg": "AI instead of drawing: white looks on a yacht",
  "image-b4a96e3ac9d14a2fd9c0edc5fd20a7ee5dac6523-3508x4961-jpg": "AI instead of drawing: burgundy suits",
  "image-bd68cfb7ee10dbd5b4b9801664031ac43aee5042-3508x4961-jpg": "AI instead of drawing: burgundy and cream looks",
  "image-3dd1c31f3063ce40dd92720bd39d1b1b04a76b8b-3508x4961-jpg": "AI instead of drawing: burgundy evening looks",
  "image-9401ffd8799feee3fa68058c0c86d340edf25f25-750x809-jpg": "Pencil portrait of a child",
  "image-dc8aec34db41cbeb97cbf4bd1094d0b1223ff382-750x925-jpg": "Pencil portrait of a baby",
  "image-9e35048c6b6f526005d2975c583b4f0b8df5a6b0-3024x3780-jpg": "Pencil portrait of a family",
  "image-f1b6877e9c7c98fbc36da385f179c7ec59fa1ec1-750x922-jpg": "Pencil portrait of two women",
  "image-1a5faf9c763d2c9b0bfe8c1c7364eee8223c3579-750x921-jpg": "Pencil portrait of a couple",
  "image-b51b8edeb123501de866d655fd4e3efeff216de1-3024x4032-jpg": "Pencil portrait of two children",
};

export const VIDEO_META = {
  "file-119221eb4cbe2d805b95c66960cb14d480e094d4-mp4": {
    alt: "Yacht editorial",
    poster: "/img/posters/119221eb4cbe2d805b95c66960cb14d480e094d4.webp",
    width: 3840,
    height: 2160,
    duration: 93,
  },
  "file-d6b42003a9b08b8c1ceeb69afbae37374aa6553e-mp4": {
    alt: "Studio night campaign",
    poster: "/img/posters/d6b42003a9b08b8c1ceeb69afbae37374aa6553e.webp",
    width: 2560,
    height: 1440,
    duration: 37,
  },
  "file-85af998e0234fd14a75c16c286d45499031ad94d-mp4": {
    alt: "Holiday evening campaign",
    poster: "/img/posters/85af998e0234fd14a75c16c286d45499031ad94d.webp",
    width: 2560,
    height: 1440,
    duration: 41,
  },
  "file-235b19db97783fc90d928bd27ad99359cbad338a-mp4": {
    alt: "Printed chiffon dress",
    poster: "/img/posters/235b19db97783fc90d928bd27ad99359cbad338a.webp",
    width: 1080,
    height: 1920,
    duration: 16,
  },
  "file-0e6397f84918cb5064284a2c48ba8889984fd129-mp4": {
    alt: "Chiffon dress with blazer",
    poster: "/img/posters/0e6397f84918cb5064284a2c48ba8889984fd129.webp",
    width: 2160,
    height: 3840,
    duration: 23,
  },
  "file-f3b12f98f5426e23f7a0a1dc8663e413c2eb5268-mp4": {
    alt: "Navy dress with piping",
    poster: "/img/posters/f3b12f98f5426e23f7a0a1dc8663e413c2eb5268.webp",
    width: 2160,
    height: 3840,
    duration: 29,
  },
};

export const WORK_COPY = {
  eyebrow: "Portfolio",
  title: [{ text: "My " }, { text: "work", em: true }],
  summaryLead: "from technical drawing to AI campaign",
  loading: "Loading portfolio...",
  error: "The portfolio could not be loaded.",
  retry: "Try again",
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
