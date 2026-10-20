import { ChevronDown } from 'lucide-react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import type { Architecture } from '@/lib/tools/architecture/rules'

/** The diagram as lists, for screen readers and for copying. */
export function TextVersion({
  copy,
  architecture,
}: Readonly<{ copy: ArchitectureCopy; architecture: Architecture }>) {
  return (
    <details className="group border-line-strong rounded-[var(--datum-radius-md)] border">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold">
        {copy.ui.textVersionTitle}
        <ChevronDown
          className="size-4 transition-transform group-open:rotate-180 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </summary>
      <div className="grid gap-6 px-4 pb-4 text-sm md:grid-cols-2">
        <div className="grid content-start gap-2">
          <h3 className="font-semibold">{copy.ui.textComponents}</h3>
          <ul className="grid list-disc gap-1 pl-5">
            {architecture.nodes.map(node => (
              <li key={node.id}>
                <strong>{copy.nodes[node.id].name}</strong>
                {node.tags.length > 0 &&
                  ` (${node.tags.map(tag => copy.tags[tag]).join(', ')})`}
                {node.spof && ` · ${copy.ui.spof}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-start gap-2">
          <h3 className="font-semibold">{copy.ui.textConnections}</h3>
          <ul className="grid list-disc gap-1 pl-5">
            {architecture.edges.map(edge => (
              <li key={edge.id}>
                {copy.nodes[edge.from].name} → {copy.nodes[edge.to].name}{' '}
                <span className="text-ink-muted">
                  ({copy.edges[edge.kind]})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  )
}
