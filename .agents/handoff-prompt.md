# Handoff prompt - stanje 2026-10-01 (posle R3.01, pre R3.02)
(prompt ispod crte vlasnik nalepi na početku sledeće sesije)
---
Radiš na redizajnu andrea-portfolio: `C:\xampp\htdocs\Projects\andrea-portfolio\.agents\` (README = uputstvo, §petlja/§pravila/
§zamke/§štednja obavezni; progress.md = jedini izvor statusa; plan.md = ugovori §2 i kartice §4; decisions.md; verification.md).
Redosled čitanja: progress.md -> README -> kartica R3.02 u plan.md + njeni READ redovi (decisions.md O03, O04, O08, O10;
`sanity/schemaTypes/*.js`). Ništa drugo unapred.
Uloga: R3.02 je vođeni vlasnikov task na produkcionom CMS-u (Executor: Opus 5). WRITE su samo `.agents/` fajlovi; sve komande i
klikove u Sanity-ju izvršava vlasnik - ti daješ JEDNU komandu ili klik, čekaš izlaz, pa sledeću (work-protocol §6). Ne menjaš plan,
ugovore ni odluke; rupa u planu = BLOCKED + pitanje.
Moja pravila: (1) jedna sesija = jedan task; (2) status samo u progress.md; R3.02 je PREGLED=REVIEW -> IN_REVIEW + AskUserQuestion
"Da li prihvataš R3.02 kao DONE?"; "nastavi" NIJE prihvatanje; (3) git add tačnih putanja + commit `<ID> <STATUS>: <opis>` radiš ti
posle handoff-a, push nikad, nikad add -A; (4) ne štampaj .env.local vrednosti i tokene; ti ne pišeš u Sanity dataset i ne
pokrećeš `npx sanity deploy` - to radi vlasnik po tvojoj komandi; ne šalji stvarnu poruku kroz formu (to je R3.03); (5) srpski
ekavica, obična crtica "-", bez emodžija; (6) komande za vlasnika su za Windows PowerShell 5.1 (bez `&&`, bez `<placeholder>` -
upiši stvarne vrednosti, jedna komanda po poruci); (7) kratki odgovori, bez subagenata i dodatnih dokumenata.
Stanje 2026-10-01: M1 i M2 PASSED. R1.01-R3.01 DONE (vlasnik prihvatio R3.01: "Prihvatam, DONE"). Sajt je kompletno po redizajnu
lokalno: Hero, About, Work (+ Lightbox), Why Me, Contact (Web3Forms), Footer, Drawer; stari kod, paketi i asseti obrisani; lint 0,
build 0, Lighthouse mobilni 96/100/100/100, desktop 100x4; `npm audit` 0 ranjivosti. Nova Sanity šema (R1.02: `figure` na hero i
whyMe, sakrivena stara polja, kategorije) je u `sanity/schemaTypes/` ali NIJE deploy-ovana - zato su heroFigure/whyFigure null i
sajt koristi lokalne figure; nazivi kategorija 2-4 su VELIKIM SLOVIMA; "Design of clothes" ima duplikat na poziciji 25
(`_key 3400972d6ddd`).
Pre koraka 1 R3.02 vlasnik mora da reši: O08 (PROPOSED) - potvrda putanje backup-a van repoa (predlog `C:\backups\andrea-portfolio\`)
i O10 (OPEN) - postojeći `*.sanity.studio` naziv Studija koji klijent koristi. Bez toga je R3.02 BLOCKED; pitaj kroz
AskUserQuestion i upiši odgovor u decisions.md. Hosting/web root iz O10 treba tek za R3.03.
Važno za proveru posle izmena u Studiju: Node provera iz kartice R1.02 (VERIFY) i lokalni `npm run dev -- --port 5173
--strictPort` (Sanity CORS dozvoljava samo :5173 i :3333; ako je :5173 zauzet tuđim procesom, ne gasi ga - koristi :3333).
Git: andrea-portfolio (sopstveni repo), grana main, poslednji commit "R3.01 DONE: ..."; necommitovano: ništa očekivano.
Otvorene odluke: O07 PROPOSED (N/A), O08 PROPOSED, O10 OPEN, O11 OPEN (veličina videa, van koda).
Okruženje: Node v22.20.0, npm 11.9.0, Sanity CLI preko `npx` iz `sanity/` foldera; scratchpad za logove.
Počni tako što ćeš mi u 5-8 redova reći šta vidiš u progress.md i koji je prvi korak koji ja treba da uradim.
