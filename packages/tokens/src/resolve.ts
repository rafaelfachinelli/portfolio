import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** A flattened token: dotted path, DTCG type and resolved value. */
export interface FlatToken {
  path: string
  type: string
  value: unknown
  description?: string
}

type TokenTree = Record<string, unknown>

const tokensDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'tokens')

function readJson(relative: string): TokenTree {
  return JSON.parse(fs.readFileSync(path.join(tokensDir, relative), 'utf8')) as TokenTree
}

interface Resolver {
  sets: Record<string, { sources: { $ref: string }[] }>
  modifiers: Record<string, { contexts: Record<string, { $ref: string }[]>; default: string }>
}

export const resolver = readJson('resolver.json') as unknown as Resolver

/** Walks a DTCG tree, inheriting `$type` from groups, and returns leaf tokens. */
function flatten(tree: TokenTree, prefix: string[] = [], inheritedType?: string): FlatToken[] {
  const groupType = (tree.$type as string | undefined) ?? inheritedType
  const out: FlatToken[] = []
  for (const [key, node] of Object.entries(tree)) {
    if (key.startsWith('$') || node === null || typeof node !== 'object') continue
    const child = node as TokenTree
    if ('$value' in child) {
      out.push({
        path: [...prefix, key].join('.'),
        type: (child.$type as string | undefined) ?? groupType ?? 'unknown',
        value: child.$value,
        description: child.$description as string | undefined,
      })
    } else {
      out.push(...flatten(child, [...prefix, key], groupType))
    }
  }
  return out
}

/** Resolves `{a.b.c}` references against the given tokens (repeatedly, for chains). */
function resolveReferences(tokens: FlatToken[]): FlatToken[] {
  const byPath = new Map(tokens.map(t => [t.path, t]))
  const resolveValue = (value: unknown, seen: Set<string>): unknown => {
    if (typeof value !== 'string') return value
    const match = /^\{([^}]+)\}$/.exec(value)
    if (!match) return value
    const target = byPath.get(match[1])
    if (!target) throw new Error(`Unknown token reference ${value}`)
    if (seen.has(target.path)) throw new Error(`Circular token reference at ${target.path}`)
    return resolveValue(target.value, new Set([...seen, target.path]))
  }
  return tokens.map(t => ({ ...t, value: resolveValue(t.value, new Set([t.path])) }))
}

/** Tokens of the base set plus one season context, in resolver order. */
export function resolveTokens(season: string = resolver.modifiers.season.default): FlatToken[] {
  const sources = [
    ...resolver.sets.base.sources,
    ...(resolver.modifiers.season.contexts[season] ?? []),
  ]
  const merged = new Map<string, FlatToken>()
  for (const source of sources) {
    for (const token of flatten(readJson(source.$ref))) merged.set(token.path, token)
  }
  return resolveReferences([...merged.values()])
}

export const seasonContexts = Object.keys(resolver.modifiers.season.contexts)
