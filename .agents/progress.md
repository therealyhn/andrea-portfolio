# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R3.01 IN_REVIEW 2026-10-01 (Opus 5.5 na "go"). Čišćenje urađeno, QA izmeren; čeka vlasnikovo prihvatanje (gate M2).
  Pregled: preview build na http://localhost:3333 (5182 odbija Sanity CORS), redizajn na http://localhost:5181.
- Aktivan task: R3.01 (IN_REVIEW - "nastavi" nije prihvatanje).
- Sledeći kandidat: R3.02 posle prihvatanja (vlasnik, vođeno; čeka O08, O10).
- Poslednja isporuka: R3.01 IN_REVIEW (commit `R3.01 IN_REVIEW: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | DONE | Opus 5.5 ("nastavi sad"). Schema validate 0/0, Node VERIFY 8/8 izlaza tačno, eslint 0, build 0. Ispravljeni brojevi redova JSON-a u planu (podaci 666, pravni 667). |
| R2.01 | Header, mobilni meni, Hero | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; 3 viewport-a = redizajn po getBoundingClientRect (indeks 25/13/6/6), solid header, meni/Escape/fokus, spy 5/5, konzola 0. Van WRITE: fontsReady.js (čeka Bodoni), dev port 5173 (Sanity CORS). |
| R2.02 | About i Why Me | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; About/Why = redizajn na 1440/1024/390 (47 elemenata, iste visine; 1440/1024 bez starih compact-height pravila), sticky "Why me?", drop cap, konzola 0. Van WRITE: Display `id` prop. |
| R2.03 | Work sekcija i Lightbox | DONE | Opus 5.5 ("nastavi"). eslint/lint/build 0; Work = redizajn na 1440 (sve pozicije), na 390 razlike samo od podataka; strelice/--p, drag, lightbox 01/25, zum, Escape+fokus, video, greška+retry, konzola 0. Van WRITE: workData natpisi. |
| R2.04 | Drawer, Contact, Footer | DONE | Opus 5.5 ("nastavi ovde"). eslint/lint/build 0; Contact i Footer = redizajn na 1440 i 390 (0 razlika); forma (web3forms presretnut): 4 greške, 500 -> alert, uspeh -> Thank you; drawer priča/pravni, Escape, fokus, View the designs; konzola 0. |
| R3.01 | Čišćenje i QA gate | IN_REVIEW | REVIEW, gate M2. Opus 5.5 ("go"). lint/build 0; LH mob 96/100/100/100, desk 100x4; tastatura 94 koraka + zamke; 4 viewport-a = redizajn (iste visine sekcija); 88 asseta i 3 paketa obrisana. |
| R3.02 | Sanity backup, Studio deploy, sadržaj | TODO | REVIEW, vlasnik, čeka O08, O10 |
| R3.03 | Deploy i rollback proba | TODO | REVIEW, vlasnik, čeka O10 |

## Milestone gate registar
| Milestone | Status | Datum i citat |
|---|---|---|
| M1 Osnova | PASSED | 2026-10-01, objektivni kriterijum: build exit 0 + VERIFY R1.02 (gate bez vlasnikovog pregleda) |
| M2 Sekcije | PENDING | |
| M3 Produkcija | PENDING | |

## Otvorene stavke van koda
- O07, O08 PROPOSED; O10, O11 OPEN (vidi `decisions.md`). O10 (hosting, web root, Studio host) treba pre R3.02/R3.03.
- Vlasnik/klijent u Studiju (R3.02): upload izrezanih figura, preimenovanje kategorija 2-4, brisanje duplikata (pozicija 25).

## POSLEDNJI handoff
### Handoff R3.01 - 2026-10-01
- Status: IN_REVIEW (čeka vlasnika: "Da li prihvataš R3.01 kao DONE?")
- Repo: andrea-portfolio, commit "R3.01 IN_REVIEW: čišćenje i QA gate" (hash: `git log -1`)
- Izmenjeni fajlovi: package.json + package-lock.json (`npm uninstall swiper animate.css @portabletext/react`), vite.config.js
  (`manualChunks` bez `portable` i `swiper`), src/index.css (samo 3 `@import` + `@layer base`; obrisani swiper/portfolio CSS i
  compact-height upiti), tailwind.config.js (obrisani `background`, `surface`, `text`, `border`, `primary`, `accent`,
  `fontFamily.display/body`, `keyframes/animation.fadeUp`, `container`, `screens 2k/4k`; grep klasa u src i index.html = 0),
  public/sitemap.xml (`lastmod` 2026-10-01, `image:title` "Andrea Milenović - Fashion &amp; AI Designer", BOM zadržan); obrisano 88
  fajlova bez ijedne reference (grep imena u src, index.html, public/*.xml, public/*.txt = 0; .htaccess bez slika): public/img/
  {about/1.jpg, favicon.png, hero.webp, logo/dark.png, logo/logo.png, news/*, patterns/*, placeholders/*, portfolio/*,
  slider/2.jpg, svg/**} i src/assets/react.svg (ukupno 2,7 MB); ostalo 15 slika koje sajt koristi; van WRITE: nema
- Provere: `npm run lint` -> exit 0 (0 problems); `npm run build` -> exit 0, chunk-ovi: index 260.13 kB (gzip 84.03), sanity 96.17
  (30.84), browser 12.51, vendor 11.32, stegaEncodeSourceMap 8.38, CSS 54.30 kB (gzip 11.16; pre redizajna 122.21) - nema
  `swiper`/`portable`; `npm audit --omit=dev` -> exit 1, 2 nalaza preko `@sanity/client`: follow-redirects <=1.15.11 (moderate,
  preko get-it, radi samo u Node-u) i nanoid 3.3.11 (high, generatori sa negativnom/nultom veličinom - sajt ne prosleđuje unos);
  `npm audit fix` NIJE pokrenut (van kartice; suvi prolaz sa --omit=dev bi brisao dev pakete) - predlog: poseban korak uz
  odobrenje; `grep -rlE "sk-|secret|token" dist/assets` -> sanity-*.js (`token` opcije i poruke @sanity/client) i
  stegaEncodeSourceMap-*.js (reč "secret" u listi ključeva) - očekivano; Web3Forms ključ je u 1 JS fajlu (javni po dizajnu
  Web3Forms; vrednost nije štampana). Lighthouse 12 CLI (lokalni Chrome headless; chrome-devtools MCP pregledač je zauzela druga
  sesija) na `vite preview` :3333: mobilni Performance 96, Accessibility 100, Best Practices 100, SEO 100 (LCP 2.7 s, FCP 1.7 s,
  TBT 0, CLS 0); desktop 100/100/100/100 (LCP 0.6 s). Tastatura (playwright-core u scratchpad-u; Playwright MCP zauzet): 94 Tab
  koraka od skip linka do "Maestro Solutions" - header, nav, hero dugmad, indeks 4, About CTA, po poglavlju "Read the full story",
  strelica, traka, pločice, Why CTA, 4 kontakt linka, 4 polja, Send, footer 9; svaki fokus ima vidljiv outline; disabled strelice
  preskočene; zamka lightbox-a Close -> Previous -> Next -> Close, Escape vraća fokus na pločicu; zamka drawer-a Close <-> View the
  designs, Escape vraća fokus. Reduced motion: 26/26 Reveal elemenata vidljivo i ispod prvog ekrana (kontrola bez reduce: 26
  skrivenih dok se ne skroluje), `scroll-behavior: auto`. Full-page screenshot-ovi preview vs redizajn (reduced motion, ceo skrol
  zbog lazy slika) na 1440x900, 1024x768, 768x1024, 390x844 u scratchpad/pw/shots: iste visine strane (9238, 8032, 10630, 11179) i
  iste pozicije i visine svih sekcija; pikseli koji se razlikuju 0.53% / 0.60% / 0.17% / 0.31%. Konzola 0.
- Razlike prema redizajnu (lista za vlasnika): (1) "Design of clothes" 25 medija umesto 24 (duplikat, briše se u R3.02);
  (2) redosled medija u tom poglavlju prati Sanity; (3) nazivi kategorija 2-4 velikim slovima ("AI DESIGN AND IMAGES GENERATION",
  "AI FASHION VIDEO", "PORTRAITS") - na 1440 "AI FASHION VIDEO" ide u 2 reda, visina poglavlja ista; preimenovanje u R3.02;
  (4) Why Me tekst ima malo drugačiji anti-aliasing (Reveal zadržava transform matricu), raspored isti; (5) ponašanje bolje od
  redizajna: Escape radi posle klika na sliku u lightbox-u (tabIndex -1 na lightbox-u i drawer-u), greška forme se povezuje sa
  poljem samo dok je pogrešno, forma stvarno šalje preko Web3Forms (redizajn je samo prikaz).
- Pregled: git diff --check exit 0; eslint exit 0
- Odstupanja od kartice: preview na :3333 umesto :5182 (Sanity CORS dozvoljava samo :5173 i :3333 - curl 403 za :5182; :5173 je
  zauzeo `vite preview` projekta mane-spa, nije diran); Lighthouse preko CLI-ja, tastatura i screenshot-ovi preko playwright-core
  u scratchpad-u (oba MCP pregledača zauzeta drugom sesijom).
- Napomene: arbitrary vrednosti koje se ponavljaju među sekcijama (`clamp(96px,12vw,180px)` Why/Work/Contact,
  `clamp(88px,10vw,150px)` Contact/Footer) ostale kako jesu - kartica ih ne traži; odluka planera.
- Otvoreno: vlasnikovo prihvatanje (gate M2); `npm audit` nalazi (predlog posebnog koraka); O08/O10 za R3.02/R3.03.
- Tuđe necommitovane izmene: nema
- Sledeći task: posle prihvatanja R3.02 (vlasnik, vođeno; čeka O08 i O10)

## Šablon handoff-a
```
### Handoff <ID> - <datum>
- Status: DONE | IN_PROGRESS | IN_REVIEW | BLOCKED
- Repo: andrea-portfolio, HEAD <hash> "<poruka>"
- Izmenjeni fajlovi: <putanje>; van WRITE: <putanja - razlog | nema>
- Provere: <komanda -> exit / rezultat>; NOT_RUN: <provera - razlog>
- Pregled: <git diff --check, lint>
- Otvoreno: <stavke | nema>
- Tuđe necommitovane izmene: <fajlovi | nema>
- Sledeći task: <ID>
```

## Dnevnik
- 2026-10-01 plan: plan paket napisan; O02 RESOLVED (Sanity samo hero slika, kategorije+mediji, Why Me slika).
- 2026-10-01 plan: vlasnik rešio O01 (sve Tailwind), O03, O04-O06, O09 (bez Sentry-ja); planer proverio Tailwind 3.4 mehanizme CLI testom.
- 2026-10-01 R1.01 DONE (Opus 5.5 na "radi ti"): asseti, tokeni + plugin, head, UI osnova; build/eslint 0.
- 2026-10-01 R1.02 DONE (Opus 5.5 na "nastavi sad"): šema (hidden polja, figure), upit, normalizacija, workData, useSiteMedia; M1 PASSED.
- 2026-10-01 R2.01 DONE (Opus 5.5 na "nastavi"): header, meni, hero = redizajn na 3 viewport-a; fontsReady čeka Bodoni; dev port 5173 (CORS).
- 2026-10-01 R2.02 DONE (Opus 5.5 na "nastavi"): About i Why Me = redizajn na 3 viewport-a, sticky naslov; Display dobio `id`.
- 2026-10-01 R2.03 DONE (Opus 5.5 na "nastavi"): Work + Lightbox = redizajn, interakcije i greška/retry provereni; Portfolio i Swiper kod obrisani.
- 2026-10-01 R2.04 DONE (Opus 5.5 na "nastavi ovde"): Contact, Footer, Drawer = redizajn; forma i drawer provereni (web3forms presretnut).
- 2026-10-01 R3.01 IN_REVIEW (Opus 5.5 na "go"): čišćenje (3 paketa, 88 asseta, stari CSS/tokeni), LH 96-100, 4 viewport-a = redizajn.
