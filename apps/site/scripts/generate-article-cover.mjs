// Generates a 1200x630 cover (WebP + SVG source) for an article.
//
// Usage:
//   node scripts/generate-article-cover.mjs --slug my-article-v1 \
//     --kicker "TEST PYRAMID" --headline "70/20/10" --subline "UNIT · INTEGRATION · E2E" \
//     [--accent amber|sky|indigo|emerald|rose]
//
// Output: public/images/articles/<slug>.webp (+ .svg). Use a NEW slug/version every
// time you change a cover (e.g. "-v2") so browsers and the Next image cache do not
// keep serving the old file. Requires `sharp` (installed with Next.js).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .reduce((acc, value, index, all) => {
      if (value.startsWith('--')) acc.push([value.slice(2), all[index + 1]])
      return acc
    }, []),
)

const { slug, kicker = '', headline = '', subline = '', accent = 'amber' } = args
if (!slug || !headline) {
  console.error('Missing --slug or --headline. See usage at the top of this file.')
  process.exit(1)
}

const accents = {
  amber: ['#fcd34d', '#f59e0b'],
  sky: ['#7dd3fc', '#0284c7'],
  indigo: ['#a5b4fc', '#6366f1'],
  emerald: ['#6ee7b7', '#059669'],
  rose: ['#fda4af', '#e11d48'],
}
const [accentLight, accentDark] = accents[accent] ?? accents.amber

const escape = value =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

// Shrink the headline so long text still fits inside the frame.
const headlineSize = Math.max(64, Math.min(150, Math.floor(1000 / Math.max(headline.length, 1) * 1.7)))
const font = "font-family='Arial, Helvetica, sans-serif'"

const dots = Array.from({ length: 40 }, (_, i) => {
  const x = (i * 197) % 1200
  const y = (i * 311) % 630
  return `<circle cx='${x}' cy='${y}' r='${(i % 3) + 1}' fill='#7dd3fc' opacity='${0.12 + (i % 4) * 0.05}'/>`
}).join('')

const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630' width='1200' height='630'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#020617'/><stop offset='0.55' stop-color='#0b1228'/><stop offset='1' stop-color='#0c3a5c'/>
    </linearGradient>
    <radialGradient id='glow' cx='0.5' cy='0.5' r='0.6'>
      <stop offset='0' stop-color='${accentDark}' stop-opacity='0.28'/><stop offset='1' stop-color='${accentDark}' stop-opacity='0'/>
    </radialGradient>
    <linearGradient id='txt' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0' stop-color='${accentLight}'/><stop offset='1' stop-color='#e2e8f0'/>
    </linearGradient>
  </defs>
  <rect width='1200' height='630' fill='url(#bg)'/>
  <rect width='1200' height='630' fill='url(#glow)'/>
  ${dots}
  <g ${font} text-anchor='middle'>
    <text x='600' y='190' font-size='28' font-weight='700' letter-spacing='10' fill='#7dd3fc'>${escape(kicker)}</text>
    <text x='600' y='${200 + headlineSize}' font-size='${headlineSize}' font-weight='800' fill='url(#txt)'>${escape(headline)}</text>
    <text x='600' y='${200 + headlineSize + 70}' font-size='34' font-weight='600' fill='#e2e8f0'>${escape(subline)}</text>
    <rect x='540' y='${200 + headlineSize + 105}' width='120' height='6' rx='3' fill='${accentDark}'/>
  </g>
</svg>`

const outDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/images/articles',
)
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg)
await sharp(Buffer.from(svg))
  .resize(1200, 630)
  .webp({ quality: 88 })
  .toFile(path.join(outDir, `${slug}.webp`))

console.log(`Created public/images/articles/${slug}.webp`)
console.log(`Use in articles.ts:  cover: '/images/articles/${slug}.webp'`)
