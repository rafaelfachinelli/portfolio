import type { NodeId } from './rules'

// How each box is drawn: a color by category (what kind of piece it is) and a
// shape by type (a database is a cylinder, a queue holds messages, a topic is a
// pipe). Colors are the Datum palette, written out so the preview images
// (Satori) and Mermaid can use them too.

export type NodeCategory =
  | 'client'
  | 'entry'
  | 'compute'
  | 'messaging'
  | 'data'
  | 'support'

export type NodeShape =
  | 'pill' // people
  | 'hexagon' // entry and network
  | 'rect' // compute
  | 'queue' // a box holding messages in line
  | 'pipe' // a topic: a horizontal cylinder
  | 'chip' // in-memory cache
  | 'cylinder' // databases and indexes
  | 'bucket' // object storage
  | 'group' // a whole copy of the system (second region)

export const CATEGORY_ORDER: NodeCategory[] = [
  'entry',
  'compute',
  'messaging',
  'data',
  'support',
]

export const CATEGORY_COLOR: Record<NodeCategory, string> = {
  client: '#a3b3cc', // slate-300
  entry: '#6366f1', // indigo-500
  compute: '#38bdf8', // sky-400
  messaging: '#fbbf24', // amber-400
  data: '#4ade80', // green-400
  support: '#8494b0', // slate-400
}

export const NODE_CATEGORY: Record<NodeId, NodeCategory> = {
  users: 'client',
  dns: 'entry',
  waf: 'entry',
  cdn: 'entry',
  lb: 'entry',
  realtime: 'entry',
  gateway: 'entry',
  app: 'compute',
  services: 'compute',
  workers: 'compute',
  region2: 'compute',
  queue: 'messaging',
  pubsub: 'messaging',
  cache: 'data',
  db: 'data',
  replica: 'data',
  standby: 'data',
  search: 'data',
  storage: 'data',
  observability: 'support',
  secrets: 'support',
  audit: 'support',
}

export const NODE_SHAPE: Record<NodeId, NodeShape> = {
  users: 'pill',
  dns: 'hexagon',
  waf: 'hexagon',
  cdn: 'hexagon',
  lb: 'hexagon',
  realtime: 'hexagon',
  gateway: 'hexagon',
  app: 'rect',
  services: 'rect',
  workers: 'rect',
  region2: 'group',
  queue: 'queue',
  pubsub: 'pipe',
  cache: 'chip',
  db: 'cylinder',
  replica: 'cylinder',
  standby: 'cylinder',
  search: 'cylinder',
  storage: 'bucket',
  observability: 'rect',
  secrets: 'rect',
  audit: 'rect',
}

/** Support pieces and the second region are drawn dashed: they sit beside the flow. */
export function isDashed(id: NodeId) {
  return NODE_CATEGORY[id] === 'support' || NODE_SHAPE[id] === 'group'
}
