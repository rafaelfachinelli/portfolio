// Generates the narration of the architecture sketch scenarios with ElevenLabs,
// in Rafael's cloned voice: one MP3 per step caption and language, into
// public/audio/architecture/<locale>/<step>.mp3, plus a manifest with each
// clip's fingerprint. Only missing or changed clips are generated.
//
// Usage (from apps/site; Node 24 runs TypeScript directly):
//   npm run narration -- [--force] [--only pt-BR]
// with the key in apps/site/.env.narration (ELEVENLABS_API_KEY=...) or in the
// terminal environment.
//
// Optional: ELEVENLABS_VOICE_ID (default: Rafael's clone), ELEVENLABS_MODEL
// (default: eleven_multilingual_v2). The key never leaves this machine.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { architectureCopy } from '../src/content/tools/architecture.ts'
import { narrationHash } from '../src/lib/tools/architecture/narration-hash.ts'

const RAFAEL_VOICE = 'lqRd7tFtb70CBHtbzdof'

// The key comes from the terminal or from apps/site/.env.narration (ignored by
// Git), so it never needs to be typed into a command.
const envFile = fileURLToPath(new URL('../.env.narration', import.meta.url))
if (!process.env.ELEVENLABS_API_KEY && existsSync(envFile)) {
  process.loadEnvFile(envFile)
}
const apiKey = process.env.ELEVENLABS_API_KEY?.trim()
const voice = process.env.ELEVENLABS_VOICE_ID ?? RAFAEL_VOICE
const model = process.env.ELEVENLABS_MODEL ?? 'eleven_multilingual_v2'
const force = process.argv.includes('--force')
const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null

if (!apiKey) {
  console.error(
    'No key: paste it after ELEVENLABS_API_KEY= in apps/site/.env.narration.',
  )
  process.exit(1)
}

const root = path.dirname(
  fileURLToPath(new URL('../package.json', import.meta.url)),
)
const manifestPath = path.join(
  root,
  'src/content/tools/architecture-narration.json',
)
const audioRoot = path.join(root, 'public/audio/architecture')

type Manifest = {
  voice: string
  model: string
  clips: Record<string, Record<string, string>>
}
const manifest: Manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

async function speak(text: string): Promise<Buffer> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey!, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: model,
        seed: 42,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0,
          use_speaker_boost: true,
          speed: 1,
        },
      }),
    },
  )
  if (!response.ok) {
    throw new Error(
      `ElevenLabs answered ${response.status}: ${await response.text()}`,
    )
  }
  return Buffer.from(await response.arrayBuffer())
}

let generated = 0
let characters = 0
const clips: Manifest['clips'] = {}

for (const [locale, copy] of Object.entries(architectureCopy)) {
  const folder = path.join(audioRoot, locale)
  mkdirSync(folder, { recursive: true })
  clips[locale] = {}

  for (const [key, text] of Object.entries(copy.steps)) {
    const hash = narrationHash(text, voice, model)
    const file = path.join(folder, `${key}.mp3`)
    const fresh = manifest.clips[locale]?.[key] === hash && existsSync(file)
    const skip = only !== null && only !== locale

    if (skip || (fresh && !force)) {
      if (manifest.clips[locale]?.[key])
        clips[locale][key] = manifest.clips[locale][key]
      continue
    }
    process.stdout.write(`${locale} ${key}… `)
    writeFileSync(file, await speak(text))
    clips[locale][key] = hash
    generated += 1
    characters += text.length
    console.log('ok')
  }

  // Clips of captions that no longer exist.
  for (const key of Object.keys(manifest.clips[locale] ?? {})) {
    if (!(key in copy.steps))
      rmSync(path.join(folder, `${key}.mp3`), { force: true })
  }
}

writeFileSync(
  manifestPath,
  `${JSON.stringify({ voice, model, clips }, null, 2)}\n`,
)
console.log(
  `\n${generated} clips generated (${characters} characters). Manifest updated.`,
)
