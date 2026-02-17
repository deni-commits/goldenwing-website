"use client"

import * as React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityProps {
  children: React.ReactNode
  className?: string
}

interface ScrollVelocityRowProps {
  children: React.ReactNode
  baseVelocity?: number
  direction?: 1 | -1
  className?: string
}

function ScrollVelocityContainer({
  children,
  className,
}: ScrollVelocityProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {children}
    </div>
  )
}

function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const [repetitions, setRepetitions] = React.useState(4)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLSpanElement>(null)
  const resizeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const textWidth = textRef.current.offsetWidth
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2
        setRepetitions(newRepetitions)
      }
    }

    // Debounced resize handler to prevent excessive recalculations
    const debouncedCalculate = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(calculateRepetitions, 300)
    }

    calculateRepetitions()

    window.addEventListener("resize", debouncedCalculate)
    return () => {
      window.removeEventListener("resize", debouncedCalculate)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [children])

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

  const directionFactor = React.useRef<number>(direction)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -direction
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = direction
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="overflow-hidden" ref={containerRef}>
      <motion.div className={cn("flex whitespace-nowrap", className)} style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : undefined}
            className="inline-block px-4"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export { ScrollVelocityContainer, ScrollVelocityRow }
