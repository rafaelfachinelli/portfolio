import type { Architecture, NodeId } from './rules'

// Scenarios play a request through the diagram, one step at a time. Each step
// lights some edges (in their direction, or reversed for a response) and has a
// caption key; the texts live in `@/content/tools/architecture`.

export const SCENARIO_IDS = ['read', 'write', 'upload', 'live', 'job'] as const
export type ScenarioId = (typeof SCENARIO_IDS)[number]

export type ScenarioStep = {
  /** Caption key, unique within the scenario. */
  key: string
  edges: string[]
  /** The data flows against the edge's arrow (a response). */
  reverse?: boolean
}

export type Scenario = { id: ScenarioId; steps: ScenarioStep[] }

export function buildScenarios(architecture: Architecture): Scenario[] {
  const has = (id: NodeId) => architecture.nodes.some(node => node.id === id)
  const edgeIds = new Set(architecture.edges.map(edge => edge.id))
  const edge = (from: NodeId, to: NodeId) =>
    edgeIds.has(`${from}->${to}`) ? [`${from}->${to}`] : []
  const compute: NodeId = has('services') ? 'services' : 'app'

  // The request path, as the rules built it.
  const path: NodeId[] = [
    'users',
    ...(['dns', 'waf', 'lb', 'gateway'] as NodeId[]).filter(has),
    compute,
  ]
  const pathEdges = path.slice(1).map((to, index) => `${path[index]}->${to}`)
  const hops: ScenarioStep[] = path
    .slice(1)
    .map((to, index) => ({ key: `via-${to}`, edges: [pathEdges[index]] }))
  const arrive: ScenarioStep = { key: 'arrive', edges: pathEdges }
  const respond: ScenarioStep = {
    key: 'respond',
    edges: [...pathEdges].reverse(),
    reverse: true,
  }

  const read: ScenarioStep[] = [
    ...(has('cdn') ? [{ key: 'cdn-assets', edges: edge('users', 'cdn') }] : []),
    ...hops,
    ...(has('cache') ? [{ key: 'cache', edges: edge(compute, 'cache') }] : []),
    has('replica')
      ? { key: 'read-replica', edges: edge(compute, 'replica') }
      : { key: 'read-db', edges: edge(compute, 'db') },
    respond,
  ]

  const replication = [
    ...edge('db', 'standby'),
    ...edge('db', 'replica'),
    ...edge('db', 'region2'),
  ]
  const write: ScenarioStep[] = [
    arrive,
    { key: 'write-db', edges: edge(compute, 'db') },
    ...(replication.length > 0
      ? [{ key: 'replicate', edges: replication }]
      : []),
    ...(has('cache')
      ? [{ key: 'invalidate', edges: edge(compute, 'cache') }]
      : []),
    ...(has('search')
      ? [
          { key: 'enqueue-index', edges: edge(compute, 'queue') },
          {
            key: 'index',
            edges: [...edge('queue', 'workers'), ...edge('workers', 'search')],
          },
        ]
      : []),
    respond,
  ]

  const scenarios: Scenario[] = [
    { id: 'read', steps: read },
    { id: 'write', steps: write },
  ]

  if (has('storage')) {
    scenarios.push({
      id: 'upload',
      steps: [
        { ...arrive, key: 'ask-upload' },
        { key: 'signed-url', edges: edge(compute, 'storage') },
        { ...respond, key: 'return-url' },
        { key: 'direct-upload', edges: edge('users', 'storage') },
        ...(has('workers')
          ? [
              { key: 'enqueue-media', edges: edge(compute, 'queue') },
              {
                key: 'process-media',
                edges: [
                  ...edge('queue', 'workers'),
                  ...edge('workers', 'storage'),
                ],
              },
            ]
          : []),
        ...(has('cdn')
          ? [
              {
                key: 'serve-cdn',
                edges: [...edge('users', 'cdn'), ...edge('cdn', 'storage')],
              },
            ]
          : []),
      ],
    })
  }

  if (has('realtime')) {
    const connect = has('lb')
      ? edge('lb', 'realtime')
      : edge('users', 'realtime')
    // With a load balancer, the connection goes through the entry pieces first.
    const toBalancer = has('lb') ? pathEdges.slice(0, path.indexOf('lb')) : []
    scenarios.push({
      id: 'live',
      steps: [
        { key: 'connect', edges: [...toBalancer, ...connect] },
        { key: 'publish', edges: edge('realtime', 'pubsub') },
        {
          key: 'fan-out',
          edges: [
            ...edge('realtime', 'pubsub'),
            ...connect,
            ...[...toBalancer].reverse(),
          ],
          reverse: true,
        },
        { key: 'server-event', edges: edge(compute, 'pubsub') },
      ],
    })
  }

  if (has('queue')) {
    scenarios.push({
      id: 'job',
      steps: [
        arrive,
        { key: 'enqueue', edges: edge(compute, 'queue') },
        { ...respond, key: 'respond-early' },
        { key: 'consume', edges: edge('queue', 'workers') },
        { key: 'job-write', edges: edge('workers', 'db') },
      ],
    })
  }

  // Steps without edges (a piece missing) are dropped.
  return scenarios.map(scenario => ({
    ...scenario,
    steps: scenario.steps.filter(step => step.edges.length > 0),
  }))
}
