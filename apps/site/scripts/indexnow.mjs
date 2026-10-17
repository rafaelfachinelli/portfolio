// Notifies Bing and other IndexNow search engines about new or updated URLs.
//
// Usage (run AFTER the deploy is live, the key file must be reachable):
//   node scripts/indexnow.mjs                 # submits every URL in the live sitemap
//   node scripts/indexnow.mjs <url> <url> ... # submits only the given URLs
//
// The key is the name of the single .txt file in /public that contains the same
// key as its content (see https://www.indexnow.org/documentation).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rafaelfachinelli.com'
).replace(/\/$/, '')

const publicDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public',
)

const keyFile = fs
  .readdirSync(publicDir)
  .find(
    name =>
      /^[a-f0-9]{32}\.txt$/.test(name) &&
      fs.readFileSync(path.join(publicDir, name), 'utf8').trim() ===
        name.replace('.txt', ''),
  )

if (!keyFile) {
  console.error('IndexNow key file not found in /public.')
  process.exit(1)
}

const key = keyFile.replace('.txt', '')
const keyLocation = `${SITE_URL}/${keyFile}`

let urlList = process.argv.slice(2)

if (urlList.length === 0) {
  const sitemap = await (await fetch(`${SITE_URL}/sitemap.xml`)).text()
  urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
}

if (urlList.length === 0) {
  console.error('No URLs to submit.')
  process.exit(1)
}

const keyCheck = await fetch(keyLocation)
if (!keyCheck.ok || (await keyCheck.text()).trim() !== key) {
  console.error(`Key file is not reachable at ${keyLocation}. Deploy first.`)
  process.exit(1)
}

const payload = JSON.stringify({
  host: new URL(SITE_URL).host,
  key,
  keyLocation,
  urlList,
})

// Any IndexNow endpoint shares submissions with the other engines. Try them in
// order, with a descriptive User-Agent (some endpoints reset anonymous clients).
const endpoints = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/indexnow',
]

let exitCode = 1
for (const endpoint of endpoints) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'rafaelfachinelli-indexnow/1.0 (+https://rafaelfachinelli.com)',
      },
      body: payload,
    })
    console.log(
      `IndexNow (${new URL(endpoint).host}): submitted ${urlList.length} URL(s) -> HTTP ${response.status}`,
    )
    // 200 = received, 202 = received and pending key validation.
    if (response.ok) {
      exitCode = 0
      break
    }
  } catch (error) {
    console.warn(`IndexNow (${new URL(endpoint).host}) failed: ${error.cause?.code ?? error.message}`)
  }
}

process.exitCode = exitCode
