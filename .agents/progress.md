# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R2.01 DONE 2026-10-01 (Opus 5.5 na "nastavi" posle /compact). Novi header, mobilni meni i hero su u App.jsx; ispod
  njih i dalje stare sekcije About/Portfolio/WhyMeSec/Contact/Footer. Nova šema NIJE deploy-ovana (R3.02).
- Aktivan task: nema.
- Sledeći kandidat: R2.02 (DEPENDS R2.01 DONE).
- Poslednja isporuka: R2.01 (commit `R2.01 DONE: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | DONE | Opus 5.5 ("nastavi sad"). Schema validate 0/0, Node VERIFY 8/8 izlaza tačno, eslint 0, build 0. Ispravljeni brojevi redova JSON-a u planu (podaci 666, pravni 667). |
| R2.01 | Header, mobilni meni, Hero | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; 3 viewport-a = redizajn po getBoundingClientRect (indeks 25/13/6/6), solid header, meni/Escape/fokus, spy 5/5, konzola 0. Van WRITE: fontsReady.js (čeka Bodoni), dev port 5173 (Sanity CORS). |
| R2.02 | About i Why Me | TODO | |
| R2.03 | Work sekcija i Lightbox | TODO | |
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
### Handoff R2.01 - 2026-10-01
- Status: DONE
- Repo: andrea-portfolio, commit "R2.01 DONE: header, mobilni meni i hero" (hash: `git log -1`)
- Izmenjeni fajlovi: src/App.jsx, src/components/layout/{Header,MobileMenu}.jsx, src/components/sections/Hero.jsx,
  src/components/hero/{HeroMasthead,HeroFigure,HeroIntro,HeroIndex}.jsx, src/data/{siteData,heroData}.js,
  src/hooks/{useHeaderSolid,useScrollSpy,useScrollLock,useFocusTrap,useFigureSource}.js, tailwind.config.js (spacing `tap` 44px,
  `logo` 26px, `hero-edge` clamp(32px,7cqh,72px)), obrisani src/components/ui/{BurgerMenu,CurvedText}.jsx; van WRITE:
  src/lib/utils/fontsReady.js (otvorena stavka iz R1.01, vidi Napomene), .agents/verification.md + plan.md R2.01 (port 5180 -> 5173)
- Provere: eslint WRITE fajlova + fontsReady.js -> exit 0; npm run build -> exit 0; Playwright na :5173 i :5181:
  1440x900/1024x768/390x844 - masthead, prezime, figura, intro, dugmad i indeks na istim koordinatama kao redizajn (getBoundingClientRect),
  indeks 25/13/6/6 sa `#ch-<key>`; skrol 700 -> header `data-solid="true"`, 64px, rgba(34,4,10,.95), nazad na vrhu "false"; spy
  about/work/whyme/contact/home tačno; 390x844: Menu -> fokus na Close, Tab petlja kroz 8 elemenata, Escape zatvara i activeElement
  = Menu; klik na link zatvara meni (fokus na BODY, isto kao redizajn); konzola 0 grešaka; slovo "A" `animation-name: rise` (paused
  bez `.fonts`, running sa njom); Sanity figura (page.route mock): jedan `<img>`, src lokalni -> CDN, srcset 480-1360, sizes
  `min(57.98vh, 877px)`, slika preuzeta jednom (680w).
- Pregled: git diff --check exit 0; eslint exit 0
- Napomene: (1) Sanity CORS odbija `localhost:5180` (403 na sve upite), `localhost:5173` prolazi -> verification.md ispravljen.
  (2) fontsReady: `.fonts` je dodavan posle ~120 ms bez ijednog Bodoni @font-face (async font CSS), pa je hero animacija uvek
  kretala sa rezervnim fontom; sada se proba ponavlja na `loadingdone` -> `.fonts` posle 534 ms (sa Bodoni), sa CSS kašnjenjem
  800 ms posle 1393 ms, bez fonta timeout 2,5 s. (3) `NAV_COPY` (labele skip/header/meni) je dodatni export u siteData.js.
  (4) useFigureSource preload koristi isti srcset/sizes kao `<img>` (bez duplog preuzimanja). (5) useScrollSpy traži sekcije pri
  svakom prolazu (stari WhyMeSec vraća null dok ne stignu podaci).
- Otvoreno (prelazno): stari PortfolioModal i LegalModal na mount-u postavljaju inline `body.style.overflow = "auto"` -> poništava
  `overflow-x: clip` (horizontalni scrollbar od starog Swiper-a) i `overflow-hidden` iz useScrollLock (otvoren meni ne zaključava
  skrol). Nestaje kad R2.03 (Portfolio) i R2.04 (LegalModal) uklone stare komponente.
- Tuđe necommitovane izmene: nema
- Sledeći task: R2.02

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
