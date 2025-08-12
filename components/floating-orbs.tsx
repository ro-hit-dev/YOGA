"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Orb {
  id: number
  x: number
  y: number
  size: number
  color: string
  baseX: number
  baseY: number
  amplitude: number
  frequency: number
  phase: number
}

interface FloatingOrbsProps {
  orbCount?: number
  colors?: string[]
  interactive?: boolean
  className?: string
}

export default function FloatingOrbs({
  orbCount = 8,
  colors = ["#a4ac86", "#c2c5aa", "#b6ad90", "#936639", "#7f4f24"],
  interactive = true,
  className = "",
}: FloatingOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [orbs, setOrbs] = useState<Orb[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [time, setTime] = useState(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 30, damping: 20 })

  // Initialize orbs
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const mouseDistanceTransforms = orbs.map((orb) =>
    useTransform([mouseXSpring, mouseYSpring], ([mx, my]) => Math.sqrt((mx - orb.x) ** 2 + (my - orb.y) ** 2)),
  )

  const scaleTransforms = mouseDistanceTransforms.map((mouseDistance) =>
    useTransform(mouseDistance, [0, 200], [1.5, 1]),
  )

  const opacityTransforms = mouseDistanceTransforms.map((mouseDistance) =>
    useTransform(mouseDistance, [0, 200], [0.8, 0.3]),
  )

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const newOrbs: Orb[] = Array.from({ length: orbCount }, (_, i) => {
      const x = (dimensions.width / (orbCount + 1)) * (i + 1)
      const y = dimensions.height * (0.3 + Math.random() * 0.4)

      return {
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 60 + 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        amplitude: Math.random() * 30 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      }
    })

    setOrbs(newOrbs)
  }, [dimensions, orbCount, colors])

  // Mouse tracking
  useEffect(() => {
    if (!interactive || !containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    const container = containerRef.current
    container.addEventListener("mousemove", handleMouseMove)

    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [interactive, mouseX, mouseY])

  // Animation loop
  useEffect(() => {
    if (orbs.length === 0) return

    let animationId: number
    let currentMouseX = 0
    let currentMouseY = 0

    const unsubscribeX = mouseXSpring.on("change", (v) => (currentMouseX = v))
    const unsubscribeY = mouseYSpring.on("change", (v) => (currentMouseY = v))

    const animate = () => {
      setTime((prevTime) => prevTime + 1)

      setOrbs((prevOrbs) =>
        prevOrbs.map((orb) => {
          // Base floating animation
          const floatX = orb.baseX + Math.sin(time * orb.frequency + orb.phase) * orb.amplitude
          const floatY = orb.baseY + Math.cos(time * orb.frequency * 0.7 + orb.phase) * orb.amplitude * 0.5

          let x = floatX
          let y = floatY

          // Mouse interaction
          if (interactive && currentMouseX && currentMouseY) {
            const dx = currentMouseX - x
            const dy = currentMouseY - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 200

            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance
              const repelStrength = 50
              x -= (dx / distance) * force * repelStrength
              y -= (dy / distance) * force * repelStrength
            }
          }

          return {
            ...orb,
            x,
            y,
          }
        }),
      )

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      unsubscribeX()
      unsubscribeY()
    }
  }, [orbs.length, time, interactive, mouseXSpring, mouseYSpring])

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {orbs.map((orb, index) => {
        const mouseDistance = mouseDistanceTransforms[index]
        const scale = scaleTransforms[index]
        const opacity = opacityTransforms[index]

        return (
          <motion.div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              left: orb.x - orb.size / 2,
              top: orb.y - orb.size / 2,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle at 30% 30%, ${orb.color}40, ${orb.color}20, transparent)`,
              backdropFilter: "blur(1px)",
              scale,
              opacity,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, ${orb.color}60, transparent 70%)`,
              }}
            />
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border opacity-30"
              style={{
                borderColor: orb.color,
                borderWidth: "1px",
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
