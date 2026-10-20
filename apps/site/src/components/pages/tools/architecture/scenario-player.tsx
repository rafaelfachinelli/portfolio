import { Button } from '@datum/ui'
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Square,
  Volume2,
  VolumeOff,
} from 'lucide-react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import type { Scenario, ScenarioId } from '@/lib/tools/architecture/scenarios'

type ScenarioPlayerProps = Readonly<{
  copy: ArchitectureCopy
  scenarios: Scenario[]
  scenario: Scenario | null
  stepIndex: number
  playing: boolean
  onChoose: (id: ScenarioId) => void
  /** The narration switch, when this language has clips. */
  narration: { on: boolean; onToggle: () => void } | null
  onPlay: () => void
  onPause: () => void
  onStep: (delta: number) => void
  onStop: () => void
}>

/** Picks a situation and plays its path through the diagram, step by step. */
export function ScenarioPlayer({
  copy,
  scenarios,
  scenario,
  stepIndex,
  playing,
  onChoose,
  narration,
  onPlay,
  onPause,
  onStep,
  onStop,
}: ScenarioPlayerProps) {
  const total = scenario?.steps.length ?? 0

  return (
    <div
      role="group"
      aria-labelledby="scenarios-title"
      aria-describedby="scenarios-hint"
      className="border-line-strong grid gap-2 rounded-[var(--datum-radius-md)] border p-2.5"
    >
      <p id="scenarios-hint" className="sr-only">
        {copy.ui.scenariosHint}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <h3
          id="scenarios-title"
          className="text-season-accent mr-1 font-mono text-xs tracking-widest uppercase"
        >
          {copy.ui.scenariosTitle}
        </h3>
        {scenarios.map(item => (
          <Button
            key={item.id}
            size="sm"
            variant={scenario?.id === item.id ? 'primary' : 'outline'}
            aria-pressed={scenario?.id === item.id}
            onClick={() => onChoose(item.id)}
          >
            {copy.scenarios[item.id]}
          </Button>
        ))}
        {/* Narration stands apart in rose (Datum palette), so it is not lost
            among the scenarios: outlined when off, filled when on. */}
        {narration && (
          <Button
            size="sm"
            variant="outline"
            aria-pressed={narration.on}
            onClick={narration.onToggle}
            className={
              narration.on
                ? 'ml-auto border-[#fb7185] bg-[#fb7185] text-[#1f0a10] hover:bg-[#fb7185] hover:brightness-110'
                : 'ml-auto border-[#fb7185]/70 text-[#fb7185] hover:bg-[#fb7185]/10'
            }
          >
            {narration.on ? <Volume2 /> : <VolumeOff />}
            {copy.ui.narration}
          </Button>
        )}
      </div>
      {scenario && (
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            aria-label={copy.ui.previous}
            disabled={stepIndex === 0}
            onClick={() => onStep(-1)}
          >
            <SkipBack />
          </Button>
          {playing ? (
            <Button
              size="icon"
              variant="secondary"
              aria-label={copy.ui.pause}
              onClick={onPause}
            >
              <Pause />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="secondary"
              aria-label={copy.ui.play}
              onClick={onPlay}
            >
              <Play />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            aria-label={copy.ui.next}
            disabled={stepIndex >= total - 1}
            onClick={() => onStep(1)}
          >
            <SkipForward />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label={copy.ui.stop}
            onClick={onStop}
          >
            <Square />
          </Button>
          <div aria-hidden="true" className="ml-2 flex flex-1 gap-1">
            {scenario.steps.map((step, index) => (
              <span
                key={step.key}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  index <= stepIndex ? 'bg-season-accent' : 'bg-well'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
