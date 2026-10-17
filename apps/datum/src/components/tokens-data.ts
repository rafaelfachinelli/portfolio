import tokens from '@datum/tokens/tokens.json'

export interface TokenEntry {
  type: string
  value: unknown
  description?: string
}

export const baseTokens = tokens.base as Record<string, TokenEntry>
export const seasonTokens = tokens.seasons as Record<string, Record<string, string>>

/** Base tokens under a path prefix, e.g. `color.` or `space.`. */
export function tokensUnder(prefix: string): [string, TokenEntry][] {
  return Object.entries(baseTokens).filter(([path]) => path.startsWith(prefix))
}

export function dimension(value: unknown): string {
  if (value && typeof value === 'object' && 'value' in value && 'unit' in value) {
    const v = value as { value: number; unit: string }
    return `${v.value}${v.unit}`
  }
  return String(value)
}
