"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface InteractiveParticle {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  opacity: number
  color: string
  connectionDistance: number
}

interface InteractiveParticlesProps {
  particleCount?: number
  colors?: string[]
  showConnections?: boolean
  className?: string
}

export default function InteractiveParticles({
  particleCount = 30,
  colors = ["#a4ac86", "#c2c5aa", "#b6ad90", "#936639"],
  showConnections = true,
  className = "",
}: InteractiveParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<InteractiveParticle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 15 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 15 })

  // Initialize particles and canvas
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

    const newParticles: InteractiveParticle[] = Array.from({ length: particleCount }, (_, i) => {
      const x = Math.random() * dimensions.width
      const y = Math.random() * dimensions.height
      return {
        id: i,
        x,
        y,
        targetX: x,
        targetY: y,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.4 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        connectionDistance: Math.random() * 50 + 80,
      }
    })

    setParticles(newParticles)
  }, [dimensions, particleCount, colors])

  // Mouse tracking
  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    const handleMouseLeave = () => {
      mouseX.set(dimensions.width / 2)
      mouseY.set(dimensions.height / 2)
    }

    const container = containerRef.current
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY, dimensions])

  // Animation and connection drawing
  useEffect(() => {
    if (particles.length === 0 || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    let animationId: number
    let currentMouseX = dimensions.width / 2
    let currentMouseY = dimensions.height / 2

    const unsubscribeX = mouseXSpring.on("change", (v) => (currentMouseX = v))
    const unsubscribeY = mouseYSpring.on("change", (v) => (currentMouseY = v))

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Calculate attraction to mouse
          const dx = currentMouseX - particle.x
          const dy = currentMouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = ((maxDistance - distance) / maxDistance) * 0.5
            particle.targetX = particle.x + dx * force * 0.1
            particle.targetY = particle.y + dy * force * 0.1
          } else {
            // Return to original position slowly
            particle.targetX += (particle.targetX - particle.x) * 0.02
            particle.targetY += (particle.targetY - particle.y) * 0.02
          }

          // Smooth movement
          particle.x += (particle.targetX - particle.x) * 0.1
          particle.y += (particle.targetY - particle.y) * 0.1

          // Add slight random movement
          particle.x += (Math.random() - 0.5) * 0.5
          particle.y += (Math.random() - 0.5) * 0.5

          // Keep particles in bounds
          particle.x = Math.max(0, Math.min(dimensions.width, particle.x))
          particle.y = Math.max(0, Math.min(dimensions.height, particle.y))

          return particle
        }),
      )

      // Draw connections
      if (showConnections) {
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < particle.connectionDistance) {
              const opacity = (1 - distance / particle.connectionDistance) * 0.3
              ctx.strokeStyle = `rgba(164, 172, 134, ${opacity})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          })

          // Connection to mouse
          const mouseDistance = Math.sqrt((currentMouseX - particle.x) ** 2 + (currentMouseY - particle.y) ** 2)
          if (mouseDistance < 150) {
            const opacity = (1 - mouseDistance / 150) * 0.4
            ctx.strokeStyle = `rgba(127, 79, 36, ${opacity})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(currentMouseX, currentMouseY)
            ctx.stroke()
          }
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      unsubscribeX()
      unsubscribeY()
    }
  }, [particles.length, dimensions, mouseXSpring, mouseYSpring, showConnections])

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
