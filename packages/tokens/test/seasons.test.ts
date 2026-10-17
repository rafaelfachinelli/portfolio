import { describe, expect, it } from 'vitest'

import { resolveTokens, seasonContexts } from '../src/resolve'
import { getSeason, SEASON_IDS, seasonIdFor, seasonInlineScript } from '../src/seasons'

const cases: [string, string][] = [
  // Default and Halloween
  ['2026-10-17', 'base'],
  ['2026-10-23', 'base'],
  ['2026-10-24', 'halloween'],
  ['2026-10-31', 'halloween'],
  ['2026-11-01', 'base'],
  // Christmas and New Year
  ['2026-12-01', 'natal'],
  ['2026-12-25', 'natal'],
  ['2026-12-26', 'ano-novo'],
  ['2027-01-06', 'ano-novo'],
  ['2027-01-07', 'base'],
  // Carnival 2026: Carnival Tuesday is 17 Feb, Easter is 5 Apr
  ['2026-02-12', 'base'],
  ['2026-02-13', 'carnaval'],
  ['2026-02-18', 'carnaval'],
  ['2026-02-19', 'base'],
  // Easter 2026: Palm Sunday 29 Mar to Easter Sunday 5 Apr
  ['2026-03-28', 'base'],
  ['2026-03-29', 'pascoa'],
  ['2026-04-05', 'pascoa'],
  ['2026-04-06', 'base'],
  // Carnival 2027: Carnival Tuesday is 9 Feb, Easter is 28 Mar
  ['2027-02-05', 'carnaval'],
  ['2027-02-10', 'carnaval'],
  ['2027-03-21', 'pascoa'],
  ['2027-03-28', 'pascoa'],
  // June festival
  ['2026-05-31', 'base'],
  ['2026-06-01', 'festa-junina'],
  ['2026-06-30', 'festa-junina'],
  ['2026-07-01', 'base'],
  // Programmer's Day: day 256
  ['2026-09-13', 'dia-do-programador'],
  ['2026-09-12', 'base'],
  ['2028-09-12', 'dia-do-programador'],
  ['2028-09-13', 'base'],
]

describe('seasonIdFor', () => {
  for (const [iso, expected] of cases) {
    it(`${iso} -> ${expected}`, () => {
      const [y, m, d] = iso.split('-').map(Number)
      expect(seasonIdFor(y, m, d)).toBe(expected)
    })
  }

  it('getSeason uses the local calendar day', () => {
    expect(getSeason(new Date(2026, 11, 25, 23, 59))).toBe('natal')
  })
})

describe('seasonInlineScript', () => {
  it('sets a known season on the document element', () => {
    const attributes: Record<string, string> = {}
    const fakeDocument = {
      documentElement: { setAttribute: (key: string, value: string) => (attributes[key] = value) },
    }
    new Function('document', seasonInlineScript)(fakeDocument)
    expect(SEASON_IDS).toContain(attributes['data-season'])
  })
})

describe('season tokens', () => {
  it('every season id has a token context and vice versa', () => {
    expect([...seasonContexts].sort()).toEqual([...SEASON_IDS].sort())
  })

  for (const season of seasonContexts) {
    it(`${season} defines a, b, accent and on-accent`, () => {
      const paths = resolveTokens(season)
        .filter(t => t.path.startsWith('season.'))
        .map(t => t.path)
        .sort()
      expect(paths).toEqual(['season.a', 'season.accent', 'season.b', 'season.on-accent'])
    })
  }
})
