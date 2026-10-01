# Handoff prompt - stanje 2026-10-01 (posle plan paketa, pre R1.01)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R1.01 u plan.md +
njeni READ redovi + plan.md §2.7-§2.10. Ništa drugo unapred.
Uloga: ti si executor (Sonnet 5). Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md, IN_REVIEW nije DONE, "nastavi" nije prihvatanje
REVIEW taska; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity, ne šalji stvarnu poruku kroz formu; (5) srpski ekavica u porukama i
planu, obična crtica "-", bez emodžija; tekst sajta ostaje engleski iz redizajna; (6) kratki odgovori: šta je urađeno, brojevi,
jedan sledeći korak; (7) bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: plan paket napisan i commit-ovan. Odluke: O01 RESOLVED = svi stilovi kao Tailwind v3 klase (tokeni + inline
plugin u tailwind.config.js, bez novih biblioteka, bez CSS fajlova po sekcijama); O02 = u Sanity samo hero slika, kategorije sa
medijima i Why Me slika, ostalo statično; O03-O06 i O09 (bez Sentry-ja) RESOLVED. Nijedan executor task još nije rađen.
Sledeći task: R1.01 (Asseti, Tailwind tokeni i plugin, head, osnovni UI; DEPENDS O01 RESOLVED - zadovoljen; PREGLED=NORMAL).
Git: andrea-portfolio (sopstveni repo), grana kao u `git status`, poslednji commit "plan: redizajn plan paket (.agents)";
necommitovano: ništa očekivano. Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda.
Okruženje i komande: Node v22.20.0, npm 11.9.0; osnovne linije u verification.md (lint exit 1 zbog starog
portfolio/Lightbox.jsx, build exit 0, Sanity schema validate 0/0); vizuelno: dev `:5180`, redizajn `python -m http.server 5181
--directory redesign`, Playwright MCP (ili chrome-devtools MCP); scratchpad za skripte, logove i screenshot-ove.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
