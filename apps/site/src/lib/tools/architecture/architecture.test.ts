import { describe, expect, it } from 'vitest'

import { architectureCopy } from '@/content/tools/architecture'

import { decodeAnswers, encodeAnswers } from './code'
import { toAdr, toMermaid } from './export'
import { layoutArchitecture } from './layout'
import {
  type Answers,
  DEFAULT_ANSWERS,
  PRESET_IDS,
  PRESETS,
  QUESTION_IDS,
  QUESTIONS,
} from './questions'
import { buildArchitecture, type NodeId } from './rules'
import { buildScenarios } from './scenarios'

const build = (changes: Partial<Answers> = {}) =>
  buildArchitecture({ ...DEFAULT_ANSWERS, ...changes })
const ids = (changes: Partial<Answers> = {}) =>
  build(changes).nodes.map(node => node.id)
const node = (changes: Partial<Answers>, id: NodeId) =>
  build(changes).nodes.find(item => item.id === id)

describe('base architecture', () => {
  it('is one application, one database and observability', () => {
    expect(ids()).toEqual(['users', 'app', 'db', 'observability'])
  })

  it('marks the single application and database as single points of failure', () => {
    expect(node({}, 'app')?.spof).toBe(true)
    expect(node({}, 'db')?.spof).toBe(true)
  })

  it('lists what is not needed yet', () => {
    expect(build().notNeeded).toEqual([
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
    ])
  })
})

describe('rules', () => {
  it('adds a load balancer and copies from 1,000 people at once', () => {
    expect(ids({ users: 'u1k' })).toContain('lb')
    expect(node({ users: 'u1k' }, 'app')?.tags).toContain('instances')
    expect(node({ users: 'u1k' }, 'app')?.spof).toBe(false)
    expect(node({ users: 'u1k' }, 'lb')?.reasons).toEqual(['users'])
  })

  it('adds a load balancer when downtime must be little', () => {
    expect(node({ uptime: 'little' }, 'lb')?.reasons).toEqual(['uptime'])
  })

  it('adds a cache from 10,000 people, or from 1,000 when mostly reading', () => {
    expect(ids({ users: 'u1k' })).not.toContain('cache')
    expect(ids({ users: 'u10k' })).toContain('cache')
    expect(ids({ users: 'u1k', load: 'read' })).toContain('cache')
  })

  it('adds read replicas when mostly reading with 10,000 people', () => {
    expect(ids({ users: 'u10k', load: 'balanced' })).not.toContain('replica')
    expect(ids({ users: 'u10k', load: 'read' })).toContain('replica')
    expect(ids({ users: 'u1m', load: 'balanced' })).toContain('replica')
    expect(ids({ users: 'u1m', load: 'write' })).not.toContain('replica')
  })

  it('spreads over zones with a standby database at 99.99%', () => {
    const app = node({ uptime: 'minimal' }, 'app')
    expect(app?.tags).toEqual(expect.arrayContaining(['instances', 'zones']))
    expect(ids({ uptime: 'minimal' })).toContain('standby')
    expect(node({ uptime: 'minimal' }, 'db')?.spof).toBe(false)
  })

  it('adds a second region and global routing to survive a region', () => {
    const architecture = build({ uptime: 'region' })
    expect(architecture.nodes.map(item => item.id)).toEqual(
      expect.arrayContaining(['dns', 'region2', 'standby']),
    )
    expect(architecture.notes).toContain('multiRegion')
  })

  it('adds a CDN for content, stores, global reach or many files', () => {
    expect(ids({ kind: 'content' })).toContain('cdn')
    expect(ids({ kind: 'store' })).toContain('cdn')
    expect(ids({ reach: 'global' })).toContain('cdn')
    expect(ids({ files: 'many' })).toContain('cdn')
    expect(ids({ kind: 'saas' })).not.toContain('cdn')
  })

  it('adds object storage for user files', () => {
    expect(ids({ files: 'some' })).toContain('storage')
    expect(ids({ files: 'none' })).not.toContain('storage')
  })

  it('adds a queue and workers for background work, full search or many files', () => {
    for (const changes of [
      { jobs: 'some' },
      { search: 'fullText' },
      { files: 'many' },
    ] as Partial<Answers>[]) {
      expect(ids(changes)).toEqual(expect.arrayContaining(['queue', 'workers']))
    }
    expect(ids()).not.toContain('queue')
  })

  it('adds a real-time gateway and pub/sub for two-way updates', () => {
    expect(ids({ live: 'twoWay' })).toEqual(
      expect.arrayContaining(['realtime', 'pubsub']),
    )
    expect(ids({ kind: 'realtime', live: 'none' })).toContain('realtime')
  })

  it('pushes server events from the application for one-way updates', () => {
    expect(ids({ live: 'push' })).not.toContain('realtime')
    expect(node({ live: 'push' }, 'app')?.tags).toContain('sse')
  })

  it('adds a search engine for full text search only', () => {
    expect(ids({ search: 'fullText' })).toContain('search')
    expect(ids({ search: 'filters' })).not.toContain('search')
  })

  it('rate limits mobile APIs and large audiences', () => {
    expect(node({ kind: 'mobileApi' }, 'app')?.tags).toContain('rateLimit')
    expect(node({ users: 'u10k' }, 'lb')?.tags).toContain('rateLimit')
  })

  it('protects sensitive data', () => {
    expect(ids({ sensitive: 'yes' })).toEqual(
      expect.arrayContaining(['waf', 'secrets', 'audit']),
    )
    expect(node({ sensitive: 'yes' }, 'db')?.tags).toContain('encrypted')
  })

  it('keeps a modular monolith for one team and splits services for several', () => {
    expect(node({}, 'app')?.tags).toContain('modular')
    const teams = build({ team: 'teams' })
    expect(teams.nodes.map(item => item.id)).toEqual(
      expect.arrayContaining(['gateway', 'services', 'lb']),
    )
    expect(teams.nodes.map(item => item.id)).not.toContain('app')
    expect(teams.notes).toContain('services')
  })

  it('warns about partitioning for heavy writes at scale', () => {
    expect(build({ load: 'write', users: 'u100k' }).notes).toContain(
      'partitioning',
    )
  })

  it('only links boxes that exist', () => {
    for (const preset of PRESET_IDS) {
      const architecture = buildArchitecture(PRESETS[preset])
      const present = new Set(architecture.nodes.map(item => item.id))
      for (const edge of architecture.edges) {
        expect(present.has(edge.from) && present.has(edge.to)).toBe(true)
      }
    }
  })
})

describe('whole examples', () => {
  it('a blog stays small', () => {
    expect(buildArchitecture(PRESETS.blog).nodes.map(item => item.id)).toEqual([
      'users',
      'cdn',
      'lb',
      'app',
      'cache',
      'db',
      'storage',
      'observability',
    ])
  })

  it('a store on Black Friday gets the full read path', () => {
    const architecture = buildArchitecture(PRESETS.store)
    expect(architecture.nodes.map(item => item.id)).toEqual(
      expect.arrayContaining([
        'waf',
        'cdn',
        'lb',
        'gateway',
        'services',
        'cache',
        'replica',
        'standby',
        'search',
        'queue',
      ]),
    )
  })

  it('a chat app is real time', () => {
    expect(buildArchitecture(PRESETS.chat).nodes.map(item => item.id)).toEqual(
      expect.arrayContaining(['realtime', 'pubsub', 'queue', 'storage', 'cdn']),
    )
  })
})

describe('share code', () => {
  it('round-trips every preset and the defaults', () => {
    for (const answers of [DEFAULT_ANSWERS, ...Object.values(PRESETS)]) {
      expect(decodeAnswers(encodeAnswers(answers))).toEqual(answers)
    }
  })

  it('has one digit per question after the version', () => {
    expect(encodeAnswers(DEFAULT_ANSWERS)).toHaveLength(QUESTION_IDS.length + 1)
  })

  it('rejects malformed codes', () => {
    expect(decodeAnswers('')).toBeNull()
    expect(decodeAnswers('2' + '0'.repeat(QUESTION_IDS.length))).toBeNull()
    expect(decodeAnswers('1' + '9'.repeat(QUESTION_IDS.length))).toBeNull()
    expect(decodeAnswers('1abc')).toBeNull()
  })
})

describe('scenarios', () => {
  it('only uses edges that exist and has captions for every step', () => {
    const steps = architectureCopy['pt-BR'].steps
    for (const preset of [
      ...PRESET_IDS.map(id => PRESETS[id]),
      DEFAULT_ANSWERS,
    ]) {
      const architecture = buildArchitecture(preset)
      const edges = new Set(architecture.edges.map(edge => edge.id))
      for (const scenario of buildScenarios(architecture)) {
        expect(scenario.steps.length).toBeGreaterThan(0)
        for (const step of scenario.steps) {
          expect(steps[step.key], step.key).toBeTruthy()
          for (const edge of step.edges)
            expect(edges.has(edge), edge).toBe(true)
        }
      }
    }
  })

  it('offers upload, live and job scenarios only when their pieces exist', () => {
    const base = buildScenarios(build()).map(scenario => scenario.id)
    expect(base).toEqual(['read', 'write'])
    const chat = buildScenarios(buildArchitecture(PRESETS.chat)).map(
      scenario => scenario.id,
    )
    expect(chat).toEqual(['read', 'write', 'upload', 'live', 'job'])
  })
})

describe('layout', () => {
  it('places every box and gives every edge its handles', () => {
    for (const direction of ['horizontal', 'vertical'] as const) {
      const architecture = buildArchitecture(PRESETS.video)
      const layout = layoutArchitecture(architecture, direction)
      for (const item of architecture.nodes) {
        expect(layout.positions[item.id], item.id).toBeDefined()
      }
      for (const edge of architecture.edges) {
        expect(layout.handles[edge.id], edge.id).toBeDefined()
      }
    }
  })

  it('does not stack two boxes on the same spot', () => {
    const architecture = buildArchitecture(PRESETS.video)
    const layout = layoutArchitecture(architecture, 'horizontal')
    const spots = Object.values(layout.positions).map(
      position => `${position!.x},${position!.y}`,
    )
    expect(new Set(spots).size).toBe(spots.length)
  })
})

describe('copy', () => {
  it('has a text for every option, box, step and left-out piece in both languages', () => {
    for (const copy of Object.values(architectureCopy)) {
      for (const question of QUESTION_IDS) {
        for (const option of QUESTIONS[question]) {
          expect(copy.questions[question].options[option]?.title).toBeTruthy()
        }
      }
      for (const preset of [
        ...PRESET_IDS.map(id => PRESETS[id]),
        DEFAULT_ANSWERS,
      ]) {
        const architecture = buildArchitecture(preset)
        for (const item of architecture.nodes) {
          expect(copy.nodes[item.id].name).toBeTruthy()
        }
        for (const id of architecture.notNeeded) {
          expect(copy.notNeeded[id], id).toBeTruthy()
        }
      }
    }
  })
})

describe('exports', () => {
  const copy = architectureCopy['en-US']

  it('writes Mermaid with every box and edge', () => {
    const architecture = buildArchitecture(PRESETS.store)
    const mermaid = toMermaid(architecture, copy)
    expect(mermaid.startsWith('flowchart LR')).toBe(true)
    for (const item of architecture.nodes) expect(mermaid).toContain(item.id)
    expect(mermaid).toContain('services --> cache')
    expect(mermaid).toContain('db ==> standby')
    expect(mermaid).toContain('services -.-> queue')
  })

  it('writes an ADR with the answers, the decision and what was left out', () => {
    const adr = toAdr(build(), DEFAULT_ANSWERS, copy, {
      date: '2026-10-19',
      url: 'https://example.com/r/1',
    })
    expect(adr).toContain('# ADR: starting architecture')
    expect(adr).toContain('Date: 2026-10-19')
    expect(adr).toContain('- What kind of application? Web application')
    expect(adr).toContain('```mermaid')
    expect(adr).toContain(copy.notNeeded.cache)
    expect(adr).toContain('https://example.com/r/1')
  })
})
