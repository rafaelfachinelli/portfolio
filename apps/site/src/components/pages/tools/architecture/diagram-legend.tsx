import { MousePointerClick, TriangleAlert } from 'lucide-react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import type { Architecture, EdgeKind } from '@/lib/tools/architecture/rules'

import { EDGE_STYLE } from './edge-styles'

const KIND_ORDER: EdgeKind[] = [
  'request',
  'async',
  'replication',
  'live',
  'assets',
]

/** The kinds of flow present in the diagram, and the failure mark. */
export function DiagramLegend({
  copy,
  architecture,
}: Readonly<{ copy: ArchitectureCopy; architecture: Architecture }>) {
  const kinds = KIND_ORDER.filter(kind =>
    architecture.edges.some(edge => edge.kind === kind),
  )
  const hasSpof = architecture.nodes.some(node => node.spof)

  return (
    <div className="text-ink-muted flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
      <span className="sr-only">{copy.ui.legend}</span>
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
          <TriangleAlert className="text-warning size-3.5" aria-hidden="true" />
          {copy.ui.spof}
        </span>
      )}
      <span className="inline-flex items-center gap-1.5 sm:ml-auto">
        <MousePointerClick className="size-3.5" aria-hidden="true" />
        {copy.ui.panelEmpty}
      </span>
    </div>
  )
}
