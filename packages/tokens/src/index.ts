export { contrastRatio, parseHex, relativeLuminance } from './contrast'
export {
  getSeason,
  SEASON_IDS,
  SEASON_NAMES,
  type SeasonId,
  seasonIdFor,
  seasonInlineScript,
} from './seasons'

/** CSS custom property name of a token path, e.g. `color.board` -> `--datum-color-board`. */
export function cssVar(path: string): string {
  return `--datum-${path.replaceAll('.', '-')}`
}
