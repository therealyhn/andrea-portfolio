# Handoff prompt - stanje 2026-10-01 (posle R1.02, pre R2.01)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R2.01 u plan.md +
njeni READ redovi + plan.md §2.3-§2.10. Ništa drugo unapred.
Uloga: ti si executor (Sonnet 5). Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md, IN_REVIEW nije DONE, "nastavi" nije prihvatanje
REVIEW taska; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu;
(5) srpski ekavica u porukama i planu, obična crtica "-", bez emodžija; tekst sajta ostaje engleski iz redizajna; (6) kratki
odgovori: šta je urađeno, brojevi, jedan sledeći korak; (7) bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: M1 Osnova PASSED. R1.01 DONE (asseti u public/img, Tailwind tokeni + plugin, index.css base sloj, head,
markFontsReady, format.js, ui Icon/IconSprite/ButtonLink/Eyebrow/Display/Wrap/Reveal, useReveal). R1.02 DONE (Sanity šema sa
`figure` poljima i sakrivenim starim poljima - NIJE deploy-ovana, to je R3.02; SITE_MEDIA_QUERY, normalizeSiteMedia, imageUrl/
imageSrcSet, sanityRef, workSummary, data/workData.js, useSiteMedia). Komponente sa `as` prop-om koriste `const Tag = as`
(eslint pravilo projekta). Stari sajt i dalje radi sa starim komponentama; novi delovi još nisu uključeni u App.jsx.
U Sanity-ju `figure` još ne postoji -> heroFigure/whyFigure su null, hero koristi lokalnu /img/hero-figure.webp (O06).
Sledeći task: R2.01 (Header, mobilni meni, Hero; DEPENDS R1.02 DONE - zadovoljeno; PREGLED=NORMAL).
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R1.02 DONE: ..."; necommitovano: ništa očekivano.
Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda. Otvoreno iz R1.01 (za R2.01): font CSS je async (preload+onload), pa
`document.fonts.load` može da se razreši pre `@font-face` i hero animacija krene sa rezervnim fontom - proveri vizuelno.
Okruženje i komande: Node v22.20.0, npm 11.9.0; osnovne linije u verification.md (lint exit 1 zbog starog
portfolio/Lightbox.jsx, build exit 0, Sanity schema validate 0/0); vizuelno: dev `:5180`, redizajn `python -m http.server 5181
--directory redesign`, Playwright MCP (ili chrome-devtools MCP); scratchpad za skripte, logove i screenshot-ove.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
