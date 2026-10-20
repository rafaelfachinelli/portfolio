import { type Answers, level, type QuestionId } from './questions'

// Fixed rules: the same answers always give the same architecture, and every
// box records which answers put it there. Thresholds are written once here and
// explained to the reader in `@/content/tools/architecture`.

export const NODE_IDS = [
  'users',
  'dns',
  'waf',
  'cdn',
  'lb',
  'realtime',
  'gateway',
  'app',
  'services',
  'pubsub',
  'cache',
  'queue',
  'workers',
  'db',
  'replica',
  'standby',
  'search',
  'storage',
  'region2',
  'observability',
  'secrets',
  'audit',
] as const

export type NodeId = (typeof NODE_IDS)[number]

/** Extra facts about a box, shown as small marks on it. */
export type NodeTag =
  | 'instances' // two or more copies behind the load balancer
  | 'zones' // spread over two or more availability zones
  | 'rateLimit'
  | 'sse' // pushes updates to the browser (server-sent events)
  | 'encrypted' // encryption at rest
  | 'modular' // one deployable with clear modules

export type EdgeKind = 'request' | 'async' | 'replication' | 'live' | 'assets'

export type Cost = 'low' | 'medium' | 'high'

export type ArchNode = {
  id: NodeId
  tags: NodeTag[]
  /** Questions whose answers put the box there; empty for the base pieces. */
  reasons: QuestionId[]
  /** Losing it takes the whole application down. */
  spof: boolean
}

export type ArchEdge = { id: string; from: NodeId; to: NodeId; kind: EdgeKind }

export type NoteId = 'partitioning' | 'multiRegion' | 'services'

export type Architecture = {
  nodes: ArchNode[]
  edges: ArchEdge[]
  /** Optional pieces left out, in display order. */
  notNeeded: NodeId[]
  /** Warnings that are not boxes. */
  notes: NoteId[]
}

/** Money and effort to run each piece, shown in the side panel. */
export const NODE_COST: Record<NodeId, Cost> = {
  users: 'low',
  dns: 'medium',
  waf: 'low',
  cdn: 'low',
  lb: 'low',
  realtime: 'medium',
  gateway: 'medium',
  app: 'low',
  services: 'high',
  pubsub: 'medium',
  cache: 'medium',
  queue: 'medium',
  workers: 'medium',
  db: 'medium',
  replica: 'medium',
  standby: 'medium',
  search: 'high',
  storage: 'low',
  region2: 'high',
  observability: 'low',
  secrets: 'low',
  audit: 'low',
}

/** Pieces a small application starts without; listed when left out. */
const OPTIONAL: NodeId[] = [
  'lb',
  'cache',
  'replica',
  'standby',
  'cdn',
  'queue',
  'search',
  'realtime',
  'waf',
  'services',
  'region2',
]

export function buildArchitecture(answers: Answers): Architecture {
  const users = level(answers, 'users') // 0: up to 100 … 4: more than 100,000
  const uptime = level(answers, 'uptime') // 0: some … 3: survive a region
  const reads = answers.load === 'read'
  const twoWay = answers.live === 'twoWay' || answers.kind === 'realtime'
  const teams = answers.team === 'teams'
  const sensitive = answers.sensitive === 'yes'

  const nodes = new Map<NodeId, ArchNode>()
  const add = (id: NodeId, reasons: QuestionId[] = [], tags: NodeTag[] = []) =>
    nodes.set(id, { id, reasons, tags, spof: false })

  add('users')

  // Entry: global routing, protection, load balancing.
  if (uptime >= 3) add('dns', ['uptime'])
  if (sensitive || users >= 3) {
    add('waf', [
      ...(sensitive ? ['sensitive' as const] : []),
      ...(users >= 3 ? ['users' as const] : []),
    ])
  }
  const needsBalancer = users >= 1 || uptime >= 1 || teams
  if (needsBalancer) {
    add('lb', [
      ...(users >= 1 ? ['users' as const] : []),
      ...(uptime >= 1 ? ['uptime' as const] : []),
      ...(teams && users < 1 && uptime < 1 ? ['team' as const] : []),
    ])
  }

  // Compute: one modular monolith for a small team, services for several.
  const computeTags: NodeTag[] = []
  if (needsBalancer) computeTags.push('instances')
  if (uptime >= 2) computeTags.push('zones')
  if (answers.live === 'push' && !twoWay) computeTags.push('sse')
  if (teams) {
    add('gateway', ['team'], needsBalancer ? ['instances'] : [])
    add('services', ['team'], computeTags)
  } else {
    add('app', [], ['modular', ...computeTags])
  }
  const compute: NodeId = teams ? 'services' : 'app'

  const rateLimitOn: NodeId = teams ? 'gateway' : needsBalancer ? 'lb' : 'app'
  if (answers.kind === 'mobileApi' || users >= 2) {
    const node = nodes.get(rateLimitOn)
    node?.tags.push('rateLimit')
    if (
      node &&
      !node.reasons.includes(answers.kind === 'mobileApi' ? 'kind' : 'users')
    ) {
      node.reasons.push(answers.kind === 'mobileApi' ? 'kind' : 'users')
    }
  }
  if (answers.live === 'push' && !twoWay)
    nodes.get(compute)?.reasons.push('live')

  if (twoWay) {
    add(
      'realtime',
      [answers.kind === 'realtime' ? 'kind' : 'live'],
      needsBalancer ? ['instances'] : [],
    )
    add('pubsub', [answers.kind === 'realtime' ? 'kind' : 'live'])
  }

  // Data.
  if (users >= 2 || (reads && users >= 1)) {
    add('cache', reads && users < 2 ? ['load', 'users'] : ['users'])
  }
  add('db', [], sensitive ? ['encrypted'] : [])
  if ((reads && users >= 2) || (users >= 4 && answers.load !== 'write')) {
    add('replica', reads ? ['load', 'users'] : ['users'])
  }
  if (uptime >= 2) add('standby', ['uptime'])
  if (uptime >= 3) add('region2', ['uptime'])

  if (answers.files !== 'none')
    add('storage', ['files'], sensitive ? ['encrypted'] : [])
  if (
    answers.kind === 'content' ||
    answers.kind === 'store' ||
    answers.reach === 'global' ||
    answers.files === 'many'
  ) {
    const reasons: QuestionId[] = []
    if (answers.kind === 'content' || answers.kind === 'store')
      reasons.push('kind')
    if (answers.reach === 'global') reasons.push('reach')
    if (answers.files === 'many') reasons.push('files')
    add('cdn', reasons)
  }

  // Background work.
  const needsQueue =
    answers.jobs !== 'none' ||
    answers.search === 'fullText' ||
    answers.files === 'many'
  if (needsQueue) {
    const reasons: QuestionId[] = []
    if (answers.jobs !== 'none') reasons.push('jobs')
    if (answers.search === 'fullText') reasons.push('search')
    if (answers.files === 'many') reasons.push('files')
    add('queue', reasons)
    add('workers', reasons)
  }
  if (answers.search === 'fullText') add('search', ['search'])

  // Cross-cutting.
  add('observability')
  if (sensitive) {
    add('secrets', ['sensitive'])
    add('audit', ['sensitive'])
  }

  // Single points of failure: the pieces every request needs, with one copy.
  for (const id of ['app', 'services', 'gateway'] as const) {
    const node = nodes.get(id)
    if (node && !node.tags.includes('instances')) node.spof = true
  }
  if (!nodes.has('standby')) nodes.get('db')!.spof = true

  const edges = buildEdges(nodes, compute)

  const notes: NoteId[] = []
  if (answers.load === 'write' && users >= 3) notes.push('partitioning')
  if (uptime >= 3) notes.push('multiRegion')
  if (teams) notes.push('services')

  const ordered = NODE_IDS.filter(id => nodes.has(id)).map(id => nodes.get(id)!)

  return {
    nodes: ordered,
    edges,
    notNeeded: OPTIONAL.filter(id => !nodes.has(id)),
    notes,
  }
}

function buildEdges(nodes: Map<NodeId, ArchNode>, compute: NodeId): ArchEdge[] {
  const has = (id: NodeId) => nodes.has(id)
  const edges: ArchEdge[] = []
  const link = (from: NodeId, to: NodeId, kind: EdgeKind) => {
    if (has(from) && has(to))
      edges.push({ id: `${from}->${to}`, from, to, kind })
  }

  // The request path: users, then each entry piece present, then compute.
  const entry = (['dns', 'waf', 'lb', 'gateway'] as NodeId[]).filter(has)
  const path: NodeId[] = ['users', ...entry, compute]
  for (let index = 0; index < path.length - 1; index++) {
    link(path[index], path[index + 1], 'request')
  }

  if (has('cdn')) {
    link('users', 'cdn', 'assets')
    link('cdn', 'storage', 'assets')
  }
  link('dns', 'region2', 'request')

  if (has('realtime')) {
    link(has('lb') ? 'lb' : 'users', 'realtime', 'live')
    link('realtime', 'pubsub', 'live')
    link(compute, 'pubsub', 'live')
  }

  link(compute, 'cache', 'request')
  link(compute, 'db', 'request')
  link(compute, 'replica', 'request')
  link(compute, 'search', 'request')
  link(compute, 'storage', 'request')
  link('users', 'storage', 'assets')

  link(compute, 'queue', 'async')
  link('queue', 'workers', 'async')
  link('workers', 'db', 'request')
  link('workers', 'search', 'async')
  link('workers', 'storage', 'request')

  link('db', 'replica', 'replication')
  link('db', 'standby', 'replication')
  link('db', 'region2', 'replication')

  return edges
}
