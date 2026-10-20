import type { EdgeKind } from '@/lib/tools/architecture/rules'

/** How each kind of flow is drawn; colors come from the Datum tokens. */
export const EDGE_STYLE: Record<
  EdgeKind,
  { color: string; dash?: string; width: number; seconds: number }
> = {
  request: { color: 'var(--datum-color-drafting)', width: 1.5, seconds: 2.6 },
  async: {
    color: 'var(--datum-color-highlight)',
    dash: '6 5',
    width: 1.5,
    seconds: 3.4,
  },
  replication: {
    color: 'var(--datum-color-ink-subtle)',
    dash: '2 5',
    width: 1.5,
    seconds: 4,
  },
  live: { color: 'var(--datum-color-success)', width: 1.5, seconds: 2 },
  assets: { color: 'var(--datum-color-ink-muted)', width: 1, seconds: 3 },
}

export const ACTIVE_COLOR = 'var(--datum-season-accent)'
