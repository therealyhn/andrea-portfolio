const FONT_PROBES = ['400 100px "Bodoni Moda"', 'italic 400 60px "Bodoni Moda"'];
const FONT_TIMEOUT_MS = 2500;

// Adds `fonts` to <html> once the display serif is loaded (or after the timeout);
// until then `fonts-pending:` keeps the hero entrance animations paused.
export function markFontsReady() {
  const root = document.documentElement;
  const fontsOn = () => root.classList.add("fonts");

  if (document.fonts && document.fonts.load) {
    Promise.all(FONT_PROBES.map((font) => document.fonts.load(font))).then(fontsOn, fontsOn);
    setTimeout(fontsOn, FONT_TIMEOUT_MS);
  } else {
    fontsOn();
  }
}
