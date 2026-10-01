# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R2.04 DONE 2026-10-01 (Opus 5.5 na "nastavi ovde"). Sve sekcije su nove (Hero, About, Work, Why Me, Contact),
  Footer, Lightbox i Drawer; stari Portfolio/Contact/Footer/LegalModal obrisani. Nova šema NIJE deploy-ovana (R3.02).
- Aktivan task: nema.
- Sledeći kandidat: R3.01 (DEPENDS R2.04 DONE; REVIEW, gate M2).
- Poslednja isporuka: R2.04 (commit `R2.04 DONE: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | DONE | Opus 5.5 ("nastavi sad"). Schema validate 0/0, Node VERIFY 8/8 izlaza tačno, eslint 0, build 0. Ispravljeni brojevi redova JSON-a u planu (podaci 666, pravni 667). |
| R2.01 | Header, mobilni meni, Hero | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; 3 viewport-a = redizajn po getBoundingClientRect (indeks 25/13/6/6), solid header, meni/Escape/fokus, spy 5/5, konzola 0. Van WRITE: fontsReady.js (čeka Bodoni), dev port 5173 (Sanity CORS). |
| R2.02 | About i Why Me | DONE | Opus 5.5 ("nastavi"). eslint 0, build 0; About/Why = redizajn na 1440/1024/390 (47 elemenata, iste visine; 1440/1024 bez starih compact-height pravila), sticky "Why me?", drop cap, konzola 0. Van WRITE: Display `id` prop. |
| R2.03 | Work sekcija i Lightbox | DONE | Opus 5.5 ("nastavi"). eslint/lint/build 0; Work = redizajn na 1440 (sve pozicije), na 390 razlike samo od podataka; strelice/--p, drag, lightbox 01/25, zum, Escape+fokus, video, greška+retry, konzola 0. Van WRITE: workData natpisi. |
| R2.04 | Drawer, Contact, Footer | DONE | Opus 5.5 ("nastavi ovde"). eslint/lint/build 0; Contact i Footer = redizajn na 1440 i 390 (0 razlika); forma (web3forms presretnut): 4 greške, 500 -> alert, uspeh -> Thank you; drawer priča/pravni, Escape, fokus, View the designs; konzola 0. |
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
### Handoff R2.04 - 2026-10-01
- Status: DONE
- Repo: andrea-portfolio, commit "R2.04 DONE: Drawer, Contact, Footer" (hash: `git log -1`)
- Izmenjeni fajlovi: src/App.jsx (useDrawer; Work dobija `onOpenStory`, Footer `onOpenLegal`, Drawer posle Lightbox-a - redosled
  §2.7), src/components/overlays/Drawer.jsx, src/hooks/{useDrawer,useContactForm}.js, src/data/{contactData,legalData}.js
  (legalData generisan iz JSON-a u redu 667: Privacy 9 i Terms 11 odeljaka), src/components/sections/Contact.jsx (prepisan),
  src/components/contact/{ContactList,ContactForm,FormField,FormDone}.jsx, src/lib/validators/contactRules.js,
  src/lib/api/submitContact.js, src/components/layout/Footer.jsx (prepisan), src/components/sections/Work.jsx (samo `onOpenStory`
  do Chapter-a; Chapter/ChapterMeta već su ga primali iz R2.03 - bez izmena), tailwind.config.js (spacing `drawer` =
  clamp(20px,4vw,48px), px panela i tela); obrisani src/components/ui/LegalModal.jsx i src/hooks/useInView.js (grep 0); van WRITE: nema
- Provere: eslint WRITE -> exit 0; npm run lint -> exit 0; npm run build -> exit 0 (24 proverene klase, autoprefixer dodaje
  -webkit-mask); STOP provera `grep -c "^VITE_WEB3FORMS_KEY=" .env.local` -> 1. Playwright :5173 vs :5181 (compact-height pravila
  obrisana iz CSSOM-a, Reveal transform isključen): Contact (naslov, intro, 5 redova liste sa ikonama, kutija forme, 4 labele i
  polja sa placeholder/autocomplete, napomena, dugme) i Footer (mejl, 3 kolone sa stavkama, znak, traka sa godinom) = redizajn,
  0 razlika na 1440x900 i 390x844. Forma (`page.route` na web3forms, ništa nije poslato): prazan submit -> 4 greške, 4
  aria-invalid, fokus Name, 0 zahteva; input ponovo proverava polje u grešci, blur sa "abc" -> email crven; slanje -> "Sending..." +
  disabled; 500 -> alert "Your message could not be sent..." i vrednosti ostaju; `{"success":true}` -> forma skrivena, "Thank you,
  Jovan."; telo: POST JSON, ključevi tačno `access_key,name,email,phone,message`, ključ prisutan (vrednost nije štampana). Drawer:
  "Read the full story" samo u poglavljima 1 i 2; priča "Chapter 01" / "Design of clothes" / "25 designs" / 5 pasusa, fokus Close,
  body zaključan, traka .50 na pola skrola; Escape -> zatvoren, fokus na dugmetu; ponovno otvaranje -> vrh i traka 0; "View the
  designs" -> poglavlje na 128 px (isto u redizajnu: scroll-padding 64 + scroll-margin 64); Privacy 9 h3, klik na scrim zatvara i
  vraća fokus; Terms 11 h3; panel i prvi odeljci = redizajn (left 800, širina 640, naslov 139/59, datum 214, h3 268); 390 panel
  pune širine, bez horizontalnog skrola; konzola 0 grešaka (osim namerno izazvanog 500). Screenshot-ovi
  .playwright-mcp/r204-*.png (van repoa).
- Pregled: git diff --check exit 0; eslint exit 0
- Napomene: (1) Drawer ima `tabIndex={-1}` (kao Lightbox). (2) `aria-describedby` polja postoji samo dok je polje u grešci (u
  redizajnu uvek, pa čitač čita sakrivenu grešku). (3) Red 398 u redizajnu pogađa samo red sa copyright-om u pravnom tekstu (prvi
  element sadržaja je h3), pa su pravni pasusi 17px kao u redizajnu, a copyright 16px/1.75 sans - izmereno u oba. (4) Vrednosti forme
  se šalju sa `trim()`. (5) Posle neuspelog slanja fokus je na body (dugme je bilo disabled); alert se čita. (6) Godina je
  `new Date().getFullYear()` na nivou modula (react-hooks purity ne dozvoljava u render-u). (7) Arbitrary vrednosti koje se ponavljaju
  među sekcijama: `clamp(96px,12vw,180px)` (Why, Work, Contact) i `clamp(88px,10vw,150px)` (Contact, Footer) - kandidati za token u
  R3.01.
- Otvoreno (prelazno do R3.01): compact-height upiti u src/index.css (`#about`/`#work`/`#whyme`/`#contact`) i dalje menjaju padding
  na 1440x900 i 1024x768; stari CSS (swiper, portfolio) u index.css, paketi `swiper`, `animate.css`, `@portabletext/react` i
  `manualChunks` (`swiper`, `portable`) u vite.config.js.
- Tuđe necommitovane izmene: nema
- Sledeći task: R3.01 (REVIEW, gate M2)

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
