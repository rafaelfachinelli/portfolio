import { MousePointerClick, TriangleAlert } from 'lucide-react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import {
  CATEGORY_COLOR,
  CATEGORY_ORDER,
  NODE_CATEGORY,
} from '@/lib/tools/architecture/categories'
import type { Architecture, EdgeKind } from '@/lib/tools/architecture/rules'

import { EDGE_STYLE } from './edge-styles'

const KIND_ORDER: EdgeKind[] = [
  'request',
  'async',
  'replication',
  'live',
  'assets',
]

/** The categories of boxes and kinds of flow in the diagram, and the failure mark. */
export function DiagramLegend({
  copy,
  architecture,
}: Readonly<{ copy: ArchitectureCopy; architecture: Architecture }>) {
  const categories = CATEGORY_ORDER.filter(category =>
    architecture.nodes.some(node => NODE_CATEGORY[node.id] === category),
  )
  const kinds = KIND_ORDER.filter(kind =>
    architecture.edges.some(edge => edge.kind === kind),
  )
  const hasSpof = architecture.nodes.some(node => node.spof)

  return (
    <div className="text-ink-muted grid gap-1.5 text-xs">
      <p className="sr-only">{copy.ui.legend}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {categories.map(category => (
          <span key={category} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-3 rounded-[3px] border-2"
              style={{
                borderColor: CATEGORY_COLOR[category],
                backgroundColor: `color-mix(in srgb, ${CATEGORY_COLOR[category]} 25%, transparent)`,
              }}
            />
            {copy.categories[category]}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {kinds.map(kind => {
          const style = EDGE_STYLE[kind]
          return (
            <span key={kind} className="inline-flex items-center gap-1.5">
              <svg width="28" height="8" aria-hidden="true">
                <line
                  x1="1"
                  y1="4"
                  x2="27"
                  y2="4"
                  stroke={style.color}
                  strokeWidth={2}
                  strokeDasharray={style.dash}
                />
              </svg>
              {copy.edges[kind]}
            </span>
          )
        })}
        {hasSpof && (
          <span className="inline-flex items-center gap-1.5">
            <TriangleAlert
              className="text-warning size-3.5"
              aria-hidden="true"
            />
            {copy.ui.spof}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 sm:ml-auto">
          <MousePointerClick className="size-3.5" aria-hidden="true" />
          {copy.ui.panelEmpty}
        </span>
      </div>
    </div>
  )
}
