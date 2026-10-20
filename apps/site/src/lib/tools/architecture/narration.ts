import manifest from '@/content/tools/architecture-narration.json'

// Narration of the scenario captions, in Rafael's cloned voice (ElevenLabs).
// The clips are generated once by `scripts/generate-narration.ts` into
// `public/audio/architecture/<locale>/<step>.mp3`; this module only finds them.

type Manifest = {
  voice: string
  model: string
  clips: Record<string, Record<string, string>>
}

const clips = (manifest as Manifest).clips

/** The clips of one locale (step key → audio path), or null when there are none. */
export function narrationFor(locale: string): Record<string, string> | null {
  const entries = Object.entries(clips[locale] ?? {})
  if (entries.length === 0) return null
  // The fingerprint in the query string busts caches when a clip is redone.
  return Object.fromEntries(
    entries.map(([key, hash]) => [
      key,
      `/audio/architecture/${locale}/${key}.mp3?v=${hash.slice(0, 8)}`,
    ]),
  )
}
