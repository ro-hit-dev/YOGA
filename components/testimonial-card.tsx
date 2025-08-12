"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/data"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function TestimonialCard({ t }: { t: Testimonial }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

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
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="perspective-1000"
    >
      <Card className="shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-amber-50/30 to-white border-amber-100">
        <motion.div style={{ transform: "translateZ(10px)" }}>
          <CardHeader className="flex flex-row items-center gap-2">
            <motion.div
              className="flex text-amber-500"
              aria-label={`${t.rating} stars`}
              style={{ transform: "translateZ(15px)" }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotateY: "180deg" }}
                  animate={{ scale: 1, rotateY: "0deg" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotateZ: "10deg",
                    transition: { duration: 0.2 },
                  }}
                >
                  <Star className={`h-4 w-4 ${i < t.rating ? "fill-amber-500 drop-shadow-sm" : "opacity-30"}`} />
                </motion.div>
              ))}
            </motion.div>
            <motion.span className="text-sm text-muted-foreground font-medium" style={{ transform: "translateZ(8px)" }}>
              by {t.studentName}
            </motion.span>
          </CardHeader>
        </motion.div>

        <motion.div style={{ transform: "translateZ(5px)" }}>
          <CardContent>
            <motion.p className="text-sm italic leading-relaxed" style={{ transform: "translateZ(12px)" }}>
              {`"${t.quote}"`}
            </motion.p>
            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full opacity-20"
              style={{ transform: "translateZ(-5px)" }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  )
}
