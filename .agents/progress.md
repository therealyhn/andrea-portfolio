# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R2.03 DONE 2026-10-01 (Opus 5.5 na "nastavi" posle /compact). Novi header, meni, hero, About, Work (+ Lightbox) i
  Why Me su u App.jsx; ispod i dalje stari Contact/Footer. Nova šema NIJE deploy-ovana (R3.02).
- Aktivan task: nema.
- Sledeći kandidat: R2.04 (DEPENDS R2.03 DONE, O05 RESOLVED).
- Poslednja isporuka: R2.03 (commit `R2.03 DONE: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | DONE | Opus 5.5 ("nastavi sad"). Schema validate 0/0, Node VERIFY 8/8 izlaza tačno, eslint 0, build 0. Ispravljeni brojevi redova JSON-a u planu (podaci 666, pravni 667). |
| R2.01 | Header, mobilni meni, Hero | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; 3 viewport-a = redizajn po getBoundingClientRect (indeks 25/13/6/6), solid header, meni/Escape/fokus, spy 5/5, konzola 0. Van WRITE: fontsReady.js (čeka Bodoni), dev port 5173 (Sanity CORS). |
| R2.02 | About i Why Me | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; About/Why = redizajn na 1440/1024/390 (47 elemenata, iste visine; 1440/1024 bez starih compact-height pravila), sticky "Why me?", drop cap, konzola 0. Van WRITE: Display `id` prop. |
| R2.03 | Work sekcija i Lightbox | DONE | Opus 5.5 ("nastavi"). eslint/lint/build 0; Work = redizajn na 1440 (sve pozicije), na 390 razlike samo od podataka; strelice/--p, drag, lightbox 01/25, zum, Escape+fokus, video, greška+retry, konzola 0. Van WRITE: workData natpisi. |
| R2.04 | Drawer, Contact, Footer | TODO | |
| R3.01 | Čišćenje i QA gate | TODO | REVIEW, gate M2 |
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
### Handoff R2.03 - 2026-10-01
- Status: DONE
- Repo: andrea-portfolio, commit "R2.03 DONE: Work sekcija i Lightbox" (hash: `git log -1`)
- Izmenjeni fajlovi: src/App.jsx (Portfolio -> Work sa `media/status/retry/onOpenItem`, Lightbox posle Footer-a, `chapters` =
  `data?.chapters ?? NO_CHAPTERS` i za Hero), src/components/sections/Work.jsx, src/components/work/{WorkHead,WorkStatus,Chapter,
  ChapterMeta,Strip,ImageTile,VideoTile}.jsx, src/components/overlays/{Lightbox,LightboxMedia}.jsx, src/hooks/{useStripScroll,
  useDragScroll,useVideoMeta,useLightbox}.js, tailwind.config.js (spacing `lb-nav` = clamp(12px,2vw,40px), strelice lightbox-a);
  obrisani src/components/sections/Portfolio.jsx i src/components/portfolio/ (ceo); van WRITE: src/data/workData.js - WORK_COPY
  dopunjen (title, loading, error, retry, chapter, readStory, stepSuffix, stripHint, playFilm) + nova MEDIA_STEPS i LIGHTBOX_COPY
  (natpisi u data fajlu po agent-base pravilu; R1.02 Node provera nije pogođena)
- Provere: eslint WRITE + workData -> exit 0; npm run lint -> exit 0 (greška starog portfolio/Lightbox.jsx nestala); npm run build ->
  exit 0 (23 proverene klase u CSS-u; `upto700:data-[zoom=true]` posle `upto700:` u CSS-u). Playwright :5173 vs :5181 (compact-height
  pravila obrisana iz CSSOM-a, Reveal transform isključen): 1440x900 - zaglavlje i 4 poglavlja (meta, naslov, lead, brojač,
  strelice, scroller, prve 3 pločice, traka, natpis i play videa) = redizajn piksel za piksel, ista visina sekcije; 390x844 - iste
  pozicije osim pomaka od podataka (dugme "Read the full story" +52 px dolazi u R2.04; Sanity naslov "AI DESIGN AND IMAGES
  GENERATION" lomi se u 3 reda). Interakcije: Next -> 01->03, --p .0949->.1708; Prev disabled na početku; drag mišem 300 px ->
  scrollLeft 396 (snap), tokom drag-a data-drag/grabbing/snap none/pointer-events none, lightbox se ne otvara; klik na pločicu ->
  "Design of clothes" "01 / 25", fokus Close, body zaključan; ArrowRight -> 02 / 25; ArrowLeft x2 -> 25 / 25 (krug); klik na
  sliku -> data-zoom true, width 1425px; Escape -> zatvoren, fokus na pločici, medij uklonjen posle 420 ms; klik pored slike
  zatvara; video pločica -> `<video controls autoplay playsinline preload=auto>`, pauziran pri zatvaranju (mp4 presretnut); 390:
  strelice skrivene, swipe +-120 px menja stavku, 30 px ne, zum padding 0 i max-height none; apicdn abort -> "The portfolio could
  not be loaded." + "Try again" -> 4 poglavlja; odložen upit -> "Loading portfolio..." i prazna rečenica; čist prolaz: konzola 0
  grešaka/upozorenja, 390 bez horizontalnog skrola (scrollWidth 375). Screenshot-ovi .playwright-mcp/r203-*.png (van repoa).
- Pregled: git diff --check exit 0; eslint exit 0
- Napomene: (1) Lightbox dijalog ima `tabIndex={-1}`: u redizajnu klik na sliku (zum) prebacuje fokus na body pa Escape i strelice
  ne rade; VERIFY redosled (zum pa Escape) to traži. (2) `key` medija u lightbox-u = sesija otvaranja + pozicija (ponovno
  otvaranje uvek montira nov medij). (3) Pločice su `memo` (traka se renderuje po frejmu skrola); klase pločice (li, dugme, slika)
  izvozi ImageTile.jsx, koristi ih VideoTile. (4) Poster videa ima `loading="lazy"` (u redizajnu su bili data URI). (5) `onError`
  slike = učitana (vidi se alt umesto nevidljive slike). (6) `clamp(96px,12vw,180px)` je arbitrary u Why i Work (2x) - kandidat
  za token u R3.01. (7) STOP uslovi nisu nastupili.
- Otvoreno (prelazno): compact-height upiti u src/index.css i dalje menjaju padding #work na 1440x900 i 1024x768 (R3.01); stari
  `.portfolio-swiper` CSS u index.css, paket `swiper` i `manualChunks.swiper` u vite.config.js (prazan chunk u build-u) - R3.01;
  LegalModal u starom Footer-u i dalje postavlja inline body overflow - R2.04.
- Tuđe necommitovane izmene: nema
- Sledeći task: R2.04

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
