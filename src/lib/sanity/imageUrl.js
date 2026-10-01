import { dataset, projectId } from "../sanityClient.js";
import { parseImageRef } from "../utils/sanityRef.js";

// Sanity image CDN URL for an asset ref, resized to `width` (never upscaled, format negotiated by the CDN).
export function imageUrl(ref, width, quality = 78) {
  const image = parseImageRef(ref);
  if (!image) return null;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${image.id}-${image.width}x${image.height}.${image.ext}?w=${width}&q=${quality}&fit=max&auto=format`;
}

// "<url> <w>w, ..." for the widths not larger than the original (the original width when none fit).
export function imageSrcSet(ref, widths, quality) {
  const image = parseImageRef(ref);
  if (!image) return "";
  const fitting = widths.filter((w) => w <= image.width);
  return (fitting.length ? fitting : [image.width]).map((w) => `${imageUrl(ref, w, quality)} ${w}w`).join(", ");
}
