# Handoff prompt - stanje 2026-10-01 (posle R2.04, pre R3.01)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md;
reference/redesign-stripped.html = redizajn bez base64). Redosled čitanja: progress.md -> README -> kartica R3.01 u plan.md +
njeni READ fajlovi + plan.md §2.7, §2.9 i §2.10. Ništa drugo unapred.
Uloga: ti si executor. Izvršavaš TAČNO jedan task. Ne menjaš plan, ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md; R3.01 je PREGLED=REVIEW -> završava se kao IN_REVIEW
i pitanjem kroz AskUserQuestion "Da li prihvataš R3.01 kao DONE?" (URL `http://localhost:5182` + lista razlika); "nastavi" NIJE
prihvatanje; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti posle handoff-a, push nikad, nikad add -A;
(4) ne štampaj .env.local vrednosti, ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu;
(5) srpski ekavica u porukama i planu, obična crtica "-", bez emodžija; tekst sajta ostaje engleski iz redizajna; (6) kratki
odgovori: šta je urađeno, brojevi, jedan sledeći korak; (7) bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: M1 Osnova PASSED. R1.01-R2.04 DONE - sve sekcije su nove. App.jsx po §2.7: IconSprite, skip link, Header,
MobileMenu, `<main id="main">` {Hero, About, Work, WhyMe, Contact}, Footer, Lightbox, Drawer. Stari Portfolio, Contact, Footer,
LegalModal, useInView i portfolio/ su obrisani. `npm run lint` exit 0, build exit 0.
Za R3.01 (iz handoff-a R2.03/R2.04): (a) src/index.css ispod `@layer base` još ima stara pravila (swiper/portfolio CSS i
compact-height `@media (min-width:1024px) and (max-height:900px|820px)` sa `!important` padding-om za `#about/#work/#whyme/#contact`)
- kartica ih briše; posle toga poređenje sa redizajnom više ne traži brisanje iz CSSOM-a. (b) `manualChunks` u vite.config.js daje
prazan `swiper` chunk. (c) Arbitrary vrednosti koje se ponavljaju među sekcijama: `clamp(96px,12vw,180px)` (Why, Work, Contact) i
`clamp(88px,10vw,150px)` (Contact, Footer) - planer odlučuje da li ide token (kartica ne traži; zabeleži u handoff kao nalaz).
(d) Očekivane razlike prema redizajnu: "Design of clothes" 25 vs 24 medija (duplikat, briše se u R3.02), redosled medija iz
Sanity-ja, nazivi kategorija 2-4 velikim slovima (R3.02), lightbox i drawer imaju `tabIndex={-1}` (u redizajnu Escape ne radi
posle klika na sliku), polja forme imaju `aria-describedby` samo dok su u grešci.
Važno za proveru: dev server MORA na port 5173 (`npm run dev -- --port 5173 --strictPort`) - Sanity CORS odbija druge portove
(403). Proveri pre Lighthouse-a da li preview na 5182 dobija Sanity podatke; ako dobija 403 - to je CORS (dodaje se u Sanity
upravljanju, vlasnikov korak), zapiši i uradi Lighthouse na 5173 build-u ili napiši tačan nalaz, ne menjaj ništa u Sanity-ju.
Forma se u proveri presreće sa `page.route('https://api.web3forms.com/submit', ...)`.
U Sanity-ju `figure` još ne postoji -> heroFigure/whyFigure su null (lokalne figure).
Sledeći task: R3.01 (Čišćenje i QA gate; DEPENDS R2.04 DONE - zadovoljeno; PREGLED=REVIEW, gate M2).
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R2.04 DONE: ..."; necommitovano: ništa očekivano.
Ti komituješ posle handoff-a (work-protocol §4), push nikad.
Otvorene odluke i vlasnikove stavke: O07/O08 PROPOSED (backup putanja) -> R3.02; O10 OPEN (hosting, web root, Studio host) ->
R3.02/R3.03; O11 OPEN (veličina videa) - van koda.
Okruženje i komande: Node v22.20.0, npm 11.9.0; vizuelno: dev `:5173`, redizajn `python -m http.server 5181 --directory
redesign`, Playwright MCP i chrome-devtools MCP (Lighthouse); scratchpad za skripte, logove i screenshot-ove; Playwright sme da piše
samo u `c:\xampp\htdocs\Projects\.playwright-mcp`.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
