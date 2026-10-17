import { cssVar } from '@datum/tokens'

import { baseTokens, dimension, tokensUnder } from './tokens-data'

const typeSamples = [
  { token: 'font.display', label: 'Display · Archivo 800', style: { fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 } },
  { token: 'font.display', label: 'Título · Archivo 700', style: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' } },
  { token: 'font.text', label: 'Texto · IBM Plex Sans 400', style: { fontSize: 16, fontWeight: 400 } },
  { token: 'font.mono', label: 'Anotação · IBM Plex Mono 500', style: { fontSize: 13, fontWeight: 500, color: 'var(--datum-color-drafting)' } },
]

const sampleText: Record<string, string> = {
  'Display · Archivo 800': 'Datum',
  'Título · Archivo 700': 'Pirâmide de testes na prática',
  'Texto · IBM Plex Sans 400': 'Cuidado com o que ninguém vê. Código que continua legível depois de cinco ou dez anos.',
  'Anotação · IBM Plex Mono 500': 'h 40 · px 16 · r 2 · R$ 12.000,00',
}

export function TypeSpecimen() {
  return (
    <div className="datum-docs">
      {typeSamples.map(sample => (
        <div key={sample.label} className="datum-type-row">
          <span className="datum-label">{sample.label}</span>
          <span style={{ fontFamily: `var(${cssVar(sample.token)})`, ...sample.style }}>{sampleText[sample.label]}</span>
        </div>
      ))}
      <div className="datum-type-row">
        <span className="datum-label">Pilhas</span>
        <span className="datum-swatch__value">
          {(['font.display', 'font.text', 'font.mono'] as const).map(path => (
            <span key={path} style={{ display: 'block' }}>
              {path}: {(baseTokens[path].value as string[]).join(', ')}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

/** Spacing, radius and grid tokens drawn as dimension marks. */
export function ScaleSpecimen({ prefix }: Readonly<{ prefix: 'space.' | 'radius.' | 'grid.' }>) {
  return (
    <div className="datum-docs">
      {tokensUnder(prefix).map(([path, token]) => {
        const size = dimension(token.value)
        const px = Math.min(Number.parseFloat(size), 240)
        return (
          <div key={path} className="datum-scale-row">
            <span>{path}</span>
            <span>{size}</span>
            {prefix === 'radius.' ? (
              <span
                style={{
                  width: 64,
                  height: 40,
                  border: '1px solid var(--datum-color-line-strong)',
                  background: 'var(--datum-color-well)',
                  borderRadius: `var(${cssVar(path)})`,
                }}
              />
            ) : (
              <span className="datum-dim" style={{ width: px }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/** The drafting board: fine and major grid, as the site draws it. */
export function GridSpecimen() {
  return (
    <div className="datum-sheet datum-ticked" style={{ height: 240 }}>
      <span className="datum-label">grid.minor 24px · grid.major 120px</span>
    </div>
  )
}
