import { CHAPTER_COPY, MEDIA_ALT, VIDEO_META } from "../../data/workData.js";
import { pad2 } from "../utils/format.js";
import { parseFileRef, parseImageRef } from "../utils/sanityRef.js";

function normalizeFigure(figure) {
  const ref = figure?.asset?._ref;
  const image = parseImageRef(ref);
  return image ? { ref, width: image.width, height: image.height } : null;
}

// One gallery entry -> ImageItem | VideoItem | null (skipped). `fallbackAlt` is used when the ref has no static metadata.
function normalizeMedia(media, fallbackAlt) {
  if (media?._type === "image") {
    const image = parseImageRef(media.ref);
    if (!image) return null;
    return {
      kind: "image",
      key: media._key,
      ref: media.ref,
      width: image.width,
      height: image.height,
      alt: MEDIA_ALT[media.ref] ?? fallbackAlt,
    };
  }

  if (media?._type === "file") {
    if (!media.url || !parseFileRef(media.ref)) return null;
    const meta = VIDEO_META[media.ref];
    return {
      kind: "video",
      key: media._key,
      ref: media.ref,
      url: media.url,
      alt: meta?.alt ?? fallbackAlt,
      poster: meta?.poster ?? null,
      width: meta?.width ?? null,
      height: meta?.height ?? null,
      duration: meta?.duration ?? null,
    };
  }

  return null;
}

function normalizeItems(media, title) {
  const items = [];
  for (const entry of media ?? []) {
    const item = normalizeMedia(entry, `${title} ${pad2(items.length + 1)}`);
    if (item) items.push(item);
  }
  return items;
}

// Raw SITE_MEDIA_QUERY result -> SiteMedia (plan §2.3). Categories without valid media are skipped; duplicates are kept.
export function normalizeSiteMedia(raw) {
  const chapters = [];

  for (const category of raw?.categories ?? []) {
    const title = (category?.title ?? "").trim();
    const items = normalizeItems(category?.media, title);
    if (!items.length) continue;

    const copy = CHAPTER_COPY[category._key] ?? { short: title, unit: "works", lead: null, story: [] };
    chapters.push({
      key: category._key,
      no: pad2(chapters.length + 1),
      title,
      short: copy.short,
      unit: copy.unit,
      lead: copy.lead,
      story: copy.story,
      items,
    });
  }

  return {
    heroFigure: normalizeFigure(raw?.heroFigure),
    whyFigure: normalizeFigure(raw?.whyFigure),
    chapters,
  };
}
