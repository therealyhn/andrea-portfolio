# Plan - redizajn andrea-portfolio po `redesign/andrea-milenovic-redesign.html`

## 1. Misija
Postojeći React + Vite + Tailwind sajt (andreamilenovic.com) dobija izgled i ponašanje iz `redesign/andrea-milenovic-redesign.html`
(jedan HTML fajl, commit `e70b772`). Rezultat je React aplikacija koja izgleda i radi kao taj HTML, sa ovim razlikama:
- Sanity kontroliše SAMO: hero sliku, kategorije (naziv + mediji slike/video), Why Me sliku (O02). Ostalo je statično.
- Kontakt forma stvarno šalje poruku preko Web3Forms (O05); u HTML-u je samo prikaz.
- Stilovi su Tailwind v3 klase u JSX-u (O01), ne CSS iz HTML-a.

Non-goals: nove sekcije, novi tekstovi, nove biblioteke, prerender/SSR, analitika, Sentry (O09), prekodiranje videa (O11),
izmene redizajna. Tekst sajta ostaje na engleskom, tačno kao u redizajnu.

Referenca za čitanje: `.agents/reference/redesign-stripped.html` (isti brojevi redova kao original, bez base64). Original NE čitati
na redovima 353, 472, 535, 666 (base64, ~480 KB). Mapa referentnih redova:
| Deo | CSS redovi | HTML redovi | JS redovi |
|---|---|---|---|
| tokeni, reset, util, dugmad, reveal | 15-73, 401-412 | 416-427 (skip link, sprite) | 670-698 (fontovi, helperi, lock/trap), 950-962 |
| header + mobilni meni | 75-106 | 429-460 | 924-948 |
| hero | 108-166 | 463-485 | 700-704 |
| about | 168-208 | 487-513 | - |
| work | 210-268 | 515-524 | 700-803 |
| why | 270-303 | 526-550 | - |
| contact | 305-340 | 552-604 | 964-983 |
| footer | 342-358 | 607-637 | 985 |
| lightbox | 360-379 | 639-648 | 805-881 |
| drawer | 381-399 | 650-664 | 883-922 |
| podaci (JSON) | - | 666 (redizajn podaci), 667 (pravni tekstovi) | - |

## 2. Ugovori

### 2.1 Sanity šema (posle R1.02)
- `schemaTypes/index.js` = `[hero, workSection, whyMe]`. Fajlovi `about.js`, `contact.js`, `footer.js` se brišu (O03).
- `hero` (title "BANER"): prvo polje `figure` (image, title "SLIKA (izrezana figura)", description "Portret sa providnom pozadinom
  (PNG ili WebP), uspravan format. Preporuka: oko 1360 x 2960 px.", `options: { hotspot: false }`). Postojeća polja `image` i
  `curvedText` ostaju sa `hidden: true`. Preview: `select: { media: "figure" }`, `prepare` vraća `{ title: "Baner - slika", media }`.
- `whyMe` (title "WHY ME"): prvo polje `figure` (image, title "SLIKA (izrezana figura)", description "PNG ili WebP sa providnom
  pozadinom. Preporuka: oko 1560 x 1784 px.", `options: { hotspot: false }`). Postojeća polja `heading`, `descriptionContent`,
  `skills`, `buttonText`, `backgroundImage` dobijaju `hidden: true`, ostalo u njima se ne menja. Preview kao `hero` sa naslovom
  "Why Me - slika".
- `workSection` (title "WORK - KATEGORIJE"): `heading` dobija `hidden: true` i gubi `validation`. `items` dobija title "KATEGORIJE",
  description "Svaka stavka je jedna kategorija na sajtu. Redosled ovde = redosled na sajtu.". U objektu stavke: `title` (title
  "NAZIV KATEGORIJE", required ostaje), `image` dobija `hidden: true` i gubi `validation`, `description` dobija `hidden: true`,
  `gallery` dobija title "MEDIJI (SLIKE / VIDEO)" i description "Slike i video klipovi u ovoj kategoriji. Redosled ovde = redosled
  na sajtu." (`of` ostaje isti). Preview stavke: `select: { title: "title", gallery: "gallery" }`,
  `prepare: ({ title, gallery }) => ({ title: title || "Kategorija", subtitle: \`${(gallery || []).length} medija\` })`.

### 2.2 GROQ upit (`src/lib/sanity/queries.js`, export `SITE_MEDIA_QUERY`)
```
{
  "heroFigure": *[_type == "hero"][0].figure,
  "whyFigure": *[_type == "whyMe"][0].figure,
  "categories": *[_type == "workSection"][0].items[]{
    _key,
    title,
    "media": gallery[]{ _key, _type, "ref": asset._ref, "url": asset->url }
  }
}
```

### 2.3 Normalizovani podaci (`normalizeSiteMedia(raw)` u `src/lib/sanity/normalizeSiteMedia.js`, čista funkcija)
```
SiteMedia = { heroFigure: Figure | null, whyFigure: Figure | null, chapters: Chapter[] }
Figure    = { ref, width, height }                       // iz parseImageRef(figure.asset._ref)
Chapter   = { key, no, title, short, unit, lead, story, items }
            // key = Sanity _key, no = "01".. po redosledu prikazanih poglavlja, title = Sanity naziv (trim)
            // short/unit/lead/story = CHAPTER_COPY[key] ili { short: title, unit: "works", lead: null, story: [] }
ImageItem = { kind: "image", key, ref, width, height, alt }
VideoItem = { kind: "video", key, ref, url, alt, poster, width, height, duration }   // poster/width/height/duration = null ako nema VIDEO_META
```
Pravila: `raw` null ili bez `categories` -> `chapters: []`. Medij `_type === "image"` sa ref-om koji `parseImageRef` ne prepozna se
preskače. Medij `_type === "file"` bez `url` ili sa ref-om koji `parseFileRef` ne prepozna se preskače. Kategorija bez ijednog
važećeg medija se preskače (i ne dobija `no`). Alt slike = `MEDIA_ALT[ref]` ili `${title} ${pad2(i + 1)}`. Video =
`VIDEO_META[ref]` (`{ alt, poster, width, height, duration }`) ili alt `${title} ${pad2(i + 1)}` i ostalo `null`. Figura bez
validnog ref-a = `null`. Duplikati se NE uklanjaju.

### 2.4 Statični podaci (`src/data/`, čisti ES moduli, importi sa eksplicitnim `.js`)
- `workData.js`: `CHAPTER_COPY` po Sanity `_key`:
  - `133fe10f8203`: short "Fashion design", unit "designs", lead = story[0], story = 5 pasusa poglavlja "design" iz reda 666.
  - `13ff0c82d1e2`: short "AI imagery", unit "AI images", lead = story[0], story = 5 pasusa poglavlja "ai".
  - `ab4639cfebd6`: short "AI video", unit "films", lead "Short AI-generated fashion films, from yacht editorials to holiday
    campaigns.", story [].
  - `dc1d157cfab6`: short "Portraits", unit "portraits", lead "Hand-drawn pencil portraits.", story [].
  - `MEDIA_ALT`: `{ "<image ref>": "<a>" }` za svih 43 slike iz reda 666 (24 + 13 + 6).
  - `VIDEO_META`: `{ "file-<id>-mp4": { alt, poster: "/img/posters/<id>.webp", width, height, duration } }` za 6 videa iz reda 666
    (`w`, `h`, `d`, `a`; `<id>` = 40 heks znakova iz URL-a `v`).
  - `WORK_COPY = { eyebrow: "Portfolio", summaryLead: "from technical drawing to AI campaign" }`.
- `siteData.js`: `BRAND` (firstName "Andrea", lastName "Milenović", role "Fashion & AI Designer", place "Based in Požarevac, Serbia",
  copyright "A.M. Design", developer `{ label: "Maestro Solutions", url: "https://maestro-solutions.org" }`), `LOGO_SRC =
  "/img/logo/am-mark.png"`, `NAV_LINKS` (`home` Home, `about` About, `work` My Work, `whyme` Why Me?, `contact` Contact),
  `SECTION_IDS = ["home","about","work","whyme","contact"]`, `CONTACT` (email `contact@andreamilenovic.com`, phoneLabel
  "+381 62 818 6575", phoneHref "tel:+381628186575", instagram `{ handle: "@drea_annn", url: "https://www.instagram.com/drea_annn/" }`,
  linkedin `{ label: "Andrea Milenović", url: "https://www.linkedin.com/in/andrea-milenovi%C4%87-457057276" }`, location
  "Požarevac, Serbia").
- `heroData.js`, `aboutData.js`, `whyData.js`, `contactData.js`, `legalData.js`: tekstovi PREPISANI IZ HTML MARKUP-A redizajna
  (redovi 463-664), ne iz JSON-a u redu 666 (markup ima uređenu verziju: "2025 - 2026", "Svetozar Marković", "Surdulica, General
  program", jedan red školovanja, "Digital Fashion Design / Fashion Design"). Pravni tekstovi iz reda 667.
- Rečenice sa `<em>` delovima su nizovi segmenata `[{ text }, { text, em: true }]` i renderuje ih `ui/RichText.jsx`.

### 2.5 Pomoćni moduli
- `src/lib/utils/sanityRef.js` (bez importa): `parseImageRef(ref)` -> `{ id, width, height, ext }` za
  `/^image-([a-f0-9]+)-(\d+)x(\d+)-([a-z0-9]+)$/`, inače `null`; `parseFileRef(ref)` -> `{ id, ext }` za `/^file-([a-f0-9]+)-([a-z0-9]+)$/`.
- `src/lib/utils/format.js`: `pad2(n)`, `formatDuration(seconds)` -> `m:ss`.
- `src/lib/sanity/imageUrl.js`: `imageUrl(ref, width, quality = 78)` ->
  `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${w}x${h}.${ext}?w=${width}&q=${quality}&fit=max&auto=format`;
  `imageSrcSet(ref, widths, quality)` -> samo širine <= originalne (ako nijedna, `[originalna]`), format `"<url> <w>w, ..."`.
  `projectId`/`dataset` su named export-i iz `src/lib/sanityClient.js` (ista env logika kao sada).
- `src/lib/utils/workSummary.js`: `buildWorkSummary(chapters)` -> niz segmenata `{ text, bold? }` za rečenicu u Work zaglavlju.
  Za 4 poglavlja tačno: `Four chapters, from technical drawing to AI campaign: ` + **`24 designs`** `, ` **`13 AI images`** `, `
  **`6 films`** ` and ` **`6 portraits`** `.` (bold = `<b>`). Broj rečju One..Ten (preko 10 cifre), 1 poglavlje = "One chapter" bez
  " and ", 0 poglavlja = `[]`.

### 2.6 Stanje podataka (`src/hooks/useSiteMedia.js`)
`useSiteMedia()` -> `{ status: "loading" | "ready" | "error", data: SiteMedia | null, retry }`. Jedan `sanityClient.fetch(
SITE_MEDIA_QUERY)` na mount, rezultat kroz `normalizeSiteMedia`. Greška: `status "error"`, `console.error(err)`, `data null`.
`retry()` vraća `loading` i ponavlja upit. Effect cleanup ignoriše odgovor posle unmount-a (StrictMode). Hook se poziva jednom, u
`App.jsx`; deca dobijaju podatke kroz props.

### 2.7 Struktura fajlova (cilj posle R2.04)
```
src/main.jsx                      markFontsReady() pa render
src/App.jsx                       IconSprite, skip link, Header, MobileMenu, <main id="main">{Hero, About, Work, WhyMe, Contact}</main>,
                                  Footer, Lightbox, Drawer; useSiteMedia, useHeaderSolid, useScrollSpy, stanje menija/overlay-a
src/index.css                     tailwind base/components/utilities + mali @layer base (§2.9 pravilo 10)
tailwind.config.js                tokeni + plugin (§2.10)
src/data/                         siteData.js heroData.js aboutData.js workData.js whyData.js contactData.js legalData.js
src/lib/                          sanityClient.js, sanity/{queries,normalizeSiteMedia,imageUrl}.js,
                                  utils/{sanityRef,format,fontsReady,workSummary}.js, validators/contactRules.js, api/submitContact.js
src/hooks/                        useSiteMedia useReveal useScrollLock useFocusTrap useHeaderSolid useScrollSpy useFigureSource
                                  useStripScroll useDragScroll useVideoMeta useLightbox useDrawer useContactForm
src/components/ui/                Icon IconSprite ButtonLink Eyebrow Display Wrap Reveal RichText
src/components/layout/            Header MobileMenu Footer
src/components/sections/          Hero About Work WhyMe Contact
src/components/hero/              HeroMasthead HeroFigure HeroIntro HeroIndex
src/components/about/             AboutArt AboutCopy CvBlock
src/components/work/              WorkHead WorkStatus Chapter ChapterMeta Strip ImageTile VideoTile
src/components/why/               WhyFigure SkillsList WhyClose
src/components/contact/           ContactList ContactForm FormField FormDone
src/components/overlays/          Lightbox LightboxMedia Drawer
```

### 2.8 Statični asseti (R1.01)
| Fajl | Izvor |
|---|---|
| `public/img/logo/am-mark.png` (900x466) | data URI #0 u redizajnu (maska footera, logo u headeru i meniju) |
| `public/img/hero-figure.webp` (680x1480) | data URI #2 |
| `public/img/whyme-figure.webp` (780x892) | data URI #3 |
| `public/img/posters/<fileId>.webp` (6 kom) | data URI #4-#9, `<fileId>` = id iz `v` URL-a ispred svakog |
| `public/img/about/illustration-{480,720,1080}.webp` | `https://cdn.sanity.io/images/0c6yhpfy/production/bdc9e2e778b40f133efac47e91d4827fd2de3e5a-3024x4032.jpg?w=<W>&q=78&fm=webp` |
| `public/img/about/ai-visual-{320,640}.webp` | `https://cdn.sanity.io/images/0c6yhpfy/production/b4a96e3ac9d14a2fd9c0edc5fd20a7ee5dac6523-3508x4961.jpg?rect=1830,455,1590,2100&w=<W>&q=80&fm=webp` |
| `public/img/favicon-am.png` | `https://cdn.sanity.io/images/0c6yhpfy/production/0a6cac8c6cdd916419b521145ce94f2307e6ecd8-2296x1188.png?w=64&h=64&fit=fill&bg=4a0917&fm=png` |

### 2.9 Pravila prevoda CSS -> Tailwind (O01, važe za svaki task)
1. Svako CSS pravilo redizajna postaje Tailwind klase na JSX elementu kome pripada. BEM imena iz redizajna (`hero__fig`, `chap`...)
   se ne pojavljuju u `className` (mogu u komentaru iznad bloka radi orijentacije, npr. `{/* .hero__intro */}`).
2. Vrednost koja se u CSS-u redizajna (redovi 15-412) javlja 2+ puta = token u `tailwind.config.js` (§2.10). Vrednost koja se
   javlja jednom = arbitrary vrednost na mestu (`text-[length:clamp(34px,5.3vw,92px)]`, `leading-[1.04]`). Razmak u arbitrary
   vrednosti = `_` (`top-[calc(var(--hd)_+_3cqh)]`). Font-size sa `min()/clamp()/cq` jedinicama = `text-[length:...]`.
3. Media upiti redizajna (`max-width`) = raw screen-ovi `upto1100:`, `upto959:`, `upto700:`, `upto600:`, `upto560:`. Tailwind
   podrazumevani `sm/md/lg/xl` se ne koriste za prevod.
4. Container upiti hero-a = varijante `cq-portrait:`, `cq-land-1199:`, `cq-land-1023:`, `cq-short:`; hero sekcija ima
   `[container-type:size]`. `.hero::after` gradijent (red 148) = poseban `<div aria-hidden="true">` (`hidden cq-portrait:block ...`).
5. Stanja (`.is-solid`, `.is-open`, `.is-active`, `.is-loaded`, `.is-drag`, `.is-zoom`, `.is-loading`, `.is-bad`, `.is-done`, `.in`)
   = `data-*` atribut (`data-open="true"`) + `data-[open=true]:` na istom elementu ili `group`/`group/<ime>` +
   `group-data-[open=true]/<ime>:` za potomke. Aktivan link: `aria-[current=true]:`. Polje u grešci: `aria-[invalid=true]:`.
6. `::before/::after` = `before:`/`after:` sa `before:content-['']`; `::first-letter` = `first-letter:` na prvom `<p>`;
   `::placeholder` = `placeholder:`; skrivanje scrollbara = `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`.
7. CSS brojači (`.skills li::before`) = broj renderovan u JSX-u (`pad2(i + 1)`) u `<span>` sa stilom iz `::before` pravila.
8. Keyframes i scroll-driven animacije = utility klase iz plugina (§2.10 "motion"). Kašnjenje za `motion-fade` =
   `[--fade-delay:.55s]` na elementu. Pauza do učitavanja fontova = `fonts-pending:[animation-play-state:paused]`.
9. CSS promenljive koje zavise od podataka ostaju promenljive: `style={{ "--i": i }}`, `--d` (Reveal delay), `--ar` (odnos
   stranica pločice), `--p` (napredak trake). `--th` je responsive: `[--th:clamp(320px,60svh,620px)] upto959:[--th:min(116vw,64svh,560px)]`.
   `--hd`: `:root` 72px u base sloju, header sa `data-solid="true"` dobija `data-[solid=true]:[--hd:64px]`.
10. `src/index.css` posle redova `@import "tailwindcss/base|components|utilities"` ima SAMO `@layer base { ... }` sa: `:root {
    --hd: 72px; --ease: cubic-bezier(.2,.7,.1,1) }`, `html` (text-size-adjust, scroll-behavior smooth, scroll-padding-top 64px),
    `body` (red 37: pozadina, boja, font, antialiasing, `overflow-x: clip`, text-rendering), `img, video, svg { display: block;
    max-width: 100% }`, `::selection` (red 43), `:focus-visible` (red 44) i blok `@media (prefers-reduced-motion: reduce)` iz
    redova 408-412 bez reda `[data-reveal]`. Sve ostalo je u klasama.
11. Ponovljen sklop klasa = komponenta iz `ui/` (`ButtonLink`, `Eyebrow`, `Display`, `Wrap`, `Icon`, `Reveal`). Komponenta sa
    varijantama prima prop koji bira JEDNU klasu po svojstvu (dve klase za isto svojstvo na elementu = pobeđuje redosled u
    generisanom CSS-u, ne redosled u `className`).
12. Klase se pišu kao celi stringovi (Tailwind skenira izvor): nikad `"bg-" + color`; mape tipa `{ cream: "bg-cream text-wine" }`.
13. `style={{}}` samo za stavke iz pravila 9 i za `width` slike pri zumiranju u lightbox-u.

### 2.10 Tokeni i plugin u `tailwind.config.js` (R1.01)
| Grupa (`theme.extend`) | Ključevi |
|---|---|
| `colors.wine` | DEFAULT `#4a0917`, `2` `#38060f`, `3` `#22040a`, `glow` `#6e1428`, `tile` `#3a0a14`, `media` `#22060c`, `deep` `#150307` |
| `colors.paper` | DEFAULT `#f4ede4`, `2` `#eae0d3`, `card` `#fbf7f1` |
| `colors.ink` | DEFAULT `#2a0710`, `soft` `#6b4a4f`, `body` `#4a2f34`, `story` `#3d252a`, `hint` `#a08d8f` |
| `colors.cream` | DEFAULT `#f6efe6`, `soft` `#d4bfbb`, `faint` `#ab8e8c`, `blush` `#f2c6c1` |
| `colors.rouge` | `#b8172f` |
| `colors.line` | `dark` `rgba(246,239,230,.16)`, `light` `rgba(42,7,16,.16)` |
| `fontFamily` | `serif` = stek iz reda 30, `sans` = stek iz reda 31 |
| `fontSize` | ključ = broj piksela za svaku veličinu koja se javlja 2+ puta (npr. `11: "11px"` -> `text-11`) |
| `letterSpacing` | ključ = em x 100 za vrednosti 2+ puta (`20: ".2em"` -> `tracking-20`; negativne `neg2: "-.02em"`, `neg1: "-.01em"`) |
| `lineHeight` | ključ = vrednost x 100 za vrednosti 2+ puta (`120: "1.2"` -> `leading-120`) |
| `spacing` | `gutter: "clamp(16px,4vw,64px)"`, `hd: "var(--hd)"` |
| `maxWidth` | `wrap: "1560px"` |
| `transitionTimingFunction` | `editorial: "cubic-bezier(.2,.7,.1,1)"` |
| `screens` | `upto1100: { raw: "(max-width: 1100px)" }`, `upto959`, `upto700`, `upto600`, `upto560` (isti oblik) |
Ostale vrednosti 2+ puta (senke, prozirnosti koje nisu `/<broj>` modifikator) dobijaju ključ `<opis>` u odgovarajućoj grupi i
upisuju se u handoff.

`plugins: [plugin(({ addVariant, addBase, addUtilities }) => { ... })]` (`import plugin from "tailwindcss/plugin.js"` - sa `.js`, inače Node provera iz R1.01 VERIFY pada sa ERR_MODULE_NOT_FOUND):
- `addVariant`: `cq-portrait` = `@container (orientation: portrait)`; `cq-land-1199` = `@container (orientation: landscape) and
  (max-width: 1199px)`; `cq-land-1023` = `... and (max-width: 1023px)`; `cq-short` = `@container (orientation: landscape) and
  (max-height: 560px)`; `fonts-pending` = `html:not(.fonts) &`.
- `addBase`: `@keyframes rise`, `fade`, `figIn` (redovi 133-135), `figOut`, `mastOut` (redovi 140-141).
- `addUtilities` ("motion"): `.motion-rise { animation: rise 1.25s var(--ease) both; animation-delay: calc(.15s + var(--i) * .06s) }`;
  `.motion-fade { animation: fade 1.2s var(--ease) var(--fade-delay, 0s) both }`; `.motion-fig { animation: figIn 1.5s var(--ease)
  .1s both; "@supports (animation-timeline: view())": { animation: "figIn 1.5s var(--ease) .1s both, figOut linear both",
  animationTimeline: "auto, --heroT", animationRange: "normal, exit 0% exit 100%" } }`; `.motion-mast { "@supports (...)": {
  animation: "mastOut linear both", animationTimeline: "--heroT", animationRange: "exit 0% exit 100%" } }`; `.timeline-hero {
  "@supports (...)": { viewTimeline: "--heroT block" } }`; `.opsz-20`, `.opsz-34`, `.opsz-36`, `.opsz-40`, `.opsz-52`
  (`font-variation-settings: "opsz" N`, redovi 402-406). Od 2026-10-01 (O12): `.opsz-12`, `.opsz-18`, `.opsz-24`.

## 3. Milestone-i i gate-ovi
| Milestone | Taskovi | Gate |
|---|---|---|
| M1 Osnova | R1.01, R1.02 | build prolazi, normalizovani podaci odgovaraju 2.3 (VERIFY R1.02) |
| M2 Sekcije | R2.01, R2.02, R2.03, R2.04 | R3.01 IN_REVIEW: vlasnik potvrđuje izgled i ponašanje lokalno |
| M3 Produkcija | R3.01, R3.02, R3.03 | vlasnik potvrđuje sajt na domenu + rollback proba (O10) |

## 4. Task kartice

## R1.01 — Asseti, Tailwind tokeni i plugin, head, osnovni UI
- DEPENDS: O01 RESOLVED (da). PREGLED: NORMAL.
- READ: `.agents/reference/redesign-stripped.html` redovi 1-73, 133-141, 401-427, 669-675, 950-962; `index.html`; `src/index.css`;
  `tailwind.config.js`; `src/main.jsx`; ovaj plan §2.7-§2.10.
- WRITE: `public/img/logo/am-mark.png`, `public/img/hero-figure.webp`, `public/img/whyme-figure.webp`, `public/img/posters/*.webp`,
  `public/img/about/*.webp`, `public/img/favicon-am.png`, `tailwind.config.js`, `src/index.css`, `index.html`, `src/main.jsx`,
  `src/lib/utils/fontsReady.js`, `src/lib/utils/format.js`, `src/components/ui/{Icon,IconSprite,ButtonLink,Eyebrow,Display,Wrap,Reveal}.jsx`,
  `src/hooks/useReveal.js`.
- URADI:
  1. Asseti iz data URI-ja: napravi `<scratchpad>/extract-assets.mjs` (ne ulazi u repo) i pokreni iz korena projekta:
     ```js
     import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
     const html = readFileSync('redesign/andrea-milenovic-redesign.html', 'utf8');
     const found = [...html.matchAll(/data:(image\/[a-z+]+);base64,([A-Za-z0-9+/=]{100,})/g)]
       .map(m => ({ buf: Buffer.from(m[2], 'base64'), at: m.index }));
     console.log('matches', found.length);
     mkdirSync('public/img/posters', { recursive: true });
     writeFileSync('public/img/logo/am-mark.png', found[0].buf);
     writeFileSync('public/img/hero-figure.webp', found[2].buf);
     writeFileSync('public/img/whyme-figure.webp', found[3].buf);
     for (const f of found.slice(4)) {
       const ids = [...html.slice(Math.max(0, f.at - 400), f.at).matchAll(/production\/([0-9a-f]{40})\.mp4/g)];
       const id = ids.pop()[1];
       writeFileSync(`public/img/posters/${id}.webp`, f.buf);
       console.log('poster', id, f.buf.length);
     }
     ```
  2. About slike i favicon: `curl -fsSL -o <fajl> "<URL>"` za svaki red iz §2.8 (5 About fajlova + favicon).
  3. `tailwind.config.js`: tokeni i plugin tačno po §2.10. Za `fontSize`/`letterSpacing`/`lineHeight` prođi CSS redove 15-412 i
     upiši svaku vrednost koja se javlja 2+ puta (spisak dodatih ključeva u handoff). Stari tokeni (`background`, `surface`, `text`,
     `border`, `primary`, `accent`, `display`, `body`, `fadeUp`, `container`, `2k`, `4k`) ostaju do R3.01.
  4. `src/index.css`: tri `@import "tailwindcss/..."` reda + `@layer base` po §2.9 pravilo 10. Iz starog sadržaja OBRIŠI pravila
     `html {...}`, `body {...}`, `h1..h6 {...}` i sva scrollbar pravila; ostala stara pravila (Swiper, `.portfolio-*`,
     `.writing-mode-vertical`, `.about-rich*`, compact-height media upiti) ostaju ispod do R3.01.
  5. `index.html`: title i description iz redova 6-7 redizajna (i u og:/twitter: title/description), `theme-color #4a0917`,
     favicon `/img/favicon-am.png`, Google Fonts URL iz reda 13 umesto Playfair/Inter (zadrži preload+onload obrazac i noscript),
     preload `/img/hero-figure.webp` (sa `fetchpriority="high"`) umesto `/img/hero.webp`, JSON-LD Person: name "Andrea Milenović",
     jobTitle "Fashion & AI Designer", `address {"@type":"PostalAddress","addressLocality":"Požarevac","addressCountry":"RS"}`,
     `sameAs` [Instagram URL, LinkedIn URL iz §2.4]; WebPage name = novi title; noscript: `<h1>Andrea Milenović</h1><p>Fashion & AI
     Designer from Požarevac, Serbia. Fashion design, AI imagery and hand-drawn portraits.</p>`. Canonical, google-site-verification,
     og:image ostaju.
  6. `fontsReady.js`: `markFontsReady()` = logika redova 671-675 (klasa `fonts` na `document.documentElement`, timeout 2500 ms);
     `main.jsx` je poziva pre `createRoot`. `format.js` po §2.5.
  7. UI (prevod po §2.9): `IconSprite` = skriveni `<svg>` sa 8 simbola iz redova 418-427. `Icon({ name, size = 20, className })`:
     `size` 16 | 18 | 20 | 22 bira jednu klasu veličine, ostalo iz reda 48; `className` samo za transform/transition/boju.
     `ButtonLink({ variant: "cream" | "ghost" | "wine", href, onClick, type = "button", icon, disabled, children })`: `<a>` kad ima
     `href`, inače `<button>`; klase iz redova 56-64 (hover pomeranje ikone = `group` + `group-hover:translate-x-1`).
     `Eyebrow({ as = "p", className, children })` = red 50-51 (boju daje roditelj preko `className`). `Display({ as, className,
     children })` = red 52-53 + `opsz-34`. `Wrap({ as = "div", className, children })` = red 49. `Reveal({ as = "div", delay,
     className, children, ...rest })` = element sa ref-om iz `useReveal`, `style={{ "--d": delay }}` kad je zadat, klase:
     `opacity-0 translate-y-7 transition-[opacity,transform] duration-1000 ease-editorial [transition-delay:var(--d,0s)]
     data-[in=true]:opacity-100 data-[in=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0`.
  8. `useReveal()`: modul-nivo jedan `IntersectionObserver` (`rootMargin "0px 0px -6% 0px"`) + `Set` elemenata koji čekaju + `sweep`
     na `scrollend` i `hashchange` (60 ms) po redovima 950-962; callback ref registruje/odjavljuje element; na ulazak postavlja
     `data-in="true"` i prestaje da prati element.
  - BUILDS ON: postojeći `sanityClient.js`, Vite/Tailwind/PostCSS setup. Stare komponente ostaju i rade dalje (izgled im se menja jer
    nema Playfair/Inter - očekivano, zamenjuju se u R2.x).
  - FORBIDDEN: nove npm zavisnosti (uključujući `@tailwindcss/container-queries`); CSS fajlovi po sekcijama; `@apply`; čitanje
    redova 353/472/535/666 originala; commit fajla iz scratchpad-a.
- VERIFY / DONE:
  - Skripta ispisuje `matches 10` i 6 redova `poster <id> <bajtovi>`; `ls -l public/img/logo/am-mark.png public/img/hero-figure.webp
    public/img/whyme-figure.webp` = 22803, 90930, 47382 bajtova.
  - `node -e "for (const f of require('fs').readdirSync('public/img/about')) { const b = require('fs').readFileSync('public/img/about/' + f); console.log(f, b.length, b.subarray(8, 12).toString()) }"`
    -> 5 fajlova, svaki `WEBP`, svaki > 5000 bajtova.
  - `node --input-type=module -e "import resolveConfig from 'tailwindcss/resolveConfig.js'; import cfg from './tailwind.config.js'; const t = resolveConfig(cfg).theme; console.log(Object.keys(t.colors.wine).join(','), JSON.stringify(t.screens.upto959), t.fontFamily.serif[0], t.spacing.gutter)"`
    -> `DEFAULT,2,3,glow,tile,media,deep {"raw":"(max-width: 959px)"} "Bodoni Moda" clamp(16px,4vw,64px)`.
  - `npx vite build --outDir <scratchpad>/dist-check --emptyOutDir` exit 0 i `grep -c "@keyframes figIn" <scratchpad>/dist-check/assets/*.css` >= 1.
  - `npx eslint src/main.jsx src/lib/utils src/components/ui src/hooks/useReveal.js` exit 0 (stari `ui/Button.jsx`, `BurgerMenu`,
    `CurvedText`, `LegalModal` su u istom folderu - ako padaju na postojećim greškama, eslint samo nad novim fajlovima i zapiši).
- STOP: data URI broj != 10; curl vraća grešku (mreža/Sanity); Tailwind ne generiše klasu iz §2.10 (zapiši klasu i izlaz).

## R1.02 — Sanity šema i sloj podataka
- DEPENDS: R1.01 DONE, O03 i O04 RESOLVED (da). PREGLED: NORMAL.
- READ: `sanity/schemaTypes/*.js`, `src/lib/sanityClient.js`, `.agents/reference/redesign-stripped.html` red 666 i redovi 683-685;
  ovaj plan §2.1-§2.6.
- WRITE: `sanity/schemaTypes/{hero,whyMe,workSection,index}.js`, brisanje `sanity/schemaTypes/{about,contact,footer}.js`,
  `src/lib/sanityClient.js` (samo named export `projectId`, `dataset`), `src/lib/sanity/{queries,normalizeSiteMedia,imageUrl}.js`,
  `src/lib/utils/{sanityRef,workSummary}.js`, `src/data/workData.js`, `src/hooks/useSiteMedia.js`.
- URADI: šema tačno po §2.1; upit po §2.2; normalizacija po §2.3; `workData.js` po §2.4 (alt tekstovi i video podaci prepisani iz
  reda 666, ključ = ceo ref string, npr. `image-2872cd...-3508x4961-jpg`, `file-119221eb...-mp4`); pomoćni moduli po §2.5;
  hook po §2.6. Čisti moduli (`src/data`, `queries`, `normalizeSiteMedia`, `sanityRef`, `format`, `workSummary`) ne importuju
  ništa što koristi `import.meta.env` i koriste importe sa `.js` ekstenzijom (pokreću se i u Node-u).
  - BUILDS ON: postojeći `sanityClient` (`useCdn: true`, apiVersion `2025-01-01`), postojeći dokumenti u datasetu.
  - FORBIDDEN: brisanje polja koja imaju podatke (samo `hidden: true`); upis u Sanity dataset; `npx sanity deploy` (to je R3.02);
    statična kopija kategorija kao rezerva kad Sanity padne (greška se prikazuje, O04).
- VERIFY / DONE:
  - `cd sanity; npx sanity schema validate` -> `0 errors`, `0 warnings`.
  - Iz korena projekta:
    ```
    node --input-type=module -e "
    import { SITE_MEDIA_QUERY } from './src/lib/sanity/queries.js';
    import { normalizeSiteMedia } from './src/lib/sanity/normalizeSiteMedia.js';
    import { MEDIA_ALT, VIDEO_META } from './src/data/workData.js';
    import { buildWorkSummary } from './src/lib/utils/workSummary.js';
    const url = 'https://0c6yhpfy.apicdn.sanity.io/v2025-01-01/data/query/production?query=' + encodeURIComponent(SITE_MEDIA_QUERY);
    const { result } = await (await fetch(url)).json();
    const d = normalizeSiteMedia(result);
    console.log(Object.keys(MEDIA_ALT).length, Object.keys(VIDEO_META).length);
    for (const c of d.chapters) console.log([c.key, c.no, c.short, c.unit, c.items.length, c.items.filter(i => / \d{2}$/.test(i.alt)).length].join('|'));
    console.log('figures', d.heroFigure, d.whyFigure);
    console.log(buildWorkSummary(d.chapters).map(s => s.text).join(''));
    const n = normalizeSiteMedia({ categories: [{ _key: 'x', title: 'New', media: [
      { _key: 'a', _type: 'image', ref: 'image-abc-100x200-jpg' }, { _key: 'b', _type: 'file', ref: 'file-def-mp4', url: 'https://x/def.mp4' },
      { _key: 'c', _type: 'image', ref: null }] }, { _key: 'y', title: 'Empty', media: [] }] });
    console.log(JSON.stringify(n.chapters.map(c => [c.short, c.unit, c.lead, c.items.map(i => [i.kind, i.alt, i.poster ?? null])])));
    console.log(JSON.stringify(normalizeSiteMedia(null)));
    "
    ```
    Očekivano: `43 6`; `133fe10f8203|01|Fashion design|designs|25|0`, `13ff0c82d1e2|02|AI imagery|AI images|13|0`,
    `ab4639cfebd6|03|AI video|films|6|0`, `dc1d157cfab6|04|Portraits|portraits|6|0`; `figures null null` (dok vlasnik ne
    upiše `figure` u R3.02); `Four chapters, from technical drawing to AI campaign: 25 designs, 13 AI images, 6 films and 6
    portraits.`; `[["New","works",null,[["image","New 01",null],["video","New 02",null]]]]`;
    `{"heroFigure":null,"whyFigure":null,"chapters":[]}`.
  - `npx eslint src/lib src/data src/hooks/useSiteMedia.js` exit 0; `npm run build` exit 0.
- STOP: `_key` kategorija iz upita se razlikuje od §2.4 (neko je menjao Sanity) - upiši stvarne vrednosti u handoff i pitaj.

## R2.01 — Header, mobilni meni, Hero
- DEPENDS: R1.02 DONE. PREGLED: NORMAL.
- READ: `.agents/reference/redesign-stripped.html` redovi 75-166, 416-485, 688-704, 924-948; `src/App.jsx`;
  `src/components/sections/Hero.jsx` (stari, zamenjuje se); ovaj plan §2.3-§2.10.
- WRITE: `src/App.jsx`, `src/components/layout/{Header,MobileMenu}.jsx`, `src/components/sections/Hero.jsx` (prepisuje stari),
  `src/components/hero/{HeroMasthead,HeroFigure,HeroIntro,HeroIndex}.jsx`, `src/data/{siteData,heroData}.js`,
  `src/hooks/{useHeaderSolid,useScrollSpy,useScrollLock,useFocusTrap,useFigureSource}.js`, `tailwind.config.js` (samo novi tokeni
  po §2.9 pravilo 2, ako nedostaju), brisanje `src/components/ui/{BurgerMenu,CurvedText}.jsx`.
- URADI (stilovi = prevod CSS redova 75-166 po §2.9):
  - `App.jsx`: `IconSprite`, skip link (redovi 46-47 + 416), `Header`, `MobileMenu`, `<main id="main">` sa novim `Hero` + starim
    `About`, `Portfolio`, `WhyMeSec`, `Contact`, pa stari `Footer`. `useSiteMedia()` jednom; `Hero` dobija `heroFigure`, `chapters`,
    `status`, `sentinelRef`.
  - `useHeaderSolid(sentinelRef)` -> boolean po redu 939. `useScrollSpy(SECTION_IDS)` -> `activeId` po redovima 940-948
    (`aria-current="true"` samo na aktivnom linku).
  - `useScrollLock(active)`: modul-nivo brojač; dok je > 0, `document.body` ima klasu `overflow-hidden` (redovi 689-690, 401).
    `useFocusTrap(ref, active)`: Tab petlja po redovima 691-698.
  - `Header`: markup 429-442, `data-solid` + `group/hd` za stanje `is-solid` (pozadina, blur, border, `--hd: 64px`, natpis pored
    logoa vidljiv), logo `LOGO_SRC`, linkovi iz `NAV_LINKS`, dugme Menu sa `aria-expanded`; ref dugmeta drži `App`.
  - `MobileMenu`: markup 444-460 (`--i` = indeks linka), `data-open` + `group/mn`; ponašanje po 925-935: fokus na Close posle
    60 ms, Escape zatvara, klik na link zatvara, posle zatvaranja fokus na Menu (`preventScroll`), `useScrollLock`, `useFocusTrap`.
  - `Hero` = sekcija 463-485 sa `[container-type:size]` i `timeline-hero`: `HeroMasthead` (slova iz `BRAND.firstName` sa `--i` i
    `motion-rise`, prezime sa `motion-fade [--fade-delay:.55s]`, oba `fonts-pending:[animation-play-state:paused]`, red slova
    `motion-mast`, sr tekst), kicker (`hidden cq-portrait:block`), mesto sa `pin` ikonom, `HeroFigure` (`motion-fig`),
    portrait gradijent kao `<div>` (§2.9 pravilo 4), `HeroIntro` (eyebrow, lead, 2 dugmeta iz `heroData`), `HeroIndex` (red 702:
    `#ch-<key>`, `no`, `short`, broj medija; dok `status !== "ready"` prazan `<ol>`), sentinel span.
  - `HeroFigure` + `useFigureSource(figure, local)` po O06: početno `src="/img/hero-figure.webp"` width 680 height 1480; kad Sanity
    figura postoji, `new Image()` učita `imageUrl(ref, 1360)` i posle `onload` isti `<img>` dobija `src`, `srcSet =
    imageSrcSet(ref, [480, 680, 1020, 1360])`, `sizes = min(<82*ar>vh, <1240*ar>px)`, width/height = dimenzije figure.
    `alt "Andrea Milenović in a white suit"`, `fetchPriority="high"`, `decoding="async"`.
  - BUILDS ON: `ButtonLink`, `Icon`, `Eyebrow`, `Display`, `useSiteMedia`, `imageUrl`, tokeni i plugin iz R1.01.
  - FORBIDDEN: dva `<img>` sloja sa opacity prelazom (O06); JS scroll handler za header umesto IntersectionObserver-a; BEM klase.
- VERIFY / DONE:
  - `npx eslint` nad svim fajlovima iz WRITE liste exit 0; `npm run build` exit 0.
  - Vizuelno (verification.md §Vizuelno): screenshot vrha stranice na 1440x900, 1024x768, 390x844 za `:5173` i redizajn `:5181`;
    masthead, figura, intro i indeks na istim mestima (indeks pokazuje 25/13/6/6 dok se ne obriše duplikat). Posle skrola 700 px
    header ima `data-solid="true"`. Na 390x844: Menu otvara meni, Escape zatvara, `document.activeElement` je dugme Menu. Konzola bez
    grešaka. `getComputedStyle` na slovu "A" pre i posle učitavanja fontova: `animation-name` = `rise`.
- STOP: vizuelni alat nedostupan -> handoff sa NOT_RUN i status IN_REVIEW sa pitanjem vlasniku da pogleda `http://localhost:5173`.

## R2.02 — About i Why Me
- DEPENDS: R2.01 DONE. PREGLED: NORMAL.
- READ: `.agents/reference/redesign-stripped.html` redovi 168-208, 270-303, 487-513, 526-550; `src/App.jsx`; ovaj plan §2.4, §2.9.
- WRITE: `src/components/sections/{About,WhyMe}.jsx` (About prepisuje stari), `src/components/about/{AboutArt,AboutCopy,CvBlock}.jsx`,
  `src/components/why/{WhyFigure,SkillsList,WhyClose}.jsx`, `src/components/ui/RichText.jsx`, `src/data/{aboutData,whyData}.js`,
  `src/App.jsx`, `tailwind.config.js` (samo novi tokeni, ako nedostaju), brisanje `src/components/sections/WhyMeSec.jsx`,
  `src/components/whyme/` (ceo folder), `src/components/ui/Button.jsx` (samo ako `grep -rn "ui/Button\"" src` posle izmene nema pogodaka).
- URADI: markup po redovima 487-513 i 526-550, stilovi = prevod redova 168-208 i 270-303 po §2.9, `Reveal` umesto `data-reveal`
  (iste `--d` vrednosti). About slike iz `public/img/about/` sa `srcSet`/`sizes`/width/height/alt/caption kao u redovima 493-495
  (Sanity URL-ovi -> lokalni fajlovi istih širina). Drop cap = `first-letter:` klase na prvom pasusu (red 186 + `opsz-40`).
  `CvBlock` za "Work experience" i "Education". `WhyFigure`: Sanity `whyFigure` -> `imageUrl(ref, 780)`, `srcSet` [390, 780,
  1170, 1560], `sizes "(max-width: 959px) 88vw, 600px"`; bez figure `/img/whyme-figure.webp` 780x892; alt "Andrea Milenović
  holding a laptop", `loading="lazy"`. `SkillsList` = 10 stavki iz markup-a, broj `pad2(i + 1)` u `<span>` (§2.9 pravilo 7).
  `App.jsx`: `WhyMeSec` -> `WhyMe` sa `whyFigure`.
  - BUILDS ON: `Reveal`, `Eyebrow`, `Display`, `Wrap`, `ButtonLink`, `Icon`, `imageUrl`, tokeni iz R1.01.
  - FORBIDDEN: tekst iz JSON-a u redu 666 (vidi §2.4); `overflow-hidden` na precima sticky naslova (lomi sticky; redizajn koristi
    `overflow: clip` na sekciji - `overflow-clip`).
- VERIFY / DONE: eslint WRITE fajlova exit 0; `npm run build` exit 0; vizuelno About i Why na 1440x900, 1024x768, 390x844 prema
  redizajnu (drop cap crvenim, umetnuta slika preklapa glavnu, 2 kolone veština 01-10, naslov "Why me?" ostaje zalepljen dok se
  skroluje desna kolona na 1440 - dva screenshot-a na dve pozicije skrola).
- STOP: kao R2.01.

## R2.03 — Work sekcija i Lightbox
- DEPENDS: R2.02 DONE. PREGLED: NORMAL.
- READ: `.agents/reference/redesign-stripped.html` redovi 210-268, 360-379, 515-524, 639-648, 700-881; `src/App.jsx`;
  `src/data/workData.js`; ovaj plan §2.3, §2.5, §2.6, §2.9.
- WRITE: `src/components/sections/Work.jsx`, `src/components/work/{WorkHead,WorkStatus,Chapter,ChapterMeta,Strip,ImageTile,VideoTile}.jsx`,
  `src/components/overlays/{Lightbox,LightboxMedia}.jsx`, `src/hooks/{useStripScroll,useDragScroll,useVideoMeta,useLightbox}.js`,
  `src/App.jsx`, `tailwind.config.js` (samo novi tokeni), brisanje `src/components/sections/Portfolio.jsx` i `src/components/portfolio/`.
- URADI (stilovi = prevod redova 210-268 i 360-379 po §2.9):
  - `Work` = `WorkHead` (eyebrow, naslov "My <em>work</em>", rečenica iz `buildWorkSummary`; dok se učitava prazan `<p>`) + po
    stanju: `loading` -> `WorkStatus` "Loading portfolio..." (`role="status"`); `error` -> `WorkStatus` "The portfolio could not be
    loaded." (`role="alert"`) + `ButtonLink` variant ghost "Try again" (`onClick={retry}`); `ready` -> `Chapter` za svako poglavlje.
    `WorkStatus` = `Wrap` + `py-16 text-cream-soft` (element van redizajna).
  - `Chapter` = `<article id={"ch-" + key} aria-labelledby={"cht-" + key}>` po redovima 724-745. `ChapterMeta`: "Chapter <no>",
    naslov, lead (ako postoji), dugme "Read the full story" SAMO kad `story.length > 1` I postoji prop `onOpenStory` (u ovom tasku
    se ne prosleđuje - dodaje ga R2.04), brojač i strelice. `Strip`: scroller (`tabIndex 0`, `role="region"`, aria-label iz reda
    740, `group/strip` + `data-drag`), `<ul>` traka, pločice, traka napretka sa `--p`.
  - `useStripScroll(scrollerRef, tileCount)` -> `{ index, atStart, atEnd, progress, scrollByDir }` po redovima 752-772 i 795-801
    (rAF, `ResizeObserver`, strelice 82 % širine, tastatura 50 %, `behavior: "auto"` kad je `prefers-reduced-motion`).
    `useDragScroll(scrollerRef)` po 773-794 (samo miš, `data-drag="true"` tokom prevlačenja, gutanje klika posle prevlačenja).
  - `ImageTile` po redovima 716-722 (`--ar`, `--th` po §2.9 pravilo 9, `imageUrl(ref, 480)`, `imageSrcSet(ref, [320, 480, 720, 960,
    1280])`, `sizes` formula iz reda 719, `data-loaded="true"` posle `onLoad` ili ako je `img.complete` pri mount-u, broj "01 / 24").
  - `VideoTile` po redovima 709-714. Sa `poster`: `<img src={poster} alt="">` (odmah vidljiva) i dimenzije iz reda 712. Bez postera:
    `<video src={url + "#t=0.1"} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} className="size-full object-cover">`;
    `useVideoMeta()` vraća `{ meta, onLoadedMetadata }` (videoWidth, videoHeight, duration) -> `--ar` (podrazumevano 16/9) i
    trajanje u natpisu kad postane poznato.
  - Lightbox: `useLightbox(chapters)` -> `{ state, openItem(ci, ii, triggerEl), close, go(delta) }`; `Lightbox` uvek montiran
    (`data-open`), ponašanje po redovima 805-881: naslov = naziv poglavlja, brojač, natpis + "Click/Tap the image to zoom"
    (`(hover: none)`), slika (`srcSet` [800, 1200, 1600, 2200] q82, `src` 1200, `sizes` iz reda 823, `data-loading` do `onLoad`,
    prethodno učitavanje susednih), zum (852-868, `data-zoom` na stage-u, `style.width` slike), swipe (869-875), tastatura
    (876-881), klik na pozadinu zatvara, video (`controls playsInline autoPlay preload="auto"`, `key` = url, pauza pri zatvaranju i
    navigaciji), mediji se uklanjaju 420 ms posle zatvaranja, fokus na Close posle 50 ms, povratak fokusa na pločicu,
    `useScrollLock`, `useFocusTrap`. Navigacija ide u krug.
  - `App.jsx`: `Portfolio` -> `Work` (`media`, `status`, `retry`, `onOpenItem`); `Lightbox` posle `Footer`-a.
  - BUILDS ON: `useSiteMedia`, `imageUrl`, `buildWorkSummary`, `Reveal`, `Icon`, `Wrap`, `useScrollLock`, `useFocusTrap`.
  - FORBIDDEN: Swiper ili druga biblioteka za traku; statična rezerva za kategorije; prazan `onClick`.
- VERIFY / DONE:
  - eslint WRITE fajlova exit 0; `npm run lint` -> nema više greške iz `portfolio/Lightbox.jsx` (folder obrisan); `npm run build` exit 0.
  - Vizuelno na 1440x900 i 390x844 prema redizajnu (zaglavlje, 4 poglavlja, pločice, natpisi videa). Interakcije (Playwright):
    klik na desnu strelicu menja brojač i `--p`; prevlačenje mišem 300 px skroluje i NE otvara lightbox; klik na pločicu otvara
    lightbox sa nazivom poglavlja i "01 / 25"; `ArrowRight` -> "02 / 25"; klik na sliku -> `data-zoom="true"`; `Escape` zatvara i
    fokus je na pločici; video pločica otvara `<video controls>`.
  - Greška: Playwright `page.route('**/*.apicdn.sanity.io/**', r => r.abort())` + reload -> "The portfolio could not be loaded." i
    "Try again"; `page.unroute` + klik "Try again" -> poglavlja se pojave.
- STOP: kao R2.01; `scrollend` nije podržan u test pregledaču (zapiši, `hashchange` + IO i dalje rade).

## R2.04 — Drawer, Contact, Footer
- DEPENDS: R2.03 DONE, O05 RESOLVED (da). PREGLED: NORMAL.
- READ: `.agents/reference/redesign-stripped.html` redovi 305-358, 381-399, 552-637, 650-664, 667, 883-922, 964-985;
  `src/components/sections/Contact.jsx` (stari, samo naziv env ključa); `src/App.jsx`; `src/components/work/{Chapter,ChapterMeta}.jsx`.
- WRITE: `src/components/overlays/Drawer.jsx`, `src/hooks/{useDrawer,useContactForm}.js`, `src/data/{contactData,legalData}.js`,
  `src/components/sections/Contact.jsx` (prepisuje stari), `src/components/contact/{ContactList,ContactForm,FormField,FormDone}.jsx`,
  `src/lib/validators/contactRules.js`, `src/lib/api/submitContact.js`, `src/components/layout/Footer.jsx` (prepisuje stari),
  `src/components/sections/Work.jsx`, `src/components/work/{Chapter,ChapterMeta}.jsx` (samo prosleđivanje `onOpenStory`),
  `src/App.jsx`, `tailwind.config.js` (samo novi tokeni), brisanje `src/components/ui/LegalModal.jsx` i `src/hooks/useInView.js`
  (ako `grep -rn useInView src` nema pogodaka).
- URADI (stilovi = prevod redova 305-358 i 381-399 po §2.9):
  - `useDrawer()` -> `{ state, openStory(ci, triggerEl), openLegal(docKey, triggerEl), close }`; `Drawer` uvek montiran (`data-open`),
    po redovima 883-922: priča (kicker "Chapter <no>", naslov, meta "<broj> <unit>", pasusi, dugme "View the <unit>" -> zatvori pa
    posle 120 ms `scrollIntoView` na `#ch-<key>`), pravni tekst (kicker "Legal", meta "Last updated: March 2026", h3 + p po
    odeljku, stil prvog pasusa kao red 398, podnožje "© <godina> A.M. Design. All rights reserved."), traka napretka po skrolu tela,
    skrol na vrh i traka 0 pri otvaranju, Escape, klik na scrim, fokus na Close posle 60 ms, povratak fokusa, `useScrollLock`,
    `useFocusTrap`.
  - Work: `onOpenStory` prosleđen do `ChapterMeta` (dugme se pojavljuje za "Design of clothes" i AI poglavlje).
  - `Contact` po redovima 552-604: `ContactList` (5 redova iz `CONTACT`), `ContactForm` + `FormField` (label, input/textarea, poruka
    greške, `aria-describedby`, `aria-invalid`), `FormDone` ("Thank you, <em>{ime}</em>.").
  - `contactRules.js` = pravila iz redova 966-971. `useContactForm()` -> vrednosti, polja u grešci, `status` ("idle" | "sending" |
    "sent" | "error"), `firstName`, handleri (blur proverava ako ima vrednost, input ponovo proverava polje koje je u grešci, submit
    proverava sva polja i fokusira prvo pogrešno, pa šalje).
  - `submitContact(values)`: ključ `import.meta.env.VITE_WEB3FORMS_KEY` (prazan -> greška bez mrežnog poziva); `fetch` POST
    `https://api.web3forms.com/submit`, headers `Content-Type: application/json`, `Accept: application/json`, telo
    `{ access_key, name, email, phone, message }`; `!res.ok` ili `success !== true` -> baci `{ message, code }`. Dok se šalje dugme
    je `disabled` i piše "Sending...". Greška: ispod podnožja forme `<p role="alert" className="mt-4 text-sm text-rouge">` sa
    `contactData.errorMessage` = "Your message could not be sent. Please try again or write to contact@andreamilenovic.com.";
    vrednosti ostaju u formi. Uspeh: forma se sakriva, prikazuje se `FormDone` (redovi 337-338).
  - `Footer` po redovima 607-637: godina iz `new Date().getFullYear()`, dugmad Privacy/Terms -> `openLegal`, ikone `ig`/`in`, znak
    = `<div aria-hidden="true">` sa `[mask:url(/img/logo/am-mark.png)_top_center/100%_auto_no-repeat]` i gradijentom iz reda 353.
  - `App.jsx` konačan redosled po §2.7 (stari `About`/`Contact`/`Footer` više ne postoje u importima).
  - BUILDS ON: `useScrollLock`, `useFocusTrap`, `ButtonLink`, `Icon`, `Reveal`, `Wrap`, `Display`, tokeni iz R1.01.
  - FORBIDDEN: stvarno slanje poruke u VERIFY (šalje mejl klijentu); štampanje vrednosti iz `.env.local`; nova polja forme
    (subject, botcheck) koja nisu u ugovoru.
- VERIFY / DONE:
  - eslint WRITE fajlova exit 0; `npm run lint` exit 0 ili samo greške u fajlovima koje R3.01 briše (navedi ih); `npm run build` exit 0.
  - Vizuelno Contact i Footer na 1440x900 i 390x844 prema redizajnu.
  - Forma (Playwright, poziv presretnut sa `page.route('https://api.web3forms.com/submit', ...)`): prazan submit -> 4 greške i fokus
    na Name; odgovor `{"success":true}` -> "Thank you, <ime>."; odgovor status 500 -> `role="alert"` poruka, vrednosti ostale.
    Telo presretnutog zahteva ima tačno ključeve `access_key,name,email,phone,message`.
  - Drawer: "Read the full story" otvara priču, Escape zatvara, fokus se vraća; "View the designs" skroluje do poglavlja; Privacy
    i Terms otvaraju pravne tekstove.
- STOP: `VITE_WEB3FORMS_KEY` ne postoji u `.env.local` (proveri samo ime: `grep -c "^VITE_WEB3FORMS_KEY=" .env.local`).

## R3.01 — Čišćenje i QA gate
- DEPENDS: R2.04 DONE. PREGLED: REVIEW (gate M2).
- READ: `package.json`, `vite.config.js`, `tailwind.config.js`, `src/index.css`, `public/sitemap.xml`, `.agents/verification.md`.
- WRITE: `package.json`, `package-lock.json`, `vite.config.js`, `tailwind.config.js`, `src/index.css`, `public/sitemap.xml`,
  brisanje nekorišćenih fajlova u `public/img/` i `src/assets/`.
- URADI:
  - `npm uninstall swiper animate.css @portabletext/react`; iz `manualChunks` ukloni `portable` i `swiper`.
  - `src/index.css`: ostaju samo tri `@import` reda i `@layer base` (stara pravila ispod se brišu).
  - `tailwind.config.js`: ukloni stare tokene (`background`, `surface`, `text`, `border`, `primary`, `accent`, `fontFamily.display`,
    `fontFamily.body`, `keyframes.fadeUp`, `animation.fadeUp`, `container`, `screens 2k/4k`) - pre brisanja svakog `grep -rn` u `src`
    za njegove klase (npr. `bg-surface`, `text-text-`, `font-display`, `2k:`) mora dati 0 pogodaka.
  - Brisanje asseta: fajl iz `public/img/` (i `src/assets/react.svg`) se briše ako `grep -rn "<ime fajla>" src index.html public/*.xml
    public/*.txt` daje 0 pogodaka. Ne briše se `public/banner.jpg` (og:image) ni `public/.htaccess`, `robots.txt`, `sitemap.xml`.
  - `sitemap.xml`: `lastmod` = datum taska; `image:title` "Andrea Milenović - Fashion & AI Designer".
  - FORBIDDEN: brisanje `redesign/` foldera i `.agents/reference/`; menjanje boja/razmaka redizajna da bi QA prošao bez odluke vlasnika.
- VERIFY / DONE (rezultate u handoff):
  - `npm run lint` exit 0 (0 problems); `npm run build` exit 0 + veličine chunk-ova (nema `swiper`/`portable`); `npm audit --omit=dev`.
  - `grep -rlE "sk-|secret|token" dist/assets` -> samo očekivani nazivi iz biblioteka (zapiši); Web3Forms access key jeste u bundle-u
    (javni ključ po dizajnu Web3Forms - zapiši).
  - `npm run preview -- --port 5182 --strictPort` + Lighthouse (chrome-devtools MCP) mobile i desktop: zapiši Performance,
    Accessibility, Best Practices, SEO. Cilj: Accessibility >= 95, SEO >= 95, Best Practices >= 95; Performance se zapisuje
    (ispod 80 na mobilnom = nalaz u handoff-u sa uzrokom iz izveštaja).
  - Pun prolaz tastaturom (Tab od skip linka do footera: header, hero dugmad, indeks, trake, pločice, lightbox zamka, forma,
    drawer zamka); `prefers-reduced-motion: reduce` emulacija -> svi `Reveal` elementi vidljivi.
  - Full-page screenshot na 1440x900, 1024x768, 768x1024, 390x844 za preview i redizajn, sačuvani u scratchpad-u; razlike opisane u
    handoff-u (očekivane: 25 vs 24 medija dok vlasnik ne obriše duplikat, redosled medija iz Sanity).
  - IN_REVIEW: pitanje vlasniku "Da li prihvataš R3.01 kao DONE?" sa URL-om `http://localhost:5182` i listom razlika.
- STOP: Lighthouse Accessibility < 95 ili kontrast koji ne prolazi - opiši nalaz, ne menjaj boje iz redizajna bez odluke vlasnika.

## R3.02 — Sanity: backup, Studio deploy, sadržaj (vlasnik, vođeno)
- DEPENDS: R3.01 DONE, O08 i O10 (Studio host) RESOLVED. PREGLED: REVIEW. Executor: Opus 5 (produkcioni CMS).
- READ: `.agents/decisions.md` O03, O04, O08, O10; `sanity/schemaTypes/*.js`.
- WRITE: samo `.agents/` fajlovi (handoff, progress, decisions). Sve izmene u Sanity radi vlasnik.
- URADI (vlasnik izvršava, executor daje JEDNU komandu ili klik i čeka izlaz, work-protocol §6):
  1. `cd C:\xampp\htdocs\Projects\andrea-portfolio\sanity` pa `npx sanity login` (ako traži).
  2. `npx sanity dataset export production C:\backups\andrea-portfolio\sanity-production-<YYYYMMDD>.tar.gz --no-assets` (putanja iz O08).
  3. `tar -tzf <fajl> | Select-Object -First 5` -> postoji `data.ndjson`.
  4. Probni restore: `npx sanity dataset create restore-test --visibility private`; `npx sanity dataset import <fajl> restore-test`;
     `npx sanity documents query "*[_type == 'workSection'][0].items[].title" --dataset restore-test` -> 4 naziva;
     `npx sanity dataset delete restore-test`. Ako plan ne dozvoljava drugi dataset - zapiši izlaz i pitaj vlasnika (O08).
  5. `npx sanity schema validate` -> 0 errors; `npx sanity deploy` (host iz O10).
  6. U Studiju (vlasnik): BANER -> SLIKA: upload izrezane figure (original visoke rezolucije ako postoji, inače
     `public/img/hero-figure.webp`), Publish. WHY ME -> SLIKA: isto za `whyme-figure`, Publish.
  7. WORK - KATEGORIJE: nazivi "AI design and image generation", "AI fashion video", "Portraits"; u "Design of clothes" obrisati
     medij na poziciji 25 (duplikat, `_key 3400972d6ddd`); Publish.
- VERIFY / DONE: executor ponovi Node proveru iz R1.02 -> `figures` nisu `null`, naslovi kao u koraku 7, `133fe10f8203|01|...|24|0`;
  lokalni `npm run dev` + screenshot hero-a i Why Me sa Sanity figurama; IN_REVIEW pitanje vlasniku.
- STOP: bilo koja komanda vrati grešku autentikacije ili limit plana; vlasnik ne potvrdi korak.

## R3.03 — Deploy i rollback proba (vlasnik, vođeno)
- DEPENDS: R3.02 DONE, O10 RESOLVED. PREGLED: REVIEW. Executor: Opus 5 (produkcija).
- READ: `.agents/decisions.md` O08, O10; `public/.htaccess`.
- WRITE: samo `.agents/` fajlovi.
- URADI (vlasnik izvršava, executor vodi korak po korak):
  1. Executor: `npm run build` exit 0; `ls dist/.htaccess dist/index.html dist/img/hero-figure.webp` postoje.
  2. Vlasnik: zip trenutnog web root-a (put iz O10) preuzet van repoa, naziv i veličina u handoff.
  3. Vlasnik: obriše stari `assets/` na serveru i upload-uje SADRŽAJ `dist/` u web root.
  4. Executor: `curl -sI https://andreamilenovic.com/` (200, `Cache-Control: no-cache...` za HTML), `curl -s https://andreamilenovic.com/ |
     Select-String "Fashion &amp; AI Designer"`, `curl -sI` za jedan `/assets/*.js` (200, `immutable`) i `/img/hero-figure.webp` (200).
  5. Vlasnik: telefon + desktop pregled; JEDNA stvarna poruka kroz formu i potvrda da je stigla na `contact@andreamilenovic.com`.
  6. Rollback proba po O10 (vrati zip, proveri stari sajt, ponovo postavi `dist/`), vremena u handoff.
- VERIFY / DONE: koraci 4-6 sa izlazima; vlasnik odgovara "Da li prihvataš R3.03 kao DONE?"; gate M3 ACCEPTED sa citatom.
- STOP: bilo koji `curl` ne vrati 200; forma ne stigne; vlasnik prijavi razliku.
