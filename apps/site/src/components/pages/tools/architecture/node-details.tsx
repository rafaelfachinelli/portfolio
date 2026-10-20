import { Badge, Button, Card, CardContent } from '@datum/ui'
import { TriangleAlert, X } from 'lucide-react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import type { Answers } from '@/lib/tools/architecture/questions'
import { type ArchNode, NODE_COST } from '@/lib/tools/architecture/rules'

import { NODE_ICONS } from './node-icons'

const COST_VARIANT = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const

/** Why the selected box is there, what it costs, when it is too much. */
export function NodeDetails({
  copy,
  answers,
  node,
  onClose,
  className,
}: Readonly<{
  copy: ArchitectureCopy
  answers: Answers
  node: ArchNode | null
  onClose: () => void
  className?: string
}>) {
  if (!node) return null

  const text = copy.nodes[node.id]
  const Icon = NODE_ICONS[node.id]
  const isUsers = node.id === 'users'
  const cost = NODE_COST[node.id]

  return (
    <Card aria-live="polite" className={className}>
      <CardContent className="grid gap-3 text-sm">
        <div className="flex items-start gap-3">
          <span className="bg-well text-season-accent grid size-9 shrink-0 place-items-center rounded-[var(--datum-radius-sm)]">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="grid flex-1 gap-1">
            <h3 className="font-display text-base leading-tight font-bold">
              {text.name}
            </h3>
            {node.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {node.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {copy.tags[tag]}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            aria-label={copy.ui.panelClose}
            onClick={onClose}
          >
            <X />
          </Button>
        </div>

        <p>{text.what}</p>

        {!isUsers && (
          <dl className="grid gap-3">
            <div className="grid gap-1">
              <dt className="text-ink-muted font-mono text-xs uppercase">
                {copy.ui.panelWhy}
              </dt>
              <dd>
                {node.reasons.length === 0 ? (
                  copy.ui.panelBase
                ) : (
                  <ul className="grid gap-0.5">
                    {node.reasons.map(question => (
                      <li key={question}>
                        {copy.questions[question].title}{' '}
                        <strong className="text-season-accent font-semibold">
                          {
                            copy.questions[question].options[answers[question]]
                              .title
                          }
                        </strong>
                      </li>
                    ))}
                  </ul>
                )}
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-ink-muted font-mono text-xs uppercase">
                {copy.ui.panelCost}
              </dt>
              <dd>
                <Badge variant={COST_VARIANT[cost]}>{copy.costs[cost]}</Badge>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-ink-muted font-mono text-xs uppercase">
                {copy.ui.panelTooMuch}
              </dt>
              <dd>{text.tooMuch}</dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-ink-muted font-mono text-xs uppercase">
                {copy.ui.panelIfFails}
              </dt>
              <dd className="flex gap-2">
                {node.spof && (
                  <TriangleAlert
                    className="text-warning mt-0.5 size-4 shrink-0"
                    aria-label={copy.ui.spof}
                  />
                )}
                {text.ifFails}
              </dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  )
}
