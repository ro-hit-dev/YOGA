"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
  velocityX: number
  velocityY: number
  life: number
  maxLife: number
}

interface ParticleSystemProps {
  particleCount?: number
  colors?: string[]
  interactive?: boolean
  className?: string
}

export default function ParticleSystem({
  particleCount = 50,
  colors = ["#a4ac86", "#c2c5aa", "#b6ad90", "#936639", "#7f4f24"],
  interactive = true,
  className = "",
}: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Initialize particles
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

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: (Math.random() - 0.5) * 0.5,
      velocityY: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 1000,
      maxLife: Math.random() * 2000 + 1000,
    }))

    setParticles(newParticles)
  }, [dimensions, particleCount, colors])

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
    if (particles.length === 0) return

    let animationId: number
    let currentMouseX = 0
    let currentMouseY = 0

    const unsubscribeX = mouseXSpring.on("change", (v) => (currentMouseX = v))
    const unsubscribeY = mouseYSpring.on("change", (v) => (currentMouseY = v))

    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, velocityX, velocityY, life, opacity } = particle

          // Mouse interaction
          if (interactive && currentMouseX && currentMouseY) {
            const dx = currentMouseX - x
            const dy = currentMouseY - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 150

            if (distance < maxDistance) {
              const force = (maxDistance - distance) / maxDistance
              const angle = Math.atan2(dy, dx)
              velocityX -= Math.cos(angle) * force * 0.02
              velocityY -= Math.sin(angle) * force * 0.02
            }
          }

          // Update position
          x += velocityX
          y += velocityY

          // Add some drift
          velocityX += (Math.random() - 0.5) * 0.01
          velocityY += (Math.random() - 0.5) * 0.01

          // Damping
          velocityX *= 0.99
          velocityY *= 0.99

          // Boundary collision
          if (x < 0 || x > dimensions.width) {
            velocityX *= -0.8
            x = Math.max(0, Math.min(dimensions.width, x))
          }
          if (y < 0 || y > dimensions.height) {
            velocityY *= -0.8
            y = Math.max(0, Math.min(dimensions.height, y))
          }

          // Life cycle
          life += 16 // ~60fps
          if (life > particle.maxLife) {
            // Respawn particle
            return {
              ...particle,
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              velocityX: (Math.random() - 0.5) * 0.5,
              velocityY: (Math.random() - 0.5) * 0.5,
              life: 0,
              opacity: Math.random() * 0.6 + 0.2,
            }
          }

          // Fade in/out based on life
          const lifeRatio = life / particle.maxLife
          if (lifeRatio < 0.1) {
            opacity = (lifeRatio / 0.1) * particle.opacity
          } else if (lifeRatio > 0.9) {
            opacity = ((1 - lifeRatio) / 0.1) * particle.opacity
          }

          return {
            ...particle,
            x,
            y,
            velocityX,
            velocityY,
            life,
            opacity,
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
  }, [particles.length, dimensions, interactive, mouseXSpring, mouseYSpring])

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
