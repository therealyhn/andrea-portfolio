// Content from the Maestro CMS, read at build time (scripts/fetch-cms-content.mjs). Components get the
// SiteMedia shape (plan §2.3) the former Sanity query gave them through normalizeSiteMedia until MS.12a in
// maestro-cms (`hero.figure`, `whyMe.figure`, `workSection.items[]` with `title` and `gallery[]`), so only
// the data source changes in them: an image carries the CMS variant URLs instead of a Sanity asset ref.
import content from "../generated/cms-content.json";
import { CHAPTER_COPY } from "../data/workData.js";
import { pad2 } from "./utils/format.js";

// Variants of the CMS public media and their widths (contract 3.13 in maestro-cms). A variant exists
// only when the original is wider, so `urls` carries only the ones that exist.
const MEDIA_VARIANT_WIDTHS = [
  ["thumb", 320],
  ["medium", 768],
  ["large", 1600],
];

// Sizes from the smallest to the largest. Without the `large` variant the original is not wider than
// 1600 px, so it joins as the largest size; with it the original is too heavy to show.
function imageVariants(media) {
  const variants = MEDIA_VARIANT_WIDTHS.filter(([name]) => media.urls[name]).map(([name, width]) => ({
    url: media.urls[name],
    width,
  }));
  if (!media.urls.large) variants.push({ url: media.urls.original, width: media.width });
  return variants;
}

const isImage = (media) => media?.kind === "image" && Boolean(media.urls?.original) && media.width > 0 && media.height > 0;

// URL of the smallest size at least `width` wide (the largest when none is), in place of the Sanity
// CDN `w=<width>` URL.
export function imageUrl(image, width) {
  const { variants } = image;
  return (variants.find((size) => size.width >= width) ?? variants[variants.length - 1]).url;
}

// "<url> <w>w, ..." for every size; the component sets `sizes` from its own layout.
export function imageSrcSet(image) {
  return image.variants.map((size) => `${size.url} ${size.width}w`).join(", ");
}

function normalizeFigure(media) {
  return isImage(media) ? { width: media.width, height: media.height, variants: imageVariants(media) } : null;
}

// One gallery medium -> ImageItem | VideoItem | null (skipped). `fallbackAlt` is used when the medium has no alt.
function normalizeMedia(media, key, fallbackAlt) {
  if (isImage(media)) {
    return {
      kind: "image",
      key,
      width: media.width,
      height: media.height,
      alt: media.alt || fallbackAlt,
      variants: imageVariants(media),
    };
  }

  if (media?.kind === "video" && media.urls?.original) {
    return {
      kind: "video",
      key,
      url: media.urls.original,
      alt: media.alt || fallbackAlt,
      poster: media.poster?.urls?.medium ?? media.poster?.urls?.original ?? null,
      width: media.width ?? null,
      height: media.height ?? null,
      duration: media.durationMs == null ? null : media.durationMs / 1000,
    };
  }

  return null;
}

// Keys are positions (category, then medium), stable within one build.
function normalizeItems(gallery, title, categoryIndex) {
  const items = [];
  (gallery ?? []).forEach((media, mediaIndex) => {
    const item = normalizeMedia(media, `${categoryIndex + 1}-${mediaIndex + 1}`, `${title} ${pad2(items.length + 1)}`);
    if (item) items.push(item);
  });
  return items;
}

// Categories without valid media are skipped; duplicates are kept. CHAPTER_COPY is keyed by the category name.
function normalizeChapters(categories) {
  const chapters = [];

  (categories ?? []).forEach((category, categoryIndex) => {
    const title = (category?.naziv ?? "").trim();
    const items = normalizeItems(category?.galerija, title, categoryIndex);
    if (!items.length) return;

    const copy = CHAPTER_COPY[title.toLowerCase()] ?? { short: title, unit: "works", lead: null, story: [] };
    chapters.push({
      key: String(categoryIndex + 1),
      no: pad2(chapters.length + 1),
      title,
      short: copy.short,
      unit: copy.unit,
      lead: copy.lead,
      story: copy.story,
      items,
    });
  });

  return chapters;
}

export const siteMedia = {
  heroFigure: normalizeFigure(content.baner?.figura),
  whyFigure: normalizeFigure(content["zasto-ja"]?.figura),
  chapters: normalizeChapters(content.radovi?.kategorije),
};
