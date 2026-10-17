import { describe, expect, it } from 'vitest'

import { contrastRatio } from '../src/contrast'
import { type FlatToken, resolveTokens, seasonContexts } from '../src/resolve'

const AA_TEXT = 4.5

function valueOf(tokens: FlatToken[], path: string): string {
  const token = tokens.find(t => t.path === path)
  if (!token) throw new Error(`Missing token ${path}`)
  return String(token.value)
}

describe('base theme contrast (WCAG AA, 4.5:1 for text)', () => {
  const tokens = resolveTokens()
  const backgrounds = ['color.board', 'color.surface', 'color.well']
  const texts = [
    'color.ink',
    'color.ink-muted',
    'color.ink-subtle',
    'color.drafting',
    'color.highlight',
    'color.danger',
    'color.success',
    'color.warning',
  ]

  for (const background of backgrounds) {
    for (const text of texts) {
      it(`${text} on ${background}`, () => {
        expect(contrastRatio(valueOf(tokens, text), valueOf(tokens, background))).toBeGreaterThanOrEqual(AA_TEXT)
      })
    }
  }
})

describe('season contrast', () => {
  for (const season of seasonContexts) {
    const tokens = resolveTokens(season)

    it(`${season}: accent as text on board and surface`, () => {
      for (const background of ['color.board', 'color.surface']) {
        expect(contrastRatio(valueOf(tokens, 'season.accent'), valueOf(tokens, background))).toBeGreaterThanOrEqual(AA_TEXT)
      }
    })

    it(`${season}: text on the accent`, () => {
      expect(contrastRatio(valueOf(tokens, 'season.on-accent'), valueOf(tokens, 'season.accent'))).toBeGreaterThanOrEqual(AA_TEXT)
    })
  }
})

describe('contrastRatio', () => {
  it('matches known values', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
  })
})
