# Progress - andrea-portfolio redizajn

## Trenutno stanje
- CURRENT: R1.02 DONE 2026-10-01 (Opus 5.5 na "nastavi sad"). M1 Osnova zatvoren. Stari sajt i dalje radi; nova šema NIJE
  deploy-ovana (R3.02), novi sloj podataka još nigde nije uključen (R2.x).
- Aktivan task: nema.
- Sledeći kandidat: R2.01 (DEPENDS R1.02 DONE).
- Poslednja isporuka: R1.02 (commit `R1.02 DONE: ...`).

## Task registar
| ID | Naziv | Status | Napomena (<= 300 znakova) |
|---|---|---|---|
| R1.01 | Asseti, Tailwind tokeni i plugin, head, osnovni UI | DONE | Opus 5.5 ("radi ti"). Build 0, eslint 0, 23/23 klasa iz §2.10 generisano. Dodato: transitionDuration 350/400/450/600, viewport-fit=cover, disabled stil dugmeta. Vidi handoff. |
| R1.02 | Sanity šema i sloj podataka | DONE | Opus 5.5 ("nastavi sad"). Schema validate 0/0, Node VERIFY 8/8 izlaza tačno, eslint 0, build 0. Ispravljeni brojevi redova JSON-a u planu (podaci 666, pravni 667). |
| R2.01 | Header, mobilni meni, Hero | TODO | |
| R2.02 | About i Why Me | TODO | |
| R2.03 | Work sekcija i Lightbox | TODO | |
| R2.04 | Drawer, Contact, Footer | TODO | |
| R3.01 | Čišćenje i QA gate | TODO | REVIEW, gate M2 |
| R3.02 | Sanity backup, Studio deploy, sadržaj | TODO | REVIEW, vlasnik, čeka O08, O10 |
| R3.03 | Deploy i rollback proba | TODO | REVIEW, vlasnik, čeka O10 |

## Milestone gate registar
| Milestone | Status | Datum i citat |
|---|---|---|
| M1 Osnova | PASSED | 2026-10-01, objektivni kriterijum: build exit 0 + VERIFY R1.02 (gate bez vlasnikovog pregleda) |
| M2 Sekcije | PENDING | |
| M3 Produkcija | PENDING | |

## Otvorene stavke van koda
- O07, O08 PROPOSED; O10, O11 OPEN (vidi `decisions.md`). O10 (hosting, web root, Studio host) treba pre R3.02/R3.03.
- Vlasnik/klijent u Studiju (R3.02): upload izrezanih figura, preimenovanje kategorija 2-4, brisanje duplikata (pozicija 25).

## POSLEDNJI handoff
### Handoff R1.02 - 2026-10-01
- Status: DONE
- Repo: andrea-portfolio, commit "R1.02 DONE: Sanity šema i sloj podataka" (hash: `git log -1`)
- Izmenjeni fajlovi: sanity/schemaTypes/{hero,whyMe,workSection,index}.js, obrisani sanity/schemaTypes/{about,contact,footer}.js,
  src/lib/sanityClient.js (export projectId/dataset), src/lib/sanity/{queries,normalizeSiteMedia,imageUrl}.js,
  src/lib/utils/{sanityRef,workSummary}.js, src/data/workData.js (generisan iz JSON-a red 666), src/hooks/useSiteMedia.js;
  van WRITE: .agents/plan.md + README.md (samo brojevi redova: JSON podaci 667->666, pravni 668->667)
- Provere: `npx sanity schema validate` -> 0 errors, 0 warnings, exit 0; Node VERIFY (živi API) -> `43 6`, 4 poglavlja tačno
  po kartici (25/13/6/6, 0 generisanih alt-ova), `figures null null`, rečenica "Four chapters, ...: 25 designs, 13 AI images,
  6 films and 6 portraits.", test nove kategorije i `normalizeSiteMedia(null)` identični očekivanim; _key kategorija = §2.4.
- Pregled: git diff --check exit 0; eslint src/lib src/data src/hooks/useSiteMedia.js sanity/schemaTypes exit 0; npm run build exit 0
- Napomene: fallback alt broji važeće stavke (preskočen medij ne pravi rupu u numeraciji); `imageUrl` vraća null, `imageSrcSet`
  "" za nevažeći ref; `imageUrl.js` nije čist modul (uvozi sanityClient).
- Otvoreno: (iz R1.01) async font CSS može da pusti hero animaciju pre fonta - proveriti u R2.01.
- Tuđe necommitovane izmene: nema
- Sledeći task: R2.01

## Šablon handoff-a
```
### Handoff <ID> - <datum>
- Status: DONE | IN_PROGRESS | IN_REVIEW | BLOCKED
- Repo: andrea-portfolio, HEAD <hash> "<poruka>"
- Izmenjeni fajlovi: <putanje>; van WRITE: <putanja - razlog | nema>
- Provere: <komanda -> exit / rezultat>; NOT_RUN: <provera - razlog>
- Pregled: <git diff --check, lint>
- Otvoreno: <stavke | nema>
- Tuđe necommitovane izmene: <fajlovi | nema>
- Sledeći task: <ID>
```

## Dnevnik
- 2026-10-01 plan: plan paket napisan; O02 RESOLVED (Sanity samo hero slika, kategorije+mediji, Why Me slika).
- 2026-10-01 plan: vlasnik rešio O01 (sve Tailwind), O03, O04-O06, O09 (bez Sentry-ja); planer proverio Tailwind 3.4 mehanizme CLI testom.
- 2026-10-01 R1.01 DONE (Opus 5.5 na "radi ti"): asseti, tokeni + plugin, head, UI osnova; build/eslint 0.
- 2026-10-01 R1.02 DONE (Opus 5.5 na "nastavi sad"): šema (hidden polja, figure), upit, normalizacija, workData, useSiteMedia; M1 PASSED.
