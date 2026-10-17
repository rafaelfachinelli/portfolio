export const SEASON_IDS = [
  'base',
  'ano-novo',
  'carnaval',
  'pascoa',
  'festa-junina',
  'dia-do-programador',
  'halloween',
  'natal',
] as const

export type SeasonId = (typeof SEASON_IDS)[number]

export const SEASON_NAMES: Record<SeasonId, { 'pt-BR': string; 'en-US': string }> = {
  base: { 'pt-BR': 'Padrão', 'en-US': 'Default' },
  'ano-novo': { 'pt-BR': 'Ano Novo', 'en-US': 'New Year' },
  carnaval: { 'pt-BR': 'Carnaval', 'en-US': 'Carnival' },
  pascoa: { 'pt-BR': 'Páscoa', 'en-US': 'Easter' },
  'festa-junina': { 'pt-BR': 'Festa Junina', 'en-US': 'June Festival' },
  'dia-do-programador': { 'pt-BR': 'Dia do Programador', 'en-US': "Programmer's Day" },
  halloween: { 'pt-BR': 'Halloween', 'en-US': 'Halloween' },
  natal: { 'pt-BR': 'Natal', 'en-US': 'Christmas' },
}

/**
 * Season for a calendar date (month 1-12). Self-contained on purpose: its
 * source is also inlined in the page <head> (see `seasonInlineScript`), so it
 * must not reference anything outside its own body.
 */
export function seasonIdFor(year: number, month: number, day: number): SeasonId {
  // Day of the year (1-366) for a date of `year`.
  function dayOfYear(m: number, d: number): number {
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let total = d
    for (let i = 0; i < m - 1; i++) total += days[i]
    return total
  }
  // Gregorian Easter Sunday (anonymous algorithm, Meeus/Jones/Butcher).
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d4 = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d4 - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31)
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1
  const easter = dayOfYear(easterMonth, easterDay)

  const today = dayOfYear(month, day)

  if ((month === 12 && day >= 26) || (month === 1 && day <= 6)) return 'ano-novo'
  if (today >= easter - 51 && today <= easter - 46) return 'carnaval'
  if (today >= easter - 7 && today <= easter) return 'pascoa'
  if (month === 6) return 'festa-junina'
  if (today === 256) return 'dia-do-programador'
  if (month === 10 && day >= 24) return 'halloween'
  if (month === 12 && day <= 25) return 'natal'
  return 'base'
}

/** Season for a Date, using the date's local calendar day. */
export function getSeason(date: Date = new Date()): SeasonId {
  return seasonIdFor(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

/**
 * Script for the page <head>: sets `data-season` on <html> from the visitor's
 * local date before the first paint, so statically cached pages still switch
 * season on the right day without a flash.
 */
export const seasonInlineScript = `(function(){try{var d=new Date();document.documentElement.setAttribute('data-season',(${seasonIdFor.toString()})(d.getFullYear(),d.getMonth()+1,d.getDate()))}catch(e){}})()`
