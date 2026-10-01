# Verifikacija - andrea-portfolio

Okruženje: Windows 11, Node v22.20.0, npm 11.9.0, Git Bash ili PowerShell 5.1. Sve komande iz korena projekta
`C:\xampp\htdocs\Projects\andrea-portfolio` osim gde piše `sanity/`. Nema Docker-a, nema baze, nema test runner-a.

## Osnovne linije (izmereno 2026-10-01, pre redizajna, commit e70b772)
| Provera | Komanda | Rezultat |
|---|---|---|
| Lint | `npm run lint` | exit 1, 1 greška: `src/components/portfolio/Lightbox.jsx` 11:5 `react-hooks/rules-of-hooks` (folder se briše u R2.03) |
| Build | `npm run build` | exit 0, ~5 s; JS: index 255.49 kB (gzip 77.76), sanity 96.17 kB, swiper 68.63 kB, browser 12.51, vendor 11.32, stegaEncodeSourceMap 8.38, portable 8.14; CSS 122.21 kB (gzip 14.70) |
| Sanity šema | `cd sanity; npx sanity schema validate` | exit 0, 0 errors, 0 warnings |

Napomena: `npm run build` piše u `dist/` (gitignored). Za probni build bez diranja `dist/`:
`npx vite build --outDir <scratchpad>/dist-check --emptyOutDir`.

## Lint i build po tasku
- Lint samo fajlova iz WRITE liste: `npx eslint <putanje>` (exit 0). Pun `npm run lint` na kraju R2.03, R2.04 i u R3.01.
- `npm run build` exit 0 posle svakog taska.

## Vizuelno poređenje sa redizajnom
1. Dev server u pozadini sa logom: `npm run dev -- --port 5173 --strictPort > <scratchpad>/dev.log 2>&1` (Bash `run_in_background`). Port 5173,
   ne 5180: Sanity CORS dozvoljava `localhost:5173` (i `:3333`), a na `:5180` svi upiti padaju sa 403 (provereno u R2.01).
2. Redizajn: `python -m http.server 5181 --directory redesign > <scratchpad>/redesign.log 2>&1` (pozadina) ->
   `http://localhost:5181/andrea-milenovic-redesign.html`.
3. Playwright MCP (`browser_resize`, `browser_navigate`, `browser_take_screenshot`, `browser_evaluate`, `browser_run_code_unsafe` za
   `page.route`); ako nije dostupan, chrome-devtools MCP. Ako nijedan nije dostupan: NOT_RUN u handoff-u + IN_REVIEW pitanje vlasniku
   da pogleda `http://localhost:5173`.
4. Viewport-i: 1440x900, 1024x768, 390x844 (R3.01 i 768x1024). Screenshot-ovi idu u scratchpad, ne u repo.
5. Posle provere zaustavi oba servera.

Očekivane razlike do R3.02: broj medija "Design of clothes" 25 umesto 24 (duplikat u Sanity), redosled medija u tom poglavlju
prati Sanity, nazivi kategorija 2-4 su VELIKIM SLOVIMA, hero/Why figure su lokalne slike.

## Provera podataka iz Sanity (Node, bez Vite-a)
Komanda iz kartice R1.02 (VERIFY). Ponavlja se u R3.02 posle izmena u Studiju.

## Produkcija (R3.03)
`curl -sI https://andreamilenovic.com/`, `curl -sI https://andreamilenovic.com/img/hero-figure.webp`, jedan `/assets/*.js`.
