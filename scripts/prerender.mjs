// Post-build step (O27 in maestro-solutions): renders every route in headless Chrome and writes the
// #root markup into the built HTML as a hidden snapshot. Crawlers without JavaScript (backlink tools,
// social bots) get the full page and the footer link; visitors with JavaScript never see the snapshot:
// the inline `html.js` style in index.html hides it and src/main.jsx clears it before React mounts.
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import puppeteer from 'puppeteer'

const distDir = path.resolve('dist')
const port = 4321
const origin = `http://127.0.0.1:${port}`
const routes = ['/']

// The snapshot is written only when all of these exist: the footer link, the page title and the
// content that arrives from Sanity (Work chapters, the hero chapter index, Work images).
const REQUIRED_SELECTORS = [
  'a[href="https://maestro-solutions.org"]',
  'h1',
  '#work article[id^="ch-"]',
  '#home a[href^="#ch-"]',
  '#work img[src^="https://cdn.sanity.io/"]',
]

// Removed from the snapshot so the hidden copy never loads players or runs scripts.
const STRIPPED_ELEMENTS = 'iframe, video, audio, canvas, script, noscript'

// Head tags taken from the rendered page; every other head tag stays as in the template.
const SNAPSHOT_HEAD_SELECTORS = [
  'title',
  'meta[name="description"]',
  'link[rel="canonical"]',
  'meta[property^="og:"]',
  'meta[name^="twitter:"]',
  'script[type="application/ld+json"]',
]

const ROOT_PLACEHOLDER = '<div id="root"></div>'
const HEAD_PLACEHOLDER = '<!--prerender-head-->'

// Sanity accepts browser requests only from its CORS origins, so its API calls are sent from Node.
const SANITY_API = /^https:\/\/[a-z0-9-]+\.api(cdn)?\.sanity\.io\//

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

async function resolveFile(requestPath) {
  const cleanPath = decodeURIComponent(requestPath.split('?')[0])
  const candidate = path.join(distDir, cleanPath)
  if (path.relative(distDir, candidate).startsWith('..')) return null
  try {
    const info = await stat(candidate)
    if (info.isFile()) return candidate
  } catch {
    // not a file: SPA fallback to the template
  }
  return null
}

function startServer(template) {
  const server = createServer(async (req, res) => {
    const file = await resolveFile(req.url ?? '/')
    if (!file) {
      res.writeHead(200, { 'Content-Type': mimeTypes['.html'] })
      res.end(template)
      return
    }
    try {
      const body = await readFile(file)
      res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(file)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })
  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, '127.0.0.1', () => resolve(server))
  })
}

async function proxySanity(request) {
  try {
    const response = await fetch(request.url())
    await request.respond({
      status: response.status,
      contentType: response.headers.get('content-type') ?? 'application/json',
      headers: { 'Access-Control-Allow-Origin': origin },
      body: Buffer.from(await response.arrayBuffer()),
    })
  } catch (error) {
    console.error(`Sanity request failed: ${request.url()}`, error)
    await request.abort()
  }
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const pause = () => new Promise((resolve) => setTimeout(resolve, 150))
    for (let y = 0; y < document.documentElement.scrollHeight; y += 800) {
      window.scrollTo(0, y)
      await pause()
    }
    window.scrollTo(0, 0)
  })
}

async function renderRoute(browser, route) {
  const page = await browser.newPage()
  try {
    await page.setViewport({ width: 1440, height: 900 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      if (request.method() === 'GET' && SANITY_API.test(request.url())) {
        proxySanity(request)
      } else {
        request.continue()
      }
    })

    await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' })
    await scrollThrough(page)
    for (const selector of REQUIRED_SELECTORS) {
      try {
        await page.waitForSelector(selector, { timeout: 30000 })
      } catch {
        throw new Error(`Required selector "${selector}" missing on route ${route}`)
      }
    }
    try {
      await page.waitForNetworkIdle({ idleTime: 800, timeout: 20000 })
    } catch {
      console.warn(`Warning: network did not go idle on route ${route}; writing the snapshot anyway.`)
    }

    return await page.evaluate(
      (stripped, headSelectors) => {
        const root = document.getElementById('root').cloneNode(true)
        root.querySelectorAll(stripped).forEach((element) => element.remove())
        const head = headSelectors.flatMap((selector) =>
          [...document.head.querySelectorAll(selector)].map((element) => element.outerHTML),
        )
        return { body: root.innerHTML, head }
      },
      STRIPPED_ELEMENTS,
      SNAPSHOT_HEAD_SELECTORS,
    )
  } finally {
    await page.close()
  }
}

function parseAttributes(source) {
  const attributes = {}
  for (const match of source.matchAll(/([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? ''
  }
  return attributes
}

// Same tag set as SNAPSHOT_HEAD_SELECTORS, decided on the template's raw tags.
function isSnapshotHeadTag(name, attributes) {
  if (name === 'title') return true
  if (name === 'link') return attributes.rel === 'canonical'
  if (name === 'script') return attributes.type === 'application/ld+json'
  return (
    attributes.name === 'description' ||
    (attributes.property ?? '').startsWith('og:') ||
    (attributes.name ?? '').startsWith('twitter:')
  )
}

// Replaces the template's snapshot head tags with the rendered ones, at the first one's position.
function mergeHead(template, snapshotHead) {
  const headEnd = template.indexOf('</head>')
  if (headEnd === -1) throw new Error('Template has no </head>')
  let placed = false
  const tag = /<(title|script)\b((?:[^>"']|"[^"]*"|'[^']*')*)>[\s\S]*?<\/\1>|<(meta|link)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi
  const head = template.slice(0, headEnd).replace(tag, (whole, contentName, contentAttrs, voidName, voidAttrs) => {
    const name = (contentName ?? voidName).toLowerCase()
    if (!isSnapshotHeadTag(name, parseAttributes(contentAttrs ?? voidAttrs ?? ''))) return whole
    if (placed) return ''
    placed = true
    return HEAD_PLACEHOLDER
  })
  const tags = snapshotHead.join('\n  ')
  const merged = placed ? head.replace(HEAD_PLACEHOLDER, () => tags) : `${head}  ${tags}\n`
  return merged.replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n') + template.slice(headEnd)
}

function buildHtml(template, snapshot) {
  if (template.split(ROOT_PLACEHOLDER).length !== 2) {
    throw new Error(`Template must contain exactly one ${ROOT_PLACEHOLDER}`)
  }
  return mergeHead(template, snapshot.head).replace(
    ROOT_PLACEHOLDER,
    () => `<div id="root" data-prerendered>${snapshot.body}</div>`,
  )
}

// 404.html (client-seo O11): the homepage snapshot without canonical, with `noindex`; Apache serves it
// for every unknown address through `ErrorDocument 404`.
function toNotFoundPage(html) {
  const withoutCanonical = html.replace(/\s*<link rel="canonical"[^>]*>/, '')
  const withoutGooglebot = withoutCanonical.replace(/\s*<meta name="googlebot"[^>]*>/, '')
  const notFoundHtml = withoutGooglebot.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    '<meta name="robots" content="noindex" />',
  )
  if (
    withoutCanonical === html ||
    withoutGooglebot === withoutCanonical ||
    notFoundHtml === withoutGooglebot
  ) {
    throw new Error('404.html: canonical, googlebot or robots tag not found in the homepage snapshot')
  }
  return notFoundHtml
}

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
  if (template.split(ROOT_PLACEHOLDER).length !== 2) {
    throw new Error(`dist/index.html must contain exactly one ${ROOT_PLACEHOLDER}`)
  }

  const server = await startServer(template)
  const browser = await puppeteer.launch({ headless: true })
  const rendered = new Map()

  try {
    for (const route of routes) {
      rendered.set(route, buildHtml(template, await renderRoute(browser, route)))
      console.log(`prerendered ${route}`)
    }
  } finally {
    await browser.close()
    server.close()
  }

  for (const [route, html] of rendered) {
    const outPath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html')
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
  }

  await writeFile(path.join(distDir, '404.html'), toNotFoundPage(rendered.get('/')), 'utf8')

  console.log(`Prerendered ${rendered.size} route(s) and 404.html into dist/.`)
}

main().catch((error) => {
  console.error('Prerender failed:', error.message ?? error)
  process.exit(1)
})
