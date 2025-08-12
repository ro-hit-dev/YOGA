"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { currency, type Course } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function CourseCard({ course }: { course: Course }) {
  const { slug, title, summary, price, duration, coverImage } = course
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

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
        y: -12,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      className="perspective-1000"
    >
      <Card className="overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-gradient-to-br from-white to-gray-50/50">
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transform: "translateZ(20px)" }}
          >
            <Image src={coverImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow-lg"
            style={{
              transform: "translateZ(30px)",
              color: "#7f4f24",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {duration}
          </motion.div>
        </div>

        <motion.div style={{ transform: "translateZ(10px)" }}>
          <CardHeader>
            <CardTitle className="text-lg group-hover:text-amber-700 transition-colors duration-300">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </CardHeader>

          <CardContent className="text-sm">
            <div className="flex items-center justify-between">
              <motion.span
                className="font-bold text-xl bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                style={{ transform: "translateZ(15px)" }}
              >
                {currency(price)}
              </motion.span>
              <span className="text-muted-foreground bg-gray-100 px-2 py-1 rounded-full text-xs">{course.level}</span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: "5deg" }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(20px)" }}
              className="flex-1"
            >
              <Button
                asChild
                variant="outline"
                className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 bg-transparent"
              >
                <Link href={`/courses/${slug}`}>Details</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: "-5deg" }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(25px)" }}
              className="flex-1"
            >
              <Button
                asChild
                className="w-full text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
              >
                <Link href={`/book?course=${slug}`}>Book Now</Link>
              </Button>
            </motion.div>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  )
}
