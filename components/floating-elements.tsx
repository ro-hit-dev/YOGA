"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full opacity-20"
          style={{
            backgroundColor: "#a4ac86",
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}
