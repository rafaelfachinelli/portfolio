import { createHash } from 'node:crypto'

/**
 * Fingerprint of one narration clip: the caption, the voice and the model. A
 * clip whose fingerprint no longer matches is stale and must be generated again
 * (`npm run narration -w @rafaelfachinelli/site`). Node only (script and tests).
 */
export function narrationHash(text: string, voice: string, model: string) {
  return createHash('sha256')
    .update(`${voice}\n${model}\n${text}`)
    .digest('hex')
    .slice(0, 16)
}
