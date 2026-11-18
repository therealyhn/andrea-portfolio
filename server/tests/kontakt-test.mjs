// Lokalna proba endpoint-a kontakt forme (maestro-cms docs/plans/kontakt-forma, ugovor §2.7). Bez zavisnosti.
// Iz korena repoa sajta, posle `composer install --working-dir=server` i sa Mailpit-om na 127.0.0.1:1025 i :8025:
//   PHP_BIN=C:/xampp/php/php.exe MAILPIT_URL=http://127.0.0.1:8025 node server/tests/kontakt-test.mjs
// KONTAKT_KEEP=1 ostavlja php -S na 127.0.0.1:8099 i ispisuje <base> i PID (lokalni curl, KF.02).

import { spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HOST = '127.0.0.1'
const PORT = 8099
const SMTP_PORT = 1025
const DEAD_SMTP_PORT = 1026
const ENDPOINT = '/api/contact.php'

const testsDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(testsDir, '..', '..')
const phpBin = process.env.PHP_BIN || 'php'
const mailpitUrl = (process.env.MAILPIT_URL || 'http://127.0.0.1:8025').replace(/\/+$/, '')
const keep = process.env.KONTAKT_KEEP === '1'
const primer = JSON.parse(fs.readFileSync(path.join(testsDir, 'primer.json'), 'utf8'))

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'kontakt-test-'))
const docroot = path.join(base, 'public_html')
const stateDir = path.join(base, 'kontakt-stanje')
const configPath = path.join(base, 'kontakt-config.php')
const logPath = path.join(stateDir, 'greske.log')
const rateSecret = randomBytes(32).toString('hex')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function writeConfig({ port = SMTP_PORT, omit = null } = {}) {
  const config = {
    smtp_host: HOST,
    smtp_port: port,
    smtp_encryption: 'none',
    smtp_user: 'forma@primer.test',
    smtp_pass: '',
    from_name: 'primer.test',
    to_email: 'primalac@primer.test',
    rate_secret: rateSecret,
  }
  const lines = Object.entries(config)
    .filter(([key]) => key !== omit)
    .map(([key, value]) => `    '${key}' => ${typeof value === 'number' ? value : `'${value}'`},`)
  fs.writeFileSync(configPath, `<?php\nreturn [\n${lines.join('\n')}\n];\n`)
}

function stateFiles(prefix) {
  if (!fs.existsSync(stateDir)) return []
  return fs.readdirSync(stateDir).filter((name) => name.startsWith(prefix)).map((name) => path.join(stateDir, name))
}

function clearCounters() {
  for (const file of [...stateFiles('ip-'), ...stateFiles('dan-')]) fs.rmSync(file, { force: true })
}

const readLog = () => (fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : '')

function request(method, { origin, type, body } = {}) {
  return new Promise((resolve, reject) => {
    const headers = {}
    if (origin) headers.Origin = origin
    if (type) headers['Content-Type'] = type
    const payload = body === undefined ? null : Buffer.from(body, 'utf8')
    if (payload) headers['Content-Length'] = payload.length
    const req = http.request({ host: HOST, port: PORT, path: ENDPOINT, method, headers }, (res) => {
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () =>
        resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }),
      )
    })
    req.on('error', reject)
    req.setTimeout(30000, () => req.destroy(new Error('zahtev je istekao posle 30 s')))
    if (payload) req.write(payload)
    req.end()
  })
}

const postJson = (data, origin = primer.origin) =>
  request('POST', { origin, type: 'application/json', body: typeof data === 'string' ? data : JSON.stringify(data) })

const validMessage = (overrides = {}) => ({ ...primer.message, ...overrides })

const describe = (res) => `HTTP ${res.status}, telo ${res.body.slice(0, 160)}`

async function mailpitLatest() {
  const res = await fetch(`${mailpitUrl}/api/v1/messages?limit=1`)
  if (!res.ok) throw new Error(`Mailpit lista vraća HTTP ${res.status}`)
  const data = await res.json()
  return { total: data.total, id: data.messages[0]?.ID }
}

async function mailpitWaitFor(total) {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const latest = await mailpitLatest()
    if (latest.total >= total) return latest
    await sleep(100)
  }
  return mailpitLatest()
}

async function mailpitMessage(id) {
  const res = await fetch(`${mailpitUrl}/api/v1/message/${id}`)
  if (!res.ok) throw new Error(`Mailpit poruka vraća HTTP ${res.status}`)
  return res.json()
}

let passed = 0
let failed = 0

async function check(number, title, run) {
  let outcome
  try {
    outcome = await run()
  } catch (error) {
    outcome = error.message
  }
  if (outcome === true) {
    passed += 1
    console.log(`ok   ${number}. ${title}`)
  } else {
    failed += 1
    console.log(`FAIL ${number}. ${title}: ${outcome}`)
  }
}

async function serverAnswers() {
  try {
    await request('GET')
    return true
  } catch {
    return false
  }
}

async function startServer() {
  if (await serverAnswers()) throw new Error(`Port ${PORT} je zauzet; ugasi proces koji ga drži.`)
  const server = spawn(phpBin, ['-S', `${HOST}:${PORT}`, '-t', docroot], {
    stdio: 'ignore',
    windowsHide: true,
    detached: keep,
  })
  const spawnError = new Promise((_, reject) => server.once('error', reject))
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (await Promise.race([serverAnswers(), spawnError])) return server
    await sleep(100)
  }
  server.kill()
  throw new Error(`php -S se nije javio na ${HOST}:${PORT} (PHP_BIN=${phpBin}).`)
}

async function runCases() {
  await check(1, 'OPTIONS sa originom sajta: 204 i Access-Control-Allow-Origin', async () => {
    const res = await request('OPTIONS', { origin: primer.origin })
    return (res.status === 204 && res.headers['access-control-allow-origin'] === primer.origin) || describe(res)
  })

  await check(2, 'OPTIONS sa https://primer.test: 403 bez Access-Control-Allow-Origin', async () => {
    const res = await request('OPTIONS', { origin: 'https://primer.test' })
    return (res.status === 403 && !('access-control-allow-origin' in res.headers)) || describe(res)
  })

  await check(3, 'GET: 405 i Allow: POST, OPTIONS', async () => {
    const res = await request('GET')
    return (res.status === 405 && res.headers.allow === 'POST, OPTIONS') || `${describe(res)}, Allow ${res.headers.allow}`
  })

  await check(4, 'POST bez Origin: 403', async () => {
    const res = await request('POST', { type: 'application/json', body: JSON.stringify(validMessage()) })
    return res.status === 403 || describe(res)
  })

  await check(5, 'POST sa text/plain: 415', async () => {
    const res = await request('POST', { origin: primer.origin, type: 'text/plain', body: JSON.stringify(validMessage()) })
    return res.status === 415 || describe(res)
  })

  await check(6, 'POST sa telom od 17 KiB: 413', async () => {
    const res = await postJson(validMessage({ [primer.textField]: 'a'.repeat(17 * 1024) }))
    return res.status === 413 || describe(res)
  })

  await check(7, 'POST []: 400', async () => {
    const res = await postJson('[]')
    return res.status === 400 || describe(res)
  })

  await check(8, 'POST {}: 422 i "success":false', async () => {
    const res = await postJson('{}')
    return (res.status === 422 && res.body.includes('"success":false')) || describe(res)
  })

  await check(9, 'Ime sa novim redom: 422', async () => {
    const res = await postJson(validMessage({ name: 'Proba\nBcc: druga@primer.test' }))
    return res.status === 422 || describe(res)
  })

  await check(10, 'Email bez @: 422', async () => {
    const res = await postJson(validMessage({ email: 'posetilac.primer.test' }))
    return res.status === 422 || describe(res)
  })

  await check(11, 'Poruka duža od 5000 znakova: 422', async () => {
    const res = await postJson(validMessage({ [primer.textField]: 'a'.repeat(5001) }))
    return res.status === 422 || describe(res)
  })

  await check(12, 'Popunjen website: 200 {"success":true} i Mailpit bez nove poruke', async () => {
    const before = await mailpitLatest()
    const res = await postJson(validMessage({ website: 'https://spam.primer.test' }))
    if (res.status !== 200 || res.body !== '{"success":true}') return describe(res)
    await sleep(500)
    const after = await mailpitLatest()
    return after.total === before.total || `Mailpit ima ${after.total - before.total} novih poruka`
  })

  await check(13, 'Ispravna poruka: 200 i tačno jedna poruka u Mailpit-u (From, To, Reply-To, naslov)', async () => {
    const before = await mailpitLatest()
    const res = await postJson(validMessage())
    if (res.status !== 200 || res.body !== '{"success":true}') return describe(res)
    const latest = await mailpitWaitFor(before.total + 1)
    await sleep(300)
    const after = await mailpitLatest()
    if (after.total !== before.total + 1) return `Mailpit ima ${after.total - before.total} novih poruka`
    const mail = await mailpitMessage(latest.id)
    const problems = []
    if (mail.From?.Address !== 'forma@primer.test') problems.push(`From ${mail.From?.Address}`)
    if (mail.To?.length !== 1 || mail.To[0].Address !== 'primalac@primer.test') problems.push('To')
    if (mail.ReplyTo?.length !== 1 || mail.ReplyTo[0].Address !== primer.message.email) problems.push('Reply-To')
    if (!String(mail.Subject).startsWith('Poruka sa sajta')) problems.push(`naslov ${mail.Subject}`)
    return problems.length === 0 || problems.join(', ')
  })

  await check(14, 'Još četiri ispravne: 200; šesta u satu: 429 i Retry-After > 0', async () => {
    for (let index = 0; index < 4; index += 1) {
      const res = await postJson(validMessage())
      if (res.status !== 200) return `poruka ${index + 2}: ${describe(res)}`
    }
    const res = await postJson(validMessage())
    const retryAfter = Number(res.headers['retry-after'])
    return (res.status === 429 && retryAfter > 0) || `${describe(res)}, Retry-After ${res.headers['retry-after']}`
  })

  await check(15, 'Fajlovi u kontakt-stanje ne sadrže 127.0.0.1', async () => {
    const files = fs.readdirSync(stateDir)
    if (!files.some((name) => name.startsWith('ip-'))) return 'nema ip-*.json fajla'
    const leaking = files.filter(
      (name) => name.includes(HOST) || fs.readFileSync(path.join(stateDir, name), 'utf8').includes(HOST),
    )
    return leaking.length === 0 || `IP u ${leaking.join(', ')}`
  })

  await check(16, 'Dnevni brojač 100: ispravna poruka dobija 429', async () => {
    for (const file of stateFiles('ip-')) fs.rmSync(file, { force: true })
    const day = new Date().toISOString().slice(0, 10).replaceAll('-', '')
    fs.writeFileSync(path.join(stateDir, `dan-${day}.txt`), '100')
    const res = await postJson(validMessage())
    return res.status === 429 || describe(res)
  })

  await check(17, 'Config bez rate_secret: 500 i red u greske.log sa rate_secret', async () => {
    clearCounters()
    writeConfig({ omit: 'rate_secret' })
    const res = await postJson(validMessage())
    if (res.status !== 500) return describe(res)
    return readLog().includes('rate_secret') || 'greske.log nema red sa rate_secret'
  })

  await check(18, 'Bez config fajla: 500', async () => {
    fs.rmSync(configPath, { force: true })
    const res = await postJson(validMessage())
    return res.status === 500 || describe(res)
  })

  await check(19, `SMTP port ${DEAD_SMTP_PORT} bez servera: 502 i red u greske.log bez emaila iz primera`, async () => {
    clearCounters()
    writeConfig({ port: DEAD_SMTP_PORT })
    const logBefore = readLog()
    const res = await postJson(validMessage())
    if (res.status !== 502) return describe(res)
    const added = readLog().slice(logBefore.length)
    if (!added.includes('slanje nije uspelo')) return 'greske.log nema nov red o slanju'
    return !added.includes(primer.message.email) || 'red u greske.log sadrži email iz primera'
  })

  await check(20, 'greske.log ne sadrži email ni ime iz primer.json', async () => {
    const log = readLog()
    if (log === '') return 'greske.log je prazan'
    const found = [primer.message.email, primer.message.name].filter((value) => log.includes(value))
    return found.length === 0 || `greske.log sadrži: ${found.join(', ')}`
  })
}

async function main() {
  const vendorAutoload = path.join(repoRoot, 'server', 'vendor', 'autoload.php')
  if (!fs.existsSync(vendorAutoload)) {
    throw new Error('Nema server/vendor/autoload.php: pokreni composer install --working-dir=server.')
  }
  await mailpitLatest().catch((error) => {
    throw new Error(`Mailpit API na ${mailpitUrl} ne odgovara (${error.message}).`)
  })

  fs.cpSync(path.join(repoRoot, 'public', 'api'), path.join(docroot, 'api'), { recursive: true })
  fs.cpSync(path.join(repoRoot, 'server', 'vendor'), path.join(docroot, 'api', 'vendor'), { recursive: true })
  writeConfig()

  const server = await startServer()
  try {
    await runCases()
  } finally {
    writeConfig()
    clearCounters()
    if (keep) {
      server.unref()
      console.log(`KONTAKT_KEEP=1: php -S ostaje na http://${HOST}:${PORT}${ENDPOINT}, PID ${server.pid}, <base> ${base}`)
    } else {
      const exited = new Promise((resolve) => server.once('exit', resolve))
      server.kill()
      await exited
    }
  }

  console.log(`${passed} passed, ${failed} failed`)
  if (failed > 0) {
    console.log(`<base> ostaje za pregled: ${base}`)
  } else if (!keep) {
    fs.rmSync(base, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  }
  process.exitCode = failed > 0 ? 1 : 0
}

main().catch((error) => {
  console.error(`Proba nije pokrenuta: ${error.message}`)
  console.error(`<base>: ${base}`)
  process.exitCode = 1
})
