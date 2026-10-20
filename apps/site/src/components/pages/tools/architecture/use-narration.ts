'use client'

import { useEffect, useRef, useState } from 'react'

export type NarrationState = {
  /** Length of the clip in ms, once known. */
  duration: number | null
  /** The clip finished (or could not play): the player may move on. */
  ended: boolean
}

/**
 * Plays one narration clip per scenario step. A new `id` (the step, counted per
 * playback) starts its clip from the beginning; `paused` holds and resumes it.
 * With no `src` (narration off, or no clip) nothing plays.
 */
export function useNarration(
  id: string,
  src: string | null,
  paused: boolean,
): NarrationState {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<NarrationState & { id: string }>({
    id,
    duration: null,
    ended: false,
  })

  // Pause and resume follow the player (declared first, so a step change in the
  // same render still starts its own clip).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return
    if (paused) audio.pause()
    else if (!audio.ended && audio.src) void audio.play().catch(() => {})
  }, [paused, src])

  useEffect(() => {
    if (!src) {
      audioRef.current?.pause()
      return
    }
    const audio = (audioRef.current ??= new Audio())
    audio.src = src
    setState({ id, duration: null, ended: false })

    const onMetadata = () =>
      setState(current =>
        current.id === id
          ? { ...current, duration: audio.duration * 1000 }
          : current,
      )
    // A clip that fails counts as finished, so the scenario never stalls.
    const onEnded = () =>
      setState(current =>
        current.id === id ? { ...current, ended: true } : current,
      )
    audio.addEventListener('loadedmetadata', onMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onEnded)
    void audio.play().catch(onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', onMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onEnded)
    }
  }, [id, src])

  return state.id === id
    ? { duration: state.duration, ended: state.ended }
    : { duration: null, ended: false }
}
