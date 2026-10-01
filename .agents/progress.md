# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R1.01 DONE 2026-10-01 (Opus 5.5 na "radi ti"). Novi UI delovi postoje, stari sajt i dalje radi.
- Aktivan task: nema.
- Sledeći kandidat: R1.02 (DEPENDS R1.01 DONE).
- Poslednja isporuka: R1.01 (commit `R1.01 DONE: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | TODO | |
| R2.01 | Header, mobilni meni, Hero | TODO | |
| R2.02 | About i Why Me | TODO | |
| R2.03 | Work sekcija i Lightbox | TODO | |
| R2.04 | Drawer, Contact, Footer | TODO | |
| R3.01 | Čišćenje i QA gate | TODO | REVIEW, gate M2 |
| R3.02 | Sanity backup, Studio deploy, sadržaj | TODO | REVIEW, vlasnik, čeka O08, O10 |
| R3.03 | Deploy i rollback proba | TODO | REVIEW, vlasnik, čeka O10 |

## Milestone gate registar
| Milestone | Status | Datum i citat |
|---|---|---|
| M1 Osnova | PENDING | |
| M2 Sekcije | PENDING | |
| M3 Produkcija | PENDING | |

## Otvorene stavke van koda
- O07, O08 PROPOSED; O10, O11 OPEN (vidi `decisions.md`). O10 (hosting, web root, Studio host) treba pre R3.02/R3.03.
- Vlasnik/klijent u Studiju (R3.02): upload izrezanih figura, preimenovanje kategorija 2-4, brisanje duplikata (pozicija 25).

## POSLEDNJI handoff
### Handoff R1.01 - 2026-10-01
- Status: DONE
- Repo: andrea-portfolio, commit "R1.01 DONE: asseti, Tailwind tokeni i plugin, head, UI" (hash: `git log -1`)
- Izmenjeni fajlovi: public/img/{logo/am-mark.png,hero-figure.webp,whyme-figure.webp,favicon-am.png,posters/*.webp (6),about/*.webp (5)},
  tailwind.config.js, src/index.css, index.html, src/main.jsx, src/lib/utils/{fontsReady,format}.js,
  src/components/ui/{Icon,IconSprite,ButtonLink,Eyebrow,Display,Wrap,Reveal}.jsx, src/hooks/useReveal.js; van WRITE: nema
- Provere: extract -> `matches 10`, 6 postera; am-mark/hero/whyme = 22803/90930/47382 B; about -> 5 WEBP 9986-69506 B
  (+ stari praćeni `about/1.jpg` 4527 B, nije diran); resolveConfig -> `2,3,DEFAULT,glow,tile,media,deep {"raw":"(max-width: 959px)"}
  "Bodoni Moda" clamp(16px,4vw,64px)` (JS stavlja numeričke ključeve prve, isti skup kao u planu); vite build -> exit 0,
  `@keyframes figIn` 1; Tailwind CLI proba 23 klase (cq-*, fonts-pending, motion-*, timeline-hero, opsz-*, upto*, tokeni) -> sve
  generisane, media redosled 1100 > 959 > 700 > 600 > 560 tačan; favicon PNG 64x64; BOM u index.html ostao (ef bb bf).
- Dodati ključevi: fontSize 11,12,13,14,15,16,17,22; letterSpacing 12,14,18,20,neg1,neg2; lineHeight 86,100,102,110,120,125,140,
  160,165,170,175; transitionDuration 350,400,450,600 (.35s/.4s/.45s/.6s se javljaju 2+ puta). Ponovljene rgba = `/<broj>` modifikator.
- Odstupanja: viewport `viewport-fit=cover` iz reda 5 (redizajn koristi env(safe-area-inset-bottom)); ButtonLink
  `disabled:opacity-60 disabled:cursor-default` (redizajn nema disabled stil, forma isključuje dugme); `as` prop -> `const Tag = as`
  (eslint ne broji JSX kao upotrebu parametra).
- Pregled: git diff --check exit 0; eslint (main.jsx, lib/utils, components/ui, useReveal, tailwind.config.js) exit 0
- Otvoreno: font CSS je async (preload+onload) - ako `document.fonts.load` stigne pre `@font-face`, klasa `fonts` ide odmah i hero
  animacija krene sa rezervnim fontom; proveriti vizuelno u R2.01.
- Tuđe necommitovane izmene: nema
- Sledeći task: R1.02

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
