# andrea-portfolio - redizajn: uputstvo za executor model

Projekat: `C:\xampp\htdocs\Projects\andrea-portfolio` (React 19 + Vite 7 + Tailwind 3 + Sanity v4 Studio u `sanity/`).
Cilj: sajt izgleda i radi kao `redesign/andrea-milenovic-redesign.html` (vidi `plan.md` §1). Protokol: skill `work-protocol`.

## Fajlovi plana
| Fajl | Šta je |
|---|---|
| `progress.md` | JEDINI izvor statusa (registar, gate-ovi, poslednji handoff) |
| `plan.md` | misija, ugovori (§2), milestone-i, task kartice (§4) |
| `decisions.md` | O01-O11; OPEN/PROPOSED odluke se ne biraju u tasku |
| `verification.md` | komande, osnovne linije, vizuelno poređenje |
| `handoff-prompt.md` | prompt za sledeću sesiju (zamenjuje se posle svakog taska) |
| `reference/redesign-stripped.html` | redizajn bez base64 slika, isti brojevi redova - čitaj OVAJ fajl |

## Petlja izvršavanja (jedna sesija = jedan task)
1. Pročitaj samo: nalepljen handoff, `progress.md`, ovaj README, svoju karticu u `plan.md` i njene READ fajlove/redove.
2. `git status --short`; tuđe necommitovane izmene ne diraj i ne dodaj u commit - upiši ih u handoff.
3. Proveri DEPENDS (prethodni task DONE, potrebne odluke RESOLVED). `IN_REVIEW` nije DONE.
4. Jedna rečenica vlasniku šta menjaš i koju proveru radiš; upiši `IN_PROGRESS` u registar.
5. Najmanja kompletna promena u granicama WRITE liste. Bez stubova, praznih handlera, lažnog uspeha, feature-a van kartice.
6. VERIFY iz kartice jednom posle promene; zapiši stvarne izlaze i exit kodove. Serveri u pozadini sa logom u scratchpad-u.
7. `git diff --check` + eslint fajlova koje si dirao.
8. Handoff po šablonu iz `progress.md`; registar red <= 300 znakova; dnevnik <= 2 reda.
9. PREGLED=REVIEW -> `IN_REVIEW` + AskUserQuestion "Da li prihvataš <ID> kao DONE?". Kratko "nastavi" nije prihvatanje.
10. Posle DONE: registar + `handoff-prompt.md` + commit (pravila ispod), pa vlasniku: "Task <ID> je DONE, commit <hash> u
    andrea-portfolio je upisan, handoff je osvežen - otvori novu sesiju i nalepi handoff-prompt.md (ili pokreni `/compact`)."

## Nepromenljiva pravila
- Git: `git add <tačne putanje>` + `git commit -m "<ID> <STATUS>: <opis>"` (jedan red, <= 72 znaka, bez trailer-a). Nikad `git add -A`
  ili `.`, nikad `git push`, `tag`, `merge`, `rebase`, `--amend`, `stash`, `reset`, `checkout --`.
- Nikad ne commit-uj `.env.local`, `dist/`, `node_modules/`, screenshot-ove, scratchpad skripte, Sanity backup arhive.
- Nikad ne štampaj vrednosti iz `.env.local` (samo imena ključeva).
- Ne piši u Sanity dataset, ne pokreći `npx sanity deploy`, ne šalji stvarnu poruku kroz formu - to su vlasnikovi koraci (R3.02, R3.03).
- Ne menjaj ugovore iz `plan.md` §2 ni odluke; rupa u planu = `BLOCKED` sa tačnim pitanjem u `progress.md` i STOP.
- Tekst sajta = engleski iz redizajna, bez izmena. Tekst plana i poruke vlasniku = srpski, ekavica, obična crtica "-", bez emodžija.

## Poznate zamke
1. Original redizajna ima base64 na redovima 353, 472, 535, 666 (~480 KB) - čitaj `reference/redesign-stripped.html`.
2. Tekstovi sekcija se prepisuju iz HTML markup-a (redovi 463-664), ne iz JSON-a u redu 666 (JSON ima stariju verziju) - osim
   alt tekstova, priča poglavlja i video podataka (`plan.md` §2.4).
3. `overflow-x: hidden` (`overflow-hidden`) na `html`/`body` ili precima sticky naslova lomi `position: sticky`; redizajn koristi
   `overflow-x: clip` (`overflow-x-clip`). R1.01 briše stara `html`/`body` pravila iz `src/index.css`.
4. Stilovi su Tailwind klase (O01, `plan.md` §2.9-§2.10). Dve klase za isto svojstvo na istom elementu (`size-5` + `size-4`) -
   pobeđuje redosled u generisanom CSS-u, ne u `className`; komponente sa varijantama biraju JEDNU klasu po svojstvu. Klase se
   pišu kao celi stringovi (Tailwind skenira izvor; `"bg-" + x` se ne generiše). Razmak u arbitrary vrednosti = `_`.
5. Hero figura ima `motion-fig` (`animation ... both` drži `opacity`) - ne praviti prelaz preko opacity na tom elementu (O06).
   `animate-[...]` i `addUtilities` ne emituju `@keyframes`; keyframes su u `addBase` plugina.
6. Čisti moduli (`src/data`, `src/lib/sanity/queries.js`, `normalizeSiteMedia.js`, `src/lib/utils/*.js`) koriste importe sa `.js`
   ekstenzijom i ne diraju `import.meta.env` - Node provera iz R1.02 ih učitava direktno.
7. Sanity kategorija "Design of clothes" ima duplikat (25 medija, redizajn 24) i drugačiji redosled - očekivano do R3.02, kod ne
   uklanja duplikate.
8. Video fajlovi u Sanity su 19-533 MB; u VERIFY ne puštaj video do kraja i ne preuzimaj ga ceo (O11).
9. `index.html` počinje BOM znakom - ne menjaj kodiranje fajla.
10. `tailwind.config.js` importuje `tailwindcss/plugin.js` (sa `.js`): bez ekstenzije Vite radi, ali Node provera config-a pada.

## Štednja usage-a
- Ne čitaj ceo workspace, arhivu, tuđe kartice ni ceo redizajn - samo redove iz svoje kartice.
- Fajl > 300 redova: Grep pa Read sa offset/limit. Fajl koji si izmenio ne čitaj ponovo.
- Pun `npm run lint`/build/screenshot samo kad ga VERIFY traži. Bez subagenata i dodatnih dokumenata.
- Odgovor vlasniku kratak: šta je urađeno, brojevi, jedan sledeći korak.
