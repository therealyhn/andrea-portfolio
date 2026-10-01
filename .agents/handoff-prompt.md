# Handoff prompt - stanje 2026-10-01 (posle R2.02, pre R2.03)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R2.03 u plan.md +
njeni READ redovi + plan.md §2.3, §2.5, §2.6 i §2.9. Ništa drugo unapred.
Uloga: ti si executor (Sonnet 5). Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md, IN_REVIEW nije DONE, "nastavi" nije prihvatanje
REVIEW taska; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu;
(5) srpski ekavica u porukama i planu, obična crtica "-", bez emodžija; tekst sajta ostaje engleski iz redizajna; (6) kratki
odgovori: šta je urađeno, brojevi, jedan sledeći korak; (7) bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: M1 Osnova PASSED. R1.01, R1.02, R2.01 i R2.02 DONE. App.jsx: IconSprite, skip link, Header, MobileMenu,
`<main id="main">` sa novim Hero, About, starim Portfolio, novim WhyMe (`whyFigure`) i starim Contact, pa stari Footer; useSiteMedia
se zove jednom u App-u. Gotovi hookovi: useHeaderSolid, useScrollSpy, useScrollLock (klasa `overflow-hidden` na body),
useFocusTrap, useFigureSource (samo hero), useReveal. UI: Icon, IconSprite, ButtonLink, Eyebrow, Display (ima `id` prop za
`aria-labelledby`), Wrap, Reveal, RichText (segmenti `{ text, em }`). Reveal se kombinuje sa Eyebrow/Display kao omotač
(`<Reveal delay=".08s"><Display ...>`), jer oni nemaju ref. Pravilo "roditelj .btn" = `[&>a]:` varijanta na roditelju.
Važno za proveru: dev server MORA na port 5173 (`npm run dev -- --port 5173 --strictPort`) - Sanity CORS odbija 5180 (403).
Prelazno do R3.01: stari compact-height media upiti u src/index.css (`max-height:900px|820px`, `#work`/`#contact`/`#about`/
`#whyme` sa `!important` padding-om) menjaju padding sekcija na 1440x900 i 1024x768; za poređenje sa redizajnom obriši ta pravila
iz CSSOM-a u Playwright-u (CSSMediaRule sa `max-height`, `deleteRule` za selektore sa id-em sekcije) - postupak je u handoff-u
R2.02. Prelazno do R2.03/R2.04: stari PortfolioModal/LegalModal postavljaju inline `body.style.overflow = "auto"` ->
horizontalni scrollbar od starog Swiper-a i meni ne zaključava skrol; R2.03 briše Portfolio i portfolio/ folder.
U Sanity-ju `figure` još ne postoji -> heroFigure/whyFigure su null (lokalne figure).
Sledeći task: R2.03 (Work sekcija i Lightbox; DEPENDS R2.02 DONE - zadovoljeno; PREGLED=NORMAL).
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R2.02 DONE: ..."; necommitovano: ništa očekivano.
Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda.
Okruženje i komande: Node v22.20.0, npm 11.9.0; osnovne linije u verification.md (lint exit 1 zbog starog
portfolio/Lightbox.jsx, build exit 0, Sanity schema validate 0/0); vizuelno: dev `:5173`, redizajn `python -m http.server 5181
--directory redesign`, Playwright MCP (ili chrome-devtools MCP); scratchpad za skripte, logove i screenshot-ove.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
