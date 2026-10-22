// Runs before `vite` and `vite build` (package.json): reads the published content from the Maestro CMS
// public API and writes src/generated/cms-content.json, which the site imports through src/lib/cms.js
// (card MS.12a in maestro-cms). Content enters the site at build time; the browser loads only the images
// and films, from the CMS public media URLs. Without CMS_API_URL, without a response or without a
// published entry the build stops: a site without its Work chapters is never published.
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUTPUT = path.resolve('src/generated/cms-content.json')
const TIMEOUT_MS = 20000
const EXAMPLE_URL = 'http://127.0.0.1:8095/dashboard/api/v1'

const isText = (value) => typeof value === 'string' && value.trim() !== ''
const isMedia = (value) => typeof value?.urls?.original === 'string'
// A figure is optional: without it the site shows its own cut-out (src/data/heroData.js, whyData.js).
const isFigure = (value) => value === undefined || value === null || isMedia(value)

function categoriesError(categories) {
  if (!Array.isArray(categories) || categories.length === 0) return 'kategorije'
  if (!categories.every((category) => isText(category?.naziv) && Array.isArray(category?.galerija))) return 'kategorije'
  return categories.some((category) => category.galerija.some(isMedia)) ? undefined : 'kategorije (nijedna kategorija nema medij)'
}

// Types from cms/content-schema.php. All three are `single`, so the site reads the newest published entry of each.
const TYPES = [
  { key: 'baner', name: 'Baner', invalidField: (data) => (isFigure(data.figura) ? undefined : 'figura') },
  { key: 'zasto-ja', name: 'Zašto ja', invalidField: (data) => (isFigure(data.figura) ? undefined : 'figura') },
  { key: 'radovi', name: 'Radovi', invalidField: (data) => categoriesError(data.kategorije) },
]

function apiBase() {
  // Locally CMS_API_URL may sit in .env.local; in CI the workflow sets it from a repository variable.
  if (!process.env.CMS_API_URL && existsSync('.env.local')) process.loadEnvFile('.env.local')

  const raw = process.env.CMS_API_URL?.trim()
  if (!raw) {
    throw new Error(
      `CMS_API_URL nije postavljen. Izrada čita sadržaj iz Maestro CMS-a: upiši adresu javnog API-ja instance, na primer CMS_API_URL=${EXAMPLE_URL} (lokalno u .env.local, u GitHub-u kao promenljivu repoa).`,
    )
  }

  let url
  try {
    url = new URL(raw)
  } catch {
    url = null
  }
  if (!url || (url.protocol !== 'http:' && url.protocol !== 'https:')) {
    throw new Error(`CMS_API_URL mora biti puna http ili https adresa javnog API-ja, na primer ${EXAMPLE_URL}.`)
  }

  return url.href.replace(/\/+$/, '')
}

async function readNewestEntry(base, type) {
  const url = `${base}/public/content/${type.key}?page=1&perPage=1`
  let response
  try {
    response = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(TIMEOUT_MS) })
  } catch (error) {
    throw new Error(`CMS ne odgovara na ${url} (${error.name}).`)
  }
  if (!response.ok) {
    throw new Error(`CMS je vratio HTTP ${response.status} za ${url}.`)
  }

  let body
  try {
    body = await response.json()
  } catch {
    throw new Error(`CMS nije vratio JSON za ${url}.`)
  }
  if (body?.success !== true || !Array.isArray(body.data)) {
    throw new Error(`CMS je vratio neočekivan odgovor za ${url}.`)
  }

  const entry = body.data[0]
  if (!entry) {
    throw new Error(`CMS nema objavljen unos tipa „${type.name}” (${type.key}). Objavi ga u dashboard-u, pa ponovi izradu.`)
  }

  const invalid = type.invalidField(entry.data ?? {})
  if (invalid) {
    throw new Error(`Objavljen unos tipa „${type.name}” (${type.key}) nema ispravno polje ${invalid}.`)
  }

  return entry.data
}

async function main() {
  const base = apiBase()
  const content = {}

  for (const type of TYPES) {
    content[type.key] = await readNewestEntry(base, type)
  }

  await mkdir(path.dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, `${JSON.stringify(content, null, 2)}\n`, 'utf8')

  const categories = content.radovi.kategorije
  const media = categories.reduce((sum, category) => sum + category.galerija.length, 0)
  const names = TYPES.map((type) => type.name).join(', ')
  console.log(`CMS sadržaj upisan u ${path.relative(process.cwd(), OUTPUT)} (${names}; kategorija: ${categories.length}, medija u galerijama: ${media}).`)
}

main().catch((error) => {
  console.error(`Sadržaj iz CMS-a nije učitan: ${error.message}`)
  process.exit(1)
})
