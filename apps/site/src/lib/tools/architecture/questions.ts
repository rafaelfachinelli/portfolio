// The questionnaire: question ids, their options (in display order) and the
// defaults. The texts live in `@/content/tools/architecture`; this module only
// holds the values the rules read.

export const QUESTIONS = {
  kind: ['content', 'saas', 'mobileApi', 'store', 'realtime'],
  users: ['u100', 'u1k', 'u10k', 'u100k', 'u1m'],
  uptime: ['some', 'little', 'minimal', 'region'],
  load: ['read', 'balanced', 'write'],
  live: ['none', 'push', 'twoWay'],
  jobs: ['none', 'some', 'heavy'],
  files: ['none', 'some', 'many'],
  search: ['none', 'filters', 'fullText'],
  reach: ['country', 'global'],
  team: ['small', 'teams'],
  sensitive: ['no', 'yes'],
} as const

export type QuestionId = keyof typeof QUESTIONS

export type Answers = {
  [Q in QuestionId]: (typeof QUESTIONS)[Q][number]
}

/** Questions in display order. */
export const QUESTION_IDS = Object.keys(QUESTIONS) as QuestionId[]

export const DEFAULT_ANSWERS: Answers = {
  kind: 'saas',
  users: 'u100',
  uptime: 'some',
  load: 'balanced',
  live: 'none',
  jobs: 'none',
  files: 'none',
  search: 'filters',
  reach: 'country',
  team: 'small',
  sensitive: 'no',
}

export const PRESET_IDS = ['blog', 'saas', 'store', 'chat', 'video'] as const
export type PresetId = (typeof PRESET_IDS)[number]

/** One-click starting points. Every answer is set, so a preset is a full state. */
export const PRESETS: Record<PresetId, Answers> = {
  blog: {
    kind: 'content',
    users: 'u1k',
    uptime: 'some',
    load: 'read',
    live: 'none',
    jobs: 'none',
    files: 'some',
    search: 'filters',
    reach: 'country',
    team: 'small',
    sensitive: 'no',
  },
  saas: {
    kind: 'saas',
    users: 'u1k',
    uptime: 'little',
    load: 'balanced',
    live: 'push',
    jobs: 'some',
    files: 'some',
    search: 'filters',
    reach: 'country',
    team: 'small',
    sensitive: 'yes',
  },
  store: {
    kind: 'store',
    users: 'u100k',
    uptime: 'minimal',
    load: 'read',
    live: 'none',
    jobs: 'some',
    files: 'some',
    search: 'fullText',
    reach: 'country',
    team: 'teams',
    sensitive: 'yes',
  },
  chat: {
    kind: 'realtime',
    users: 'u10k',
    uptime: 'little',
    load: 'write',
    live: 'twoWay',
    jobs: 'some',
    files: 'some',
    search: 'none',
    reach: 'global',
    team: 'small',
    sensitive: 'no',
  },
  video: {
    kind: 'content',
    users: 'u1m',
    uptime: 'region',
    load: 'read',
    live: 'push',
    jobs: 'heavy',
    files: 'many',
    search: 'fullText',
    reach: 'global',
    team: 'teams',
    sensitive: 'no',
  },
}

/** Position of an answer in its option list (0-based), for comparisons. */
export function level<Q extends QuestionId>(answers: Answers, question: Q) {
  return (QUESTIONS[question] as readonly string[]).indexOf(answers[question])
}
