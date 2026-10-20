import type { ArchitectureCopy } from '@/content/tools/architecture'

import { type Answers, QUESTION_IDS } from './questions'
import {
  type Architecture,
  type ArchNode,
  type EdgeKind,
  NODE_COST,
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

export function toAdr(
  architecture: Architecture,
  answers: Answers,
  copy: ArchitectureCopy,
  { date, url }: { date: string; url: string },
): string {
  const { adr } = copy
  const nodes = architecture.nodes.filter(node => node.id !== 'users')
  const answerLines = QUESTION_IDS.map(question => {
    const entry = copy.questions[question]
    return `- ${entry.title} ${entry.options[answers[question]].title}`
  })
  const componentLines = nodes.map(
    node => `- **${nodeLabel(node, copy)}**: ${copy.nodes[node.id].what}`,
  )
  const gains = nodes
    .filter(node => node.reasons.length > 0)
    .map(node => `- ${copy.nodes[node.id].name}: ${copy.nodes[node.id].what}`)
  const costs = [
    ...nodes
      .filter(node => node.spof)
      .map(
        node =>
          `- ${copy.ui.spof}: ${copy.nodes[node.id].name}. ${copy.nodes[node.id].ifFails}`,
      ),
    ...nodes
      .filter(node => node.reasons.length > 0)
      .map(
        node =>
          `- ${copy.nodes[node.id].name}: ${copy.costs[NODE_COST[node.id]]}.`,
      ),
    ...architecture.notes.map(note => `- ${copy.notes[note]}`),
  ]
  const leftOut = architecture.notNeeded
    .filter(id => copy.notNeeded[id])
    .map(id => `- **${copy.nodes[id].name}**: ${copy.notNeeded[id]}`)

  return [
    `# ${adr.title}`,
    '',
    adr.status,
    `${adr.date}: ${date}`,
    '',
    `## ${adr.context}`,
    '',
    `### ${adr.answers}`,
    '',
    ...answerLines,
    '',
    `## ${adr.decision}`,
    '',
    `### ${adr.components}`,
    '',
    ...componentLines,
    '',
    '```mermaid',
    toMermaid(architecture, copy),
    '```',
    '',
    `## ${adr.consequences}`,
    '',
    `### ${adr.positive}`,
    '',
    ...(gains.length > 0 ? gains : [`- ${copy.nodes.app.what}`]),
    '',
    `### ${adr.negative}`,
    '',
    ...costs,
    '',
    `## ${adr.leftOut}`,
    '',
    ...(leftOut.length > 0 ? leftOut : [`- ${copy.ui.notNeededEmpty}`]),
    '',
    '---',
    '',
    `${adr.footer}: ${url}`,
    '',
  ].join('\n')
}
