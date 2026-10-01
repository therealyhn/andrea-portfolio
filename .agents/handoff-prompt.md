# Handoff prompt - stanje 2026-10-01 (posle R1.01, pre R1.02)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R1.02 u plan.md +
njeni READ redovi + plan.md §2.1-§2.6. Ništa drugo unapred.
Uloga: ti si executor (Sonnet 5). Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md, IN_REVIEW nije DONE, "nastavi" nije prihvatanje
REVIEW taska; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu;
(5) srpski ekavica u porukama i planu, obična crtica "-", bez emodžija; tekst sajta ostaje engleski iz redizajna; (6) kratki
odgovori: šta je urađeno, brojevi, jedan sledeći korak; (7) bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: R1.01 DONE (asseti u public/img, Tailwind tokeni + plugin, index.css base sloj, head u index.html,
markFontsReady, format.js sa pad2/formatDuration, ui Icon/IconSprite/ButtonLink/Eyebrow/Display/Wrap/Reveal, useReveal).
Komponente sa `as` prop-om koriste `const Tag = as` (eslint pravilo projekta). Stari sajt i dalje radi sa starim komponentama.
Sledeći task: R1.02 (Sanity šema i sloj podataka; DEPENDS R1.01 DONE, O03 i O04 RESOLVED - zadovoljeno; PREGLED=NORMAL).
`src/lib/utils/format.js` već postoji (R1.01) - R1.02 ga samo koristi.
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R1.01 DONE: ..."; necommitovano: ništa očekivano.
Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda. Otvoreno iz R1.01: async font CSS može da pusti hero animaciju pre fonta -
proverava se u R2.01.
Okruženje i komande: Node v22.20.0, npm 11.9.0; osnovne linije u verification.md (lint exit 1 zbog starog
portfolio/Lightbox.jsx, build exit 0, Sanity schema validate 0/0); vizuelno: dev `:5180`, redizajn `python -m http.server 5181
--directory redesign`, Playwright MCP (ili chrome-devtools MCP); scratchpad za skripte, logove i screenshot-ove.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
