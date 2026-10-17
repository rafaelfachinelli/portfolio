'use client'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

export function SpaceBackground() {
  const { scrollY } = useScroll()
  const [stars, setStars] = useState<{ x: number; y: number; size: number }[]>(
    [],
  )
  const [clouds, setClouds] = useState<
    { x: number; y: number; size: number; speed: number }[]
  >([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 20, stiffness: 100 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Create random stars
  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }))
    setStars(newStars)
  }, [])

  // Create random clouds
  useEffect(() => {
    const newClouds = Array.from({ length: 5 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 30,
      size: Math.random() * 200 + 100,
      speed: Math.random() * 0.2 + 0.1,
    }))
    setClouds(newClouds)
  }, [])

  // Parallax effect for different layers
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 100])
  const starsY = useTransform(scrollY, [0, 1000], [0, 200])
  const farStarsY = useTransform(scrollY, [0, 1000], [0, 300])

  // Mouse movement transforms for different layers
  const backgroundTransformX = useTransform(springX, x => x * 0.2)
  const backgroundTransformY = useTransform(springY, y => y * 0.2)
  const midTransformX = useTransform(springX, x => x * 0.5)
  const midTransformY = useTransform(springY, y => y * 0.5)
  const foregroundTransformX = useTransform(springX, x => x * 0.8)
  const foregroundTransformY = useTransform(springY, y => y * 0.8)

  // Animation variants for stars
  const starVariants = {
    twinkle: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: Math.random() * 2 + 3,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
        delay: Math.random() * 5,
      },
    },
  }

  // Cloud movement animation
  const cloudVariants = {
    float: {
      x: [0, 100],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'linear',
      },
    },
  }

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
        className="to-via-sky-950 fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-300 dark:from-black dark:via-sky-950"
      >
        {/* Clouds with theme-aware colors */}
        <div className="absolute inset-0">
          {clouds.map((cloud, index) => (
            <motion.div
              key={`cloud-${index}`}
              className="absolute transition-colors duration-1000"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                width: `${cloud.size}px`,
                height: `${cloud.size * 0.4}px`,
                borderRadius: '50%',
                filter: 'blur(20px)',
              }}
              variants={cloudVariants}
              animate="float"
              custom={cloud.speed}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/40 to-white/10 transition-colors duration-1000 dark:from-purple-600/30 dark:to-purple-900/10" />
            </motion.div>
          ))}
        </div>

        {/* Background stars (slowest parallax) */}
        <motion.div
          style={{
            y: backgroundY,
            x: backgroundTransformX,
            translateY: backgroundTransformY,
          }}
          className="absolute inset-0"
        >
          {stars.slice(0, 30).map((star, index) => (
            <motion.div
              key={`bg-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              variants={starVariants}
              animate="twinkle"
            />
          ))}
        </motion.div>

        {/* Middle layer stars (medium parallax) */}
        <motion.div
          style={{
            y: starsY,
            x: midTransformX,
            translateY: midTransformY,
          }}
          className="absolute inset-0"
        >
          {stars.slice(30, 70).map((star, index) => (
            <motion.div
              key={`mid-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              variants={starVariants}
              animate="twinkle"
            />
          ))}
        </motion.div>

        {/* Foreground stars (fastest parallax) */}
        <motion.div
          style={{
            y: farStarsY,
            x: foregroundTransformX,
            translateY: foregroundTransformY,
          }}
          className="absolute inset-0"
        >
          {stars.slice(70).map((star, index) => (
            <motion.div
              key={`fg-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              variants={starVariants}
              animate="twinkle"
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
