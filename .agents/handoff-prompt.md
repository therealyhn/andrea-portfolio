# Handoff prompt - stanje 2026-10-01 (posle R2.03, pre R2.04)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R2.04 u plan.md +
njeni READ redovi + plan.md §2.4, §2.7 i §2.9. Ništa drugo unapred.
Uloga: ti si executor (Sonnet 5). Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md, IN_REVIEW nije DONE, "nastavi" nije prihvatanje
REVIEW taska; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu
(web3forms poziv u proveri uvek presretni sa `page.route`); (5) srpski ekavica u porukama i planu, obična crtica "-", bez emodžija;
tekst sajta ostaje engleski iz redizajna; (6) kratki odgovori: šta je urađeno, brojevi, jedan sledeći korak; (7) bez subagenata
i dodatnih dokumenata.
Stanje 2026-10-01: M1 Osnova PASSED. R1.01-R2.03 DONE. App.jsx: IconSprite, skip link, Header, MobileMenu, `<main id="main">` sa
novim Hero, About, Work (`media`, `status`, `retry`, `onOpenItem`), WhyMe i starim Contact, pa stari Footer i novi Lightbox;
useSiteMedia se zove jednom u App-u, `chapters = data?.chapters ?? NO_CHAPTERS`, `useLightbox(chapters)`. Gotovi hookovi:
useHeaderSolid, useScrollSpy, useScrollLock (klasa `overflow-hidden` na body), useFocusTrap, useFigureSource, useReveal,
useStripScroll, useDragScroll, useVideoMeta, useLightbox. UI: Icon, IconSprite, ButtonLink, Eyebrow, Display (`id` prop), Wrap,
Reveal, RichText. Reveal se kombinuje sa Eyebrow/Display kao omotač (`<Reveal delay=".08s"><Display ...>`).
Za R2.04: ChapterMeta već crta dugme "Read the full story" (klase `.ulink.chap__more`) kad je `story.length > 1` I postoji prop
`onOpenStory`, poziv je `onOpenStory(chapterIndex, event.currentTarget)` - treba samo provući prop App -> Work -> Chapter ->
ChapterMeta. Obrazac overlay-a je u `src/components/overlays/Lightbox.jsx` (uvek montiran, `data-open`, `tabIndex={-1}` da klik
unutar dijaloga zadrži fokus i Escape radi, fokus na Close posle tajmera, povratak fokusa u hook-u). Natpisi Work-a su u
`src/data/workData.js` (WORK_COPY, MEDIA_STEPS, LIGHTBOX_COPY).
Važno za proveru: dev server MORA na port 5173 (`npm run dev -- --port 5173 --strictPort`) - Sanity CORS odbija 5180 (403).
Prelazno do R3.01: stari compact-height media upiti u src/index.css (`max-height:900px|820px`, `#work`/`#contact`/`#about`/
`#whyme` sa `!important` padding-om) menjaju padding sekcija na 1440x900 i 1024x768; za poređenje sa redizajnom obriši iz CSSOM-a
u Playwright-u svaki CSSMediaRule čiji `conditionText` sadrži `max-height` (postupak u handoff-u R2.03). Stari LegalModal u
Footer-u postavlja inline `body.style.overflow` - R2.04 ga briše.
U Sanity-ju `figure` još ne postoji -> heroFigure/whyFigure su null (lokalne figure); nazivi kategorija 2-4 su velikim slovima
(preimenovanje u R3.02), "Design of clothes" ima 25 medija (duplikat).
Sledeći task: R2.04 (Drawer, Contact, Footer; DEPENDS R2.03 DONE - zadovoljeno, O05 RESOLVED; PREGLED=NORMAL).
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R2.03 DONE: ..."; necommitovano: ništa očekivano.
Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda.
Okruženje i komande: Node v22.20.0, npm 11.9.0; `npm run lint` exit 0 posle R2.03, build exit 0, Sanity schema validate 0/0;
vizuelno: dev `:5173`, redizajn `python -m http.server 5181 --directory redesign`, Playwright MCP (ili chrome-devtools MCP);
scratchpad za skripte i logove; Playwright sme da piše samo u `c:\xampp\htdocs\Projects\.playwright-mcp`.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
