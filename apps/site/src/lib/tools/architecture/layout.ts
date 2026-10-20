import type { Architecture, NodeId } from './rules'

// Boxes sit in fixed layers, so positions follow from the architecture and no
// layout library is needed. "horizontal" flows left to right (desktop),
// "vertical" top to bottom (phone).

export type Direction = 'horizontal' | 'vertical'

/** Layers in flow order; within a layer, boxes keep this order. */
const LAYERS: NodeId[][] = [
  ['users'],
  ['dns', 'waf', 'cdn'],
  ['lb'],
  ['gateway', 'realtime'],
  ['app', 'services'],
  ['pubsub', 'cache', 'queue', 'workers'],
  // The primary database sits between its copies, so each replication arrow
  // goes straight to its neighbor.
  ['replica', 'db', 'standby', 'search', 'storage'],
  ['region2'],
]

/** Pieces that serve everything, drawn apart in a row of their own. */
const CROSS_CUTTING: NodeId[] = ['observability', 'secrets', 'audit']

/** The flow layers present in an architecture, without the cross-cutting row. */
export function flowLayers(architecture: Architecture): NodeId[][] {
  const present = new Set(architecture.nodes.map(node => node.id))
  return LAYERS.map(layer => layer.filter(id => present.has(id))).filter(
    layer => layer.length > 0,
  )
}

export const NODE_WIDTH = 184
export const NODE_HEIGHT = 66

const SPACING = {
  horizontal: { layer: 232, item: 92 },
  vertical: { layer: 124, item: 208 },
}

/** main: along the flow; side: to the next box in the same layer; back: to the previous one. */
export type Handle = 'main' | 'side' | 'back'

export type Layout = {
  positions: Partial<Record<NodeId, { x: number; y: number }>>
  /** Which side of each box an edge leaves from and arrives at. */
  handles: Record<string, { source: Handle; target: Handle }>
}

export function layoutArchitecture(
  architecture: Architecture,
  direction: Direction,
): Layout {
  const present = new Set(architecture.nodes.map(node => node.id))
  const layers = flowLayers(architecture)
  const spacing = SPACING[direction]
  const positions: Layout['positions'] = {}
  const layerOf = new Map<NodeId, number>()
  const orderOf = new Map<NodeId, number>()

  // Along the flow: the layer index. Across it: centered on the middle line.
  const place = (id: NodeId, along: number, across: number) => {
    positions[id] =
      direction === 'horizontal'
        ? { x: along, y: across }
        : { x: across, y: along }
  }

  let deepest = 0
  layers.forEach((layer, layerIndex) => {
    layer.forEach((id, index) => {
      const across = (index - (layer.length - 1) / 2) * spacing.item
      place(id, layerIndex * spacing.layer, across)
      layerOf.set(id, layerIndex)
      orderOf.set(id, index)
      deepest = Math.max(deepest, across)
    })
  })

  // Cross-cutting pieces: a row past the deepest box, centered on the flow.
  const crossCutting = CROSS_CUTTING.filter(id => present.has(id))
  const flowLength = (layers.length - 1) * spacing.layer
  const crossGap = direction === 'horizontal' ? NODE_WIDTH + 56 : spacing.item
  crossCutting.forEach((id, index) => {
    const along =
      flowLength / 2 + (index - (crossCutting.length - 1) / 2) * crossGap
    const across = deepest + spacing.item * 1.15
    place(id, along, across)
    layerOf.set(id, -1)
  })

  const handles: Layout['handles'] = {}
  for (const edge of architecture.edges) {
    const sameLayer = layerOf.get(edge.from) === layerOf.get(edge.to)
    const backwards =
      (orderOf.get(edge.to) ?? 0) < (orderOf.get(edge.from) ?? 0)
    const side: Handle = backwards ? 'back' : 'side'
    handles[edge.id] = sameLayer
      ? { source: side, target: side }
      : { source: 'main', target: 'main' }
  }

  return { positions, handles }
}
