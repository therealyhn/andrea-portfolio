export function pad2(n) {
  return String(n).padStart(2, "0");
}

// Seconds (integer from VIDEO_META or float from loadedmetadata) -> "m:ss".
export function formatDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  return `${Math.floor(total / 60)}:${pad2(total % 60)}`;
}
