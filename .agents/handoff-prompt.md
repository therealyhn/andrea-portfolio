# Handoff prompt - stanje 2026-10-01 (posle R2.01, pre R2.02)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R2.02 u plan.md +
njeni READ redovi + plan.md §2.4 i §2.9. Ništa drugo unapred.
Uloga: ti si executor (Sonnet 5). Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md, IN_REVIEW nije DONE, "nastavi" nije prihvatanje
REVIEW taska; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu;
(5) srpski ekavica u porukama i planu, obična crtica "-", bez emodžija; tekst sajta ostaje engleski iz redizajna; (6) kratki
odgovori: šta je urađeno, brojevi, jedan sledeći korak; (7) bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: M1 Osnova PASSED. R1.01 i R1.02 DONE (tokeni + plugin, UI osnova, Sanity šema i sloj podataka). R2.01 DONE:
App.jsx ima IconSprite, skip link, Header, MobileMenu, `<main id="main">` sa novim Hero + starim About/Portfolio/WhyMeSec/Contact,
pa stari Footer; useSiteMedia se zove jednom u App-u. Gotovi hookovi: useHeaderSolid, useScrollSpy, useScrollLock (klasa
`overflow-hidden` na body), useFocusTrap, useFigureSource (hero; sizes je vezan za hero visinu). siteData.js ima BRAND, LOGO_SRC,
NAV_LINKS, SECTION_IDS, CONTACT i NAV_COPY. Spacing tokeni dodati u R2.01: `tap` 44px, `logo` 26px, `hero-edge`. Komponente sa
`as` prop-om koriste `const Tag = as` (eslint pravilo projekta). Pravilo `.hero__ctas .btn` je prevedeno kao `[&>a]:` varijanta
na roditelju (ButtonLink nema className prop) - isti obrazac važi za druge "roditelj .btn" selektore.
Važno za proveru: dev server MORA na port 5173 (`npm run dev -- --port 5173 --strictPort`) - Sanity CORS odbija 5180 (403).
Prelazno do R2.03/R2.04: stari PortfolioModal/LegalModal postavljaju inline `body.style.overflow = "auto"` -> horizontalni
scrollbar od starog Swiper-a i meni ne zaključava skrol; to nije greška R2.02.
U Sanity-ju `figure` još ne postoji -> heroFigure/whyFigure su null, Why Me koristi lokalnu /img/whyme-figure.webp.
Sledeći task: R2.02 (About i Why Me; DEPENDS R2.01 DONE - zadovoljeno; PREGLED=NORMAL).
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R2.01 DONE: ..."; necommitovano: ništa očekivano.
Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda.
Okruženje i komande: Node v22.20.0, npm 11.9.0; osnovne linije u verification.md (lint exit 1 zbog starog
portfolio/Lightbox.jsx, build exit 0, Sanity schema validate 0/0); vizuelno: dev `:5173`, redizajn `python -m http.server 5181
--directory redesign`, Playwright MCP (ili chrome-devtools MCP); scratchpad za skripte, logove i screenshot-ove.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
