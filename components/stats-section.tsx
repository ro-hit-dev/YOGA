"use client"

import { motion } from "framer-motion"
import StatsCard from "./stats-card"

const stats = [
  { label: "Students Trained", value: 500, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "" },
  { label: "Programs Offered", value: 12, suffix: "" },
  { label: "Success Rate", value: 98, suffix: "%" },
]

export default function StatsSection() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: "#f8f6f0" }}>
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-amber-200/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-amber-300/15 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -15, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 className="text-3xl font-semibold mb-4" style={{ transform: "translateZ(20px)" }}>
            Our Impact
          </motion.h2>
          <motion.p className="text-muted-foreground max-w-2xl mx-auto" style={{ transform: "translateZ(10px)" }}>
            Over the years, we've helped hundreds of students deepen their practice and become confident teachers.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatsCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
