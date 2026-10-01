const IMAGE_REF = /^image-([a-f0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/;
const FILE_REF = /^file-([a-f0-9]+)-([a-z0-9]+)$/;

// "image-<id>-<w>x<h>-<ext>" -> { id, width, height, ext } | null
export function parseImageRef(ref) {
  const match = typeof ref === "string" ? IMAGE_REF.exec(ref) : null;
  if (!match) return null;
  return { id: match[1], width: Number(match[2]), height: Number(match[3]), ext: match[4] };
}

// "file-<id>-<ext>" -> { id, ext } | null
export function parseFileRef(ref) {
  const match = typeof ref === "string" ? FILE_REF.exec(ref) : null;
  if (!match) return null;
  return { id: match[1], ext: match[2] };
}
