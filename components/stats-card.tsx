"use client"

import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import AnimatedCounter from "./animated-counter"

interface StatsCardProps {
  label: string
  value: number
  suffix: string
  delay?: number
}

export default function StatsCard({ label, value, suffix, delay = 0 }: StatsCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="perspective-1000"
    >
      <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100/50 overflow-hidden">
        {/* Background gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-amber-100/30"
          style={{ transform: "translateZ(-5px)" }}
        />

        {/* Floating accent */}
        <motion.div
          className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full opacity-60"
          style={{ transform: "translateZ(20px)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div className="text-center relative z-10" style={{ transform: "translateZ(10px)" }}>
          <motion.div
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
            style={{ transform: "translateZ(15px)" }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatedCounter value={value} suffix={suffix} />
          </motion.div>
          <motion.p className="text-sm text-muted-foreground font-medium" style={{ transform: "translateZ(8px)" }}>
            {label}
          </motion.p>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600"
          style={{ transform: "translateZ(5px)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  )
}
