'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextCycleProps {
  words: string[]
  interval?: number
  className?: string
}

/**
 * Cycles through words with a short CSS entrance (no animation library).
 * The server renders the first word, so the line is complete without JavaScript.
 */
export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = '',
}: Readonly<AnimatedTextCycleProps>) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, words.length])

  return (
    <span
      key={currentIndex}
      className={`animate-datum-word text-season-accent inline-block font-bold whitespace-nowrap motion-reduce:animate-none ${className}`}
    >
      {words[currentIndex]}
    </span>
  )
}
