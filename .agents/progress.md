# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R2.02 DONE 2026-10-01 (Opus 5.5 na "nastavi" posle /compact). Novi header, meni, hero, About i Why Me su u App.jsx;
  između njih i dalje stari Portfolio, ispod stari Contact/Footer. Nova šema NIJE deploy-ovana (R3.02).
- Aktivan task: nema.
- Sledeći kandidat: R2.03 (DEPENDS R2.02 DONE).
- Poslednja isporuka: R2.02 (commit `R2.02 DONE: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | DONE | Opus 5.5 ("nastavi sad"). Schema validate 0/0, Node VERIFY 8/8 izlaza tačno, eslint 0, build 0. Ispravljeni brojevi redova JSON-a u planu (podaci 666, pravni 667). |
| R2.01 | Header, mobilni meni, Hero | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; 3 viewport-a = redizajn po getBoundingClientRect (indeks 25/13/6/6), solid header, meni/Escape/fokus, spy 5/5, konzola 0. Van WRITE: fontsReady.js (čeka Bodoni), dev port 5173 (Sanity CORS). |
| R2.02 | About i Why Me | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; About/Why = redizajn na 1440/1024/390 (47 elemenata, iste visine; 1440/1024 bez starih compact-height pravila), sticky "Why me?", drop cap, konzola 0. Van WRITE: Display `id` prop. |
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
### Handoff R2.02 - 2026-10-01
- Status: DONE
- Repo: andrea-portfolio, commit "R2.02 DONE: About i Why Me" (hash: `git log -1`)
- Izmenjeni fajlovi: src/App.jsx (WhyMeSec -> WhyMe sa `whyFigure`), src/components/sections/{About,WhyMe}.jsx,
  src/components/about/{AboutArt,AboutCopy,CvBlock}.jsx, src/components/why/{WhyFigure,SkillsList,WhyClose}.jsx,
  src/components/ui/RichText.jsx, src/data/{aboutData,whyData}.js; obrisani src/components/sections/WhyMeSec.jsx,
  src/components/whyme/ (ceo), src/components/ui/Button.jsx (grep `ui/Button"` = 0); tailwind.config.js bez izmena (svi tokeni
  postoje); van WRITE: src/components/ui/Display.jsx - dodat `id` prop (cilj `aria-labelledby` sekcije; treba i R2.03/R2.04)
- Provere: eslint WRITE fajlova + Display.jsx -> exit 0; npm run build -> exit 0 (sve nove klase u CSS-u); Playwright :5173 vs :5181,
  pozicije 26 About + 21 Why elemenata relativno na sekciju (Reveal transform isključen): 1440x900 i 1024x768 identične posle
  uklanjanja starih compact-height pravila iz CSSOM-a, 390x844 identične i bez toga; visine About/Why 1309/1575, 1434/1408,
  1983/2298 = redizajn; razlika samo tekst brojeva veština (`<span>` umesto `::before`). Drop cap rgb(184,23,47), Bodoni 69.7px,
  opsz 40; umetnuta slika preklapa glavnu 100 px i 48 px ispod; veštine 2 kolone 01-10; sticky: skrol +200 i +450 -> naslov na
  y=158 (screenshot-ovi .playwright-mcp/r202-why-1440-a/b.png, van repoa); Sanity whyFigure (page.route mock): src CDN w=780,
  srcset 390-1560, sizes "(max-width: 959px) 88vw, 600px", width/height iz ref-a; konzola 0 grešaka/upozorenja.
- Pregled: git diff --check exit 0; eslint exit 0
- Napomene: (1) Reveal + Eyebrow/Display = Reveal omotač oko komponente (Eyebrow/Display nemaju ref). (2) About inset `src` =
  ai-visual-640.webp (lokalno nema 480; srcset 320/640 isti kao redizajn). (3) Broj veštine je `<span aria-hidden="true">`.
- Otvoreno (prelazno): stari compact-height media upiti u src/index.css (`@media (min-width:1024px) and (max-height:900px|820px)`,
  `#about`/`#whyme`/`#work`/`#contact` sa `!important` padding-om) i dalje važe do R3.01: na 1440x900 About ima padding 56px
  umesto 173px, Why dobija 56px gore/dole. Za vizuelnu proveru R2.03/R2.04 na 1440x900 i 1024x768 obriši ta pravila iz CSSOM-a
  u Playwright-u (CSSMediaRule sa `max-height`, selektor sa id-em sekcije) ili ih planer premesti u raniji task.
  Stari PortfolioModal/LegalModal `body.style.overflow = "auto"` i dalje (vidi R2.01) -> nestaje u R2.03/R2.04.
- Tuđe necommitovane izmene: nema
- Sledeći task: R2.03

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
