import type { ArchitectureCopy } from '@/content/tools/architecture'

import { type Answers, QUESTION_IDS } from './questions'
import {
  type Architecture,
  type ArchNode,
  type EdgeKind,
  NODE_COST,
  type NodeId,
} from './rules'

// Text exports of an architecture: Mermaid (renders as a diagram on GitHub,
// GitLab, Notion) and an ADR draft in Markdown.

const MERMAID_ARROW: Record<EdgeKind, string> = {
  request: '-->',
  async: '-.->',
  replication: '==>',
  live: '<-->',
  assets: '-->',
}

const CROSS_CUTTING = new Set(['observability', 'secrets', 'audit'])

function nodeLabel(node: ArchNode, copy: ArchitectureCopy) {
  const tags = node.tags.map(tag => copy.tags[tag])
  const name = copy.nodes[node.id].name
  return tags.length > 0 ? `${name} (${tags.join(', ')})` : name
}

const quote = (text: string) => `"${text.replaceAll('"', '#quot;')}"`

export function toMermaid(
  architecture: Architecture,
  copy: ArchitectureCopy,
): string {
  const lines = ['flowchart LR']
  const flow = architecture.nodes.filter(node => !CROSS_CUTTING.has(node.id))
  const crossCutting = architecture.nodes.filter(node =>
    CROSS_CUTTING.has(node.id),
  )

  for (const node of flow) {
    const label = quote(nodeLabel(node, copy))
    lines.push(
      node.id === 'db' || node.id === 'replica' || node.id === 'standby'
        ? `  ${node.id}[(${label})]`
        : `  ${node.id}[${label}]`,
    )
  }
  for (const edge of architecture.edges) {
    lines.push(`  ${edge.from} ${MERMAID_ARROW[edge.kind]} ${edge.to}`)
  }
  if (crossCutting.length > 0) {
    lines.push('  subgraph cross[" "]')
    for (const node of crossCutting) {
      lines.push(`    ${node.id}[${quote(nodeLabel(node, copy))}]`)
    }
    lines.push('  end')
  }
  return lines.join('\n')
}

const BASE_NODES = new Set<NodeId>(['app', 'db', 'observability'])

const REFERENCES = {
  adr: 'https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions',
  monolith: 'https://martinfowler.com/bliki/MonolithFirst.html',
  sre: 'https://sre.google/sre-book/embracing-risk/',
}

/**
 * An architecture decision record (after Michael Nygard): context written from
 * the answers, the decision and why each piece is in, pros and cons, when to
 * revisit what was left out, and references.
 */
export function toAdr(
  architecture: Architecture,
  answers: Answers,
  copy: ArchitectureCopy,
  { date, url, articleUrl }: { date: string; url: string; articleUrl?: string },
): string {
  const { adr } = copy
  const nodes = architecture.nodes.filter(node => node.id !== 'users')
  const name = (node: ArchNode) => copy.nodes[node.id].name

  const context = QUESTION_IDS.reduce(
    (text, question) =>
      text.replace(`{${question}}`, adr.phrases[question][answers[question]]),
    adr.contextText,
  )
  const answerLines = QUESTION_IDS.map(question => {
    const entry = copy.questions[question]
    return `- ${entry.title} ${entry.options[answers[question]].title}`
  })

  const pieces = new Intl.ListFormat(adr.lang, { type: 'conjunction' }).format(
    nodes.map(node => nodeLabel(node, copy)),
  )
  const whyLines = nodes.map(node => {
    // Base pieces are always there; their answers only add tags to them.
    const reasons =
      node.reasons.length === 0 || BASE_NODES.has(node.id)
        ? copy.ui.panelBase
        : `${adr.reasonPrefix}: ${node.reasons
            .map(question => {
              const entry = copy.questions[question]
              return `${entry.title} ${entry.options[answers[question]].title}`
            })
            .join('; ')}`
    return `- **${name(node)}** (${copy.costs[NODE_COST[node.id]].toLowerCase()}): ${copy.nodes[node.id].what} ${reasons}`
  })

  const pros = nodes.map(
    node => `- **${name(node)}**: ${copy.nodes[node.id].pro}`,
  )
  const cons = [
    ...nodes
      .filter(node => node.spof)
      .map(
        node =>
          `- **${name(node)}** (${copy.ui.spof.toLowerCase()}): ${copy.nodes[node.id].ifFails}`,
      ),
    ...nodes.map(node => `- **${name(node)}**: ${copy.nodes[node.id].con}`),
    ...architecture.notes.map(note => `- ${copy.notes[note]}`),
  ]
  const revisit = architecture.notNeeded
    .filter(id => copy.notNeeded[id])
    .map(id => `- **${copy.nodes[id].name}**: ${copy.notNeeded[id]}`)

  const references = [
    `- [${adr.referenceTool}](${url})`,
    ...(articleUrl ? [`- [${adr.referenceArticle}](${articleUrl})`] : []),
    `- [${adr.referenceAdr}](${REFERENCES.adr})`,
    `- [${adr.referenceMonolith}](${REFERENCES.monolith})`,
    `- [${adr.referenceSre}](${REFERENCES.sre})`,
  ]

  return [
    `# ${adr.title}`,
    '',
    `- ${adr.status}`,
    `- ${adr.date}: ${date}`,
    '',
    `## ${adr.context}`,
    '',
    context,
    '',
    `### ${adr.answers}`,
    '',
    ...answerLines,
    '',
    `## ${adr.decision}`,
    '',
    adr.decisionText.replace('{pieces}', pieces),
    '',
    `### ${adr.why}`,
    '',
    ...whyLines,
    '',
    `### ${adr.diagram}`,
    '',
    '```mermaid',
    toMermaid(architecture, copy),
    '```',
    '',
    `## ${adr.consequences}`,
    '',
    `### ${adr.pros}`,
    '',
    ...pros,
    '',
    `### ${adr.cons}`,
    '',
    ...cons,
    '',
    `## ${adr.revisit}`,
    '',
    ...(revisit.length > 0 ? revisit : [`- ${adr.revisitEmpty}`]),
    '',
    `## ${adr.references}`,
    '',
    ...references,
    '',
    '---',
    '',
    `_${adr.footer}_`,
    '',
  ].join('\n')
}
