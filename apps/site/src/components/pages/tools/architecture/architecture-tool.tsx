'use client'

import {
  Badge,
  Button,
  Callout,
  CalloutContent,
  CalloutTitle,
  Card,
  CardContent,
  RadioCard,
  RadioGroup,
} from '@datum/ui'
import { ArrowDown, Sparkles, TriangleAlert } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import { usePrefersReducedMotion } from '@/hooks/use-media-query'
import { track } from '@/lib/analytics'
import {
  type Answers,
  DEFAULT_ANSWERS,
  PRESET_IDS,
  type PresetId,
  PRESETS,
  QUESTION_IDS,
  type QuestionId,
  QUESTIONS,
} from '@/lib/tools/architecture/questions'
import { buildArchitecture, type NodeId } from '@/lib/tools/architecture/rules'
import {
  buildScenarios,
  type ScenarioId,
} from '@/lib/tools/architecture/scenarios'

import type { DiagramApi } from './architecture-diagram'
import { DiagramLegend } from './diagram-legend'
import { ExportBar } from './export-bar'
import { NodeDetails } from './node-details'
import { ScenarioPlayer } from './scenario-player'
import { TextVersion } from './text-version'

// React Flow loads in the browser, after the questions are on screen.
const ArchitectureDiagram = dynamic(() => import('./architecture-diagram'), {
  ssr: false,
  loading: () => <DiagramPlaceholder />,
})

function DiagramPlaceholder() {
  return <div className="bg-well/40 size-full animate-pulse" />
}

/** Options per row, by how long their texts are. */
const OPTION_COLUMNS: Partial<Record<QuestionId, string>> = {
  users: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-2',
  reach: 'grid-cols-2',
  team: 'grid-cols-2',
  sensitive: 'grid-cols-2',
  jobs: 'sm:grid-cols-3 lg:grid-cols-1',
  files: 'sm:grid-cols-3 lg:grid-cols-1',
  search: 'sm:grid-cols-3 lg:grid-cols-1',
}

/** Time for the data to cross one edge, and to read a step's caption. */
const HOP_MS = 900
const READ_MS = 1800

export type ArchitectureToolProps = {
  copy: ArchitectureCopy
  /** Canonical locale for links (`pt-BR` or `en-US`). */
  locale: string
  initialAnswers?: Answers
  shared?: boolean
}

export function ArchitectureTool({
  copy,
  locale,
  initialAnswers,
  shared = false,
}: Readonly<ArchitectureToolProps>) {
  const [answers, setAnswers] = useState<Answers>(
    initialAnswers ?? DEFAULT_ANSWERS,
  )
  const [preset, setPreset] = useState<PresetId | null>(null)
  const [selected, setSelected] = useState<NodeId | null>(null)
  const [scenarioId, setScenarioId] = useState<ScenarioId | null>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [diagram, setDiagram] = useState<DiagramApi | null>(null)

  const reducedMotion = usePrefersReducedMotion()

  const architecture = useMemo(() => buildArchitecture(answers), [answers])
  const scenarios = useMemo(() => buildScenarios(architecture), [architecture])
  const scenario = scenarios.find(item => item.id === scenarioId) ?? null
  const step = scenario?.steps[stepIndex] ?? null

  // A new architecture can drop the selected box or change a scenario's steps.
  useEffect(() => {
    setSelected(current =>
      current && architecture.nodes.some(node => node.id === current)
        ? current
        : null,
    )
    setStepIndex(0)
    setPlaying(false)
    setScenarioId(current =>
      current && scenarios.some(item => item.id === current) ? current : null,
    )
  }, [architecture, scenarios])

  // Within a step, the data moves one hop (one edge) at a time, so only one box
  // is lit at once. The hop belongs to the step it was counted in; a new step
  // starts again from its first hop.
  const stepKey = `${scenarioId}:${stepIndex}`
  const [hop, setHop] = useState({ key: stepKey, index: 0 })
  const hopIndex = hop.key === stepKey ? hop.index : 0
  const lastHop = (step?.edges.length ?? 1) - 1

  useEffect(() => {
    if (!step || hopIndex >= lastHop) return
    const timer = window.setTimeout(
      () => setHop({ key: stepKey, index: hopIndex + 1 }),
      HOP_MS,
    )
    return () => window.clearTimeout(timer)
  }, [step, stepKey, hopIndex, lastHop])

  // Playback: after the last hop of a step, a pause to read, then the next step.
  useEffect(() => {
    if (!playing || !scenario || hopIndex < lastHop) return
    if (stepIndex >= scenario.steps.length - 1) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(
      () => setStepIndex(index => index + 1),
      READ_MS,
    )
    return () => window.clearTimeout(timer)
  }, [playing, scenario, stepIndex, hopIndex, lastHop])

  const answer = (question: QuestionId, value: string) => {
    setAnswers(current => ({ ...current, [question]: value }))
    setPreset(null)
  }

  const applyPreset = (id: PresetId) => {
    setAnswers(PRESETS[id])
    setPreset(id)
    track('architecture-preset', { preset: id })
  }

  const chooseScenario = (id: ScenarioId) => {
    setScenarioId(id)
    setStepIndex(0)
    setPlaying(true)
    setSelected(null)
    track('architecture-scenario', { scenario: id })
  }

  const onReady = useCallback((api: DiagramApi) => setDiagram(api), [])

  return (
    <div className="grid gap-8">
      {shared && (
        <Callout tone="neutral" icon={<Sparkles />}>
          <CalloutContent className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {copy.ui.sharedNotice}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setAnswers(DEFAULT_ANSWERS)
                setPreset(null)
              }}
            >
              {copy.ui.startOver}
            </Button>
          </CalloutContent>
        </Callout>
      )}

      <section aria-labelledby="architecture-presets" className="grid gap-3">
        <h2
          id="architecture-presets"
          className="text-ink-muted font-mono text-xs tracking-widest uppercase"
        >
          {copy.presets.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {PRESET_IDS.map(id => (
            <Button
              key={id}
              size="sm"
              variant={preset === id ? 'primary' : 'outline'}
              aria-pressed={preset === id}
              onClick={() => applyPreset(id)}
            >
              {copy.presets.items[id]}
            </Button>
          ))}
          <Button asChild size="sm" variant="ghost" className="md:hidden">
            <a href="#architecture-result">
              {copy.ui.seeResult}
              <ArrowDown />
            </a>
          </Button>
        </div>
      </section>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(300px,380px)_minmax(0,1fr)]">
        <section
          aria-labelledby="architecture-questions"
          className="grid gap-6"
        >
          <h2 id="architecture-questions" className="sr-only">
            {copy.questionsTitle}
          </h2>
          {QUESTION_IDS.map((question, index) => {
            const entry = copy.questions[question]
            const titleId = `question-${question}`
            const hintId = entry.hint ? `${titleId}-hint` : undefined
            return (
              <div key={question} className="grid gap-2.5">
                <h3 id={titleId} className="text-sm font-semibold">
                  <span className="text-ink-subtle mr-2 font-mono text-xs">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {entry.title}
                </h3>
                {entry.hint && (
                  <p id={hintId} className="text-ink-muted -mt-1 text-xs">
                    {entry.hint}
                  </p>
                )}
                <RadioGroup
                  aria-labelledby={titleId}
                  aria-describedby={hintId}
                  value={answers[question]}
                  onValueChange={value => answer(question, value)}
                  className={OPTION_COLUMNS[question] ?? 'grid-cols-1'}
                >
                  {QUESTIONS[question].map(option => (
                    <RadioCard
                      key={option}
                      value={option}
                      title={entry.options[option].title}
                      description={entry.options[option].description}
                      className="py-2.5"
                    />
                  ))}
                </RadioGroup>
              </div>
            )
          })}
        </section>

        <section
          id="architecture-result"
          aria-labelledby="architecture-result-title"
          className="grid scroll-mt-20 gap-3 lg:sticky lg:top-16"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="architecture-result-title"
              className="font-display text-2xl font-bold"
            >
              {copy.ui.resultTitle}
            </h2>
            <span className="text-ink-muted font-mono text-xs">
              {copy.ui.pieces.replace(
                '{count}',
                String(architecture.nodes.length - 1),
              )}
            </span>
          </div>

          <ScenarioPlayer
            copy={copy}
            scenarios={scenarios}
            scenario={scenario}
            stepIndex={stepIndex}
            playing={playing}
            onChoose={chooseScenario}
            onPlay={() => {
              if (scenario && stepIndex >= scenario.steps.length - 1) {
                setStepIndex(0)
              }
              setPlaying(true)
            }}
            onPause={() => setPlaying(false)}
            onStep={delta => {
              setPlaying(false)
              setStepIndex(index =>
                Math.min(
                  Math.max(index + delta, 0),
                  (scenario?.steps.length ?? 1) - 1,
                ),
              )
            }}
            onStop={() => {
              setScenarioId(null)
              setPlaying(false)
              setStepIndex(0)
            }}
          />

          {/* On large screens the details float over the diagram; on phones they follow it. */}
          <div className="relative grid gap-3">
            <div
              role="group"
              aria-label={copy.ui.diagramLabel}
              className="border-line-strong bg-board relative h-[68svh] min-h-[420px] overflow-hidden rounded-[var(--datum-radius-md)] border bg-[linear-gradient(var(--datum-color-grid)_1px,transparent_1px),linear-gradient(90deg,var(--datum-color-grid)_1px,transparent_1px)] bg-[size:24px_24px] lg:h-[calc(100svh-16rem)]"
            >
              <ArchitectureDiagram
                architecture={architecture}
                copy={copy}
                direction="vertical"
                selected={selected}
                onSelect={setSelected}
                step={step}
                hop={hopIndex}
                reducedMotion={reducedMotion}
                onReady={onReady}
              />
              {step && scenario && (
                <p
                  aria-live="polite"
                  className="bg-surface/95 border-line-strong absolute right-3 bottom-3 left-3 rounded-[var(--datum-radius-md)] border px-3 py-2 text-sm shadow-lg backdrop-blur"
                >
                  <span className="text-season-accent mr-2 font-mono text-xs">
                    {copy.ui.step
                      .replace('{current}', String(stepIndex + 1))
                      .replace('{total}', String(scenario.steps.length))}
                  </span>
                  {copy.steps[step.key]}
                </p>
              )}
            </div>
            <NodeDetails
              copy={copy}
              answers={answers}
              node={
                architecture.nodes.find(node => node.id === selected) ?? null
              }
              onClose={() => setSelected(null)}
              className="lg:absolute lg:top-3 lg:left-3 lg:z-10 lg:max-h-[calc(100%-5rem)] lg:w-80 lg:overflow-y-auto lg:shadow-xl"
            />
          </div>

          <DiagramLegend copy={copy} architecture={architecture} />
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="grid gap-3">
            <h2 className="font-display text-lg font-bold">
              {copy.ui.notNeededTitle}
            </h2>
            {architecture.notNeeded.length > 0 ? (
              <ul className="grid gap-2 text-sm">
                {architecture.notNeeded.map(id => (
                  <li key={id} className="flex gap-2">
                    <Badge variant="neutral" className="h-fit shrink-0">
                      {copy.nodes[id].name}
                    </Badge>
                    <span className="text-ink-muted">{copy.notNeeded[id]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-muted text-sm">{copy.ui.notNeededEmpty}</p>
            )}
          </CardContent>
        </Card>

        <div className="grid content-start gap-4">
          {architecture.notes.length > 0 && (
            <Callout tone="warning" icon={<TriangleAlert />}>
              <CalloutTitle>{copy.ui.notesTitle}</CalloutTitle>
              <CalloutContent>
                <ul>
                  {architecture.notes.map(note => (
                    <li key={note}>{copy.notes[note]}</li>
                  ))}
                </ul>
              </CalloutContent>
            </Callout>
          )}
          <ExportBar
            copy={copy}
            locale={locale}
            answers={answers}
            architecture={architecture}
            diagram={diagram}
          />
        </div>
      </div>

      <TextVersion copy={copy} architecture={architecture} />
    </div>
  )
}
