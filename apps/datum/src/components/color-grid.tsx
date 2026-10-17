import { contrastRatio, cssVar } from '@datum/tokens'

import { baseTokens, tokensUnder } from './tokens-data'

const board = String(baseTokens['color.board'].value)

function isOpaqueHex(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value)
}

/** Semantic color tokens with their value, purpose and contrast on the board. */
export function ColorGrid({ prefix = 'color.' }: Readonly<{ prefix?: string }>) {
  return (
    <div className="datum-docs datum-grid">
      {tokensUnder(prefix).map(([path, token]) => {
        const value = String(token.value)
        const ratio = isOpaqueHex(value) && path !== 'color.board' ? contrastRatio(value, board) : null
        return (
          <div key={path} className="datum-swatch">
            <div className="datum-swatch__chip" style={{ background: `var(${cssVar(path)})` }} />
            <div className="datum-swatch__body">
              <span className="datum-swatch__name">{path}</span>
              <span className="datum-swatch__value">{value}</span>
              {token.description && <span className="datum-swatch__desc">{token.description}</span>}
              {ratio !== null && (
                <span className={`datum-badge${ratio >= 4.5 ? ' datum-badge--ok' : ''}`}>
                  {ratio.toFixed(1)}:1 sobre o board{ratio >= 4.5 ? ' · AA' : ''}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
