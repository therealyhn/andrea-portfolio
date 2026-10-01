# Odluke - andrea-portfolio redizajn

Status: OPEN (čeka vlasnika) / PROPOSED (planer predlaže, vlasnik potvrđuje) / RESOLVED (datum + citat).
Executor ne bira OPEN/PROPOSED odluke: task koji zavisi od njih staje sa BLOCKED.

## O01 - Kako se prenosi CSS iz redizajna - RESOLVED 2026-10-01
- Vlasnik (AskUserQuestion 2026-10-01) izabrao: "Sve u Tailwind klasama" (umesto planerovog predloga BEM CSS port).
- Odluka: svaki stil iz redizajna (redovi 15-412) postaje Tailwind v3 utility klasa u JSX-u. Tokeni i sve što Tailwind ne može
  jednom klasom (container upiti, keyframes, scroll-driven animacije, `font-variation-settings`) idu u `tailwind.config.js`
  (`theme.extend` + inline `plugin()` iz paketa `tailwindcss`, bez nove biblioteke). Jedini CSS van Tailwind klasa je mali
  `@layer base` u `src/index.css` (pravila prevoda: `plan.md` §2.9-§2.10).
- Planer proverio 2026-10-01 na Tailwind 3.4.19 iz projekta (CLI test u scratchpad-u): `[@container(...)]`/`addVariant('@container
  ...')`, `[container-type:size]`, `text-[length:min(19.6cqw,30cqh)]`, `top-[calc(var(--hd)_+_3cqh_+_...)]`, `first-letter:`,
  `data-[in=true]:`, `group-data-[...]:`, `[mask:url(...)]` (dodaje i `-webkit-mask`), `[view-timeline:--heroT_block]`,
  raw screen `{ raw: '(max-width: 959px)' }`, `addUtilities` sa ugnježdenim `@supports`, `addBase` za `@keyframes` - sve generiše
  očekivan CSS. `animate-[...]` i `addUtilities` NE emituju `@keyframes` sami - keyframes idu kroz `addBase`.

## O02 - Šta ostaje u Sanity kontroli klijenta - RESOLVED 2026-10-01
- Citat vlasnika: "takodje treba da se ostavi u sanity kontroli klijentu samo hero slika, pravljenje kategorija i unos media u
  kategorije (slike/video) i why me slika, ostatak je staticno."
- Sanity: hero slika, kategorije (naziv + mediji slike/video), Why Me slika. Sve ostalo (tekstovi, iskustvo, školovanje, veštine,
  kontakt podaci, footer, pravni tekstovi, logo, About slike) je statično u `src/data/*.js` i `public/img/`.

## O03 - Nova polja `figure` u Sanity umesto prepisivanja starih - RESOLVED 2026-10-01
- Vlasnik (AskUserQuestion 2026-10-01): "Nova polja, stara sakrivena (Recommended)".
- Odluka: `hero` i `whyMe` dobijaju novo polje `figure` (image). Stara polja (`hero.image`, `hero.curvedText`,
  `whyMe.heading/descriptionContent/skills/buttonText/backgroundImage`) ostaju u šemi sa `hidden: true` (podaci ostaju, Studio ih ne
  prikazuje, nema upozorenja "unknown field"). Tipovi `about`, `contactPage`, `footer` se uklanjaju iz Studija.
- Razlog: stari sajt i dalje čita `hero.image` i `whyMe.backgroundImage` dok novi ne ode u produkciju; izrezana figura se može
  upisati u `figure` pre deploy-a bez kvarenja starog sajta.
- Alternativa: koristiti postojeća polja `hero.image` / `whyMe.backgroundImage` - tada upload izrezanih slika mora ići tek
  posle deploy-a novog sajta (stari sajt bi ih prikazao kao pozadinu).

## O04 - Kategorije: šta dolazi iz Sanity, šta je statično - RESOLVED 2026-10-01
- Vlasnik (AskUserQuestion 2026-10-01): "Prihvatam sve (Recommended)" (O04, O05, O06 zajedno).
- Iz Sanity: `_key`, naziv kategorije (prikazuje se tačno kako je upisan), redosled kategorija, mediji i njihov redosled.
- Statično u `src/data/workData.js`, vezano za Sanity `_key` kategorije: kratak naziv (hero indeks), jedinica ("designs", "films"),
  lead rečenica, priča za "Read the full story". Alt tekst slika vezan za asset ref, video metapodaci (poster, dimenzije, trajanje)
  vezani za file ref - sve preneto iz redizajn JSON-a.
- Nova kategorija bez statičnog teksta: kratak naziv = naziv, jedinica = "works", bez lead-a i bez dugmeta za priču.
- Nova slika bez alt teksta: alt = `<naziv kategorije> <redni broj sa dve cifre>`. Nov video bez metapodataka: dimenzije i trajanje
  iz `loadedmetadata`, prvi kadar kao poster (videti R2.03).
- Posledica: nazivi kategorija u Sanity su sada VELIKIM SLOVIMA ("AI FASHION VIDEO"); redizajn ih piše "AI fashion video" - vlasnik
  ih preimenuje u Studiju (R3.02). U kategoriji "Design of clothes" slika `bdc9e2e7...` je dva puta (pozicije 22 i 25, `_key`
  `f3b61f8f7e6d` i `3400972d6ddd`) - vlasnik briše poslednju (25) u R3.02; kod NE uklanja duplikate.
- Redosled medija u "Design of clothes" u Sanity se razlikuje od redizajna; sajt prati Sanity redosled (klijent ga menja prevlačenjem).

## O05 - Kontakt forma - RESOLVED 2026-10-01
- Vlasnik (AskUserQuestion 2026-10-01): "Prihvatam sve (Recommended)" (O04, O05, O06 zajedno).
- Web3Forms ostaje (postojeći ključ `VITE_WEB3FORMS_KEY` u `.env.local`, ne ulazi u git). Slanje `fetch` POST JSON na
  `https://api.web3forms.com/submit` sa poljima `access_key, name, email, phone, message` (ista polja kao sada).
- Uspeh = stanje "Message sent" iz redizajna. Greška (mreža, `success:false`, prazan ključ) = vidljiva poruka sa email adresom,
  forma ostaje popunjena. Bez novih biblioteka (Axios ne postoji u projektu).

## O06 - Hero figura: lokalna slika odmah, Sanity slika kad se učita - RESOLVED 2026-10-01
- Vlasnik (AskUserQuestion 2026-10-01): "Prihvatam sve (Recommended)" (O04, O05, O06 zajedno).
- Obrazac kao postojeći commit "fallback banner": `public/img/hero-figure.webp` se prikazuje odmah (LCP, preload u `index.html`).
  Sanity `hero.figure` se učita u pozadini (`new Image()`), i tek posle `onload` isti `<img>` dobija Sanity `src/srcSet` (slika je
  već u kešu, zamena je trenutna). Ne dva sloja sa opacity prelazom: `.hero__fig` ima `animation ... both` koja drži `opacity` i
  poništila bi prelaz. Ako Sanity nema sliku ili upit padne, ostaje lokalna.
- Why Me: `src = sanity URL ako postoji, inače '/img/whyme-figure.webp'` (lazy, ispod prvog ekrana).

## O07 - Kapacitet i skalabilnost - PROPOSED (N/A)
- Statički SPA na deljenom hostingu + Sanity CDN za slike/video. Nema baze, servera ni tenant-a. Jedini kapacitet je Sanity
  plan (bandwidth za video, videti O11). Kartica kapaciteta se ne pravi.

## O08 - Backup i restore - PROPOSED
- Kod: git (lokalno; push radi vlasnik kad odluči). Sanity: `npx sanity dataset export production <fajl>.tar.gz --no-assets` PRE
  deploy-a nove šeme (R3.02; šema ne menja dokumente ni assete, a asseti su ~1 GB videa), provera arhive, probni restore u
  privremeni dataset `restore-test` i njegovo brisanje posle provere.
- Putanja backup-a van repoa: predlog `C:\backups\andrea-portfolio\` - vlasnik potvrđuje u R3.02.
- Hosting: pre upload-a nove verzije zip trenutnog sadržaja web root-a (R3.03) = rollback paket.

## O09 - Monitoring i error tracking - RESOLVED 2026-10-01
- Vlasnik (AskUserQuestion 2026-10-01): "Bez Sentry-ja (Recommended)". Kartica R3.04 se ne pravi.
- Predlog: bez Sentry-ja (portfolio bez backend-a; jedina dinamika je Sanity čitanje i Web3Forms). Greške su vidljive korisniku
  (stanje greške u portfoliju i formi). Uptime provera domena = vlasnikov izbor alata.
- Uptime provera domena ostaje vlasnikov izbor van ovog plana.

## O10 - Deploy cilj i postupak - OPEN
- Potrebno od vlasnika pre R3.03: gde je sajt hostovan (Hostinger nalog / cPanel / drugo), putanja web root-a, način upload-a (FTP
  klijent ili File Manager). Domen iz koda: `andreamilenovic.com` (canonical u `index.html`). Ništa od ovoga se ne izmišlja.
- Studio host za `npx sanity deploy` (R3.02): vlasnik potvrđuje postojeći `*.sanity.studio` naziv koji klijent koristi.
- Rollback proba: nema staging-a. Predlog: posle deploy-a vlasnik vrati backup zip na web root, potvrdi da stari sajt radi, pa
  ponovo postavi novi build (5-10 minuta prekida u terminu koji vlasnik izabere). Alternativa: staging poddomen ako postoji.

## O11 - Veličina video fajlova - OPEN (van koda)
- Sanity fajlovi su 19.6-533.3 MB (4K "Yacht editorial" = 533.3 MB). Lightbox ih strimuje direktno sa CDN-a. Predlog: vlasnik ih
  prekodira (1080p H.264, ~10-30 MB) i zameni u Studiju; posle zamene se menjaju ref-ovi u `VIDEO_META` (planer dopunjuje karticu).
  Redizajn ne zavisi od ove odluke.
