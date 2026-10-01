import { WORK_COPY } from "../../data/workData.js";

const NUMBER_WORDS = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

function countWord(n) {
  return n <= NUMBER_WORDS.length ? NUMBER_WORDS[n - 1] : String(n);
}

// Chapters -> sentence segments for the Work header, e.g.
// "Four chapters, from technical drawing to AI campaign: <b>24 designs</b>, ... and <b>6 portraits</b>."
export function buildWorkSummary(chapters) {
  const total = chapters.length;
  if (!total) return [];

  const segments = [{ text: `${countWord(total)} ${total === 1 ? "chapter" : "chapters"}, ${WORK_COPY.summaryLead}: ` }];
  chapters.forEach((chapter, i) => {
    if (i > 0) segments.push({ text: i === total - 1 ? " and " : ", " });
    segments.push({ text: `${chapter.items.length} ${chapter.unit}`, bold: true });
  });
  segments.push({ text: "." });
  return segments;
}
