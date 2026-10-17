import { getSeason, SEASON_IDS, SEASON_NAMES, type SeasonId, seasonIdFor } from '@datum/tokens'

import { seasonTokens } from './tokens-data'

const WINDOWS: Record<SeasonId, string> = {
  base: 'Fora de todas as janelas',
  'ano-novo': '26 dez a 6 jan',
  carnaval: 'Sexta antes do Carnaval até a Quarta de Cinzas',
  pascoa: 'Domingo de Ramos até o domingo de Páscoa',
  'festa-junina': '1 a 30 jun',
  'dia-do-programador': 'Dia 256 do ano (13 set; 12 set em ano bissexto)',
  halloween: '24 a 31 out',
  natal: '1 a 25 dez',
}

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })

/** Next [start, end] window of a season, found by walking the calendar with seasonIdFor. */
function nextWindow(id: SeasonId, from: Date): [Date, Date] | null {
  const day = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  let start: Date | null = null
  for (let i = 0; i < 800; i++) {
    const current = seasonIdFor(day.getFullYear(), day.getMonth() + 1, day.getDate())
    if (current === id && !start) start = new Date(day)
    if (current !== id && start) return [start, new Date(day.getTime() - 86400000)]
    day.setDate(day.getDate() + 1)
  }
  return null
}

function formatWindow(window: [Date, Date] | null): string {
  if (!window) return '—'
  const [start, end] = window
  if (start.getTime() === end.getTime()) return dateFormat.format(start)
  return `${dateFormat.format(start)} a ${dateFormat.format(end)}`
}

function SeasonLogo({ id }: Readonly<{ id: SeasonId }>) {
  const t = seasonTokens[id]
  return (
    <span
      className="datum-logo"
      style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${t['season.a']}, ${t['season.b']})` }}
    />
  )
}

/** The season calendar, computed from the same function the site uses. */
export function SeasonCalendar() {
  const today = new Date()
  const current = getSeason(today)
  return (
    <div className="datum-docs datum-scroll">
      <table className="datum-table" style={{ minWidth: 640 }}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Temporada</th>
            <th>Janela</th>
            <th>Destaque</th>
            <th>Próxima vez</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {SEASON_IDS.map(id => {
            const window = id === 'base' ? null : nextWindow(id, today)
            const accent = seasonTokens[id]['season.accent']
            return (
              <tr key={id}>
                <td>
                  <SeasonLogo id={id} />
                </td>
                <td>
                  {SEASON_NAMES[id]['pt-BR']}
                  <div className="datum-swatch__value">{id}</div>
                </td>
                <td>{WINDOWS[id]}</td>
                <td className="mono">
                  <span style={{ display: 'inline-block', width: 12, height: 12, background: accent, marginRight: 8, verticalAlign: 'middle' }} />
                  {accent}
                </td>
                <td className="mono">{formatWindow(window)}</td>
                <td>{id === current && <span className="datum-pill-now">hoje</span>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/** Logo and accent of the season currently selected in the toolbar. */
export function SeasonPreview() {
  return (
    <div className="datum-sheet datum-ticked" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <span className="datum-logo" style={{ width: 56, height: 56 }} />
      <div style={{ display: 'grid', gap: 8 }}>
        <span className="datum-label" style={{ color: 'var(--datum-season-accent)' }}>
          Tech Lead &amp; Engenheiro de Software
        </span>
        <span style={{ fontFamily: 'var(--datum-font-display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em' }}>
          A temporada muda o logo e o destaque.
        </span>
        <span>
          <span className="datum-btn">Explorar projetos</span>
        </span>
      </div>
    </div>
  )
}
