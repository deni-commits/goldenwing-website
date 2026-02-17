'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface MeshGradientProps {
  className?: string
  // Custom colors (optional - defaults to GoldenWing brand colors)
  colors?: {
    color1?: string
    color2?: string
    color3?: string
    color4?: string
  }
}

// Gradient instance type
interface GradientInstance {
  initGradient: (selector: string) => void
  play: () => void
  pause: () => void
}

// CSS Fallback for browsers without WebGL
// Uses same dimensions as canvas to prevent CLS during hydration
function GradientFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-gradient-shift w-full h-full', className)}
      style={{
        background: `
          linear-gradient(
            -45deg,
            #0a0a0a,
            #1a1a1a,
            #2d2d2d,
            #f2fb31,
            #2d2d2d,
            #1a1a1a
          )
        `,
        backgroundSize: '400% 400%',
        // Ensure consistent layout during hydration
        minHeight: 'inherit',
        minWidth: 'inherit',
      }}
    />
  )
}

export function MeshGradient({ className, colors }: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gradientRef = useRef<GradientInstance | null>(null)
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null)
  const { resolvedTheme } = useTheme()

  // Default GoldenWing colors
  const defaultDarkColors = {
    color1: '#0a0a0a',
    color2: '#1a1a1a',
    color3: '#2d2d2d',
    color4: '#f2fb31', // Electric Lime
  }

  const defaultLightColors = {
    color1: '#ffffff', // Pure white
    color2: '#f5f5f5', // Light gray
    color3: '#e0e0e0', // Light anthracite
    color4: '#2d2d2d', // Dark anthracite accent
  }

  const currentColors = resolvedTheme === 'dark'
    ? { ...defaultDarkColors, ...colors }
    : { ...defaultLightColors, ...colors }

  // Check WebGL support
  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        return !!gl
      } catch {
        return false
      }
    }
    setSupportsWebGL(checkWebGL())
  }, [])

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Initialize gradient - reinitialize when theme changes
  useEffect(() => {
    if (!supportsWebGL || prefersReducedMotion) return

    const initGradient = async () => {
      try {
        // Dynamic import of the Gradient class from Stripe's gradient library
        const gradientModule = await import('@/lib/gradient')
        const GradientClass = gradientModule.Gradient

        // Clean up existing gradient before creating new one
        if (gradientRef.current) {
          try {
            gradientRef.current.pause()
          } catch {
            // Ignore cleanup errors
          }
          gradientRef.current = null
        }

        if (canvasRef.current) {
          const instance = new GradientClass() as unknown as GradientInstance
          instance.initGradient('#gradient-canvas')
          gradientRef.current = instance
        }
      } catch {
        // WebGL init failed - fallback to CSS gradient
        setSupportsWebGL(false)
      }
    }

    // Small delay to ensure DOM is ready and CSS variables are applied
    const timer = setTimeout(initGradient, 100)

    return () => {
      clearTimeout(timer)
      if (gradientRef.current) {
        try {
          gradientRef.current.pause()
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  }, [supportsWebGL, prefersReducedMotion, resolvedTheme])

  // Intersection Observer - pause when not visible for performance
  useEffect(() => {
    if (!canvasRef.current || !gradientRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (gradientRef.current) {
          try {
            if (entry.isIntersecting) {
              gradientRef.current.play()
            } else {
              gradientRef.current.pause()
            }
          } catch {
            // Ignore errors
          }
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [supportsWebGL])

  // Show fallback during loading
  if (supportsWebGL === null) {
    return <GradientFallback className={className} />
  }

  // Show CSS fallback if WebGL not supported or reduced motion preferred
  if (!supportsWebGL || prefersReducedMotion) {
    return <GradientFallback className={className} />
  }

  return (
    <canvas
      id="gradient-canvas"
      ref={canvasRef}
      className={cn('w-full h-full', className)}
      data-transition-in
      style={{
        ['--gradient-color-1' as string]: currentColors.color1,
        ['--gradient-color-2' as string]: currentColors.color2,
        ['--gradient-color-3' as string]: currentColors.color3,
        ['--gradient-color-4' as string]: currentColors.color4,
      }}
    />
  )
}

export default MeshGradient
