"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Testimonial } from "@/lib/data"

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length, isAutoPlaying])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">What Students Say</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={next}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="flex text-amber-500" aria-label={`${testimonials[current].rating} stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      <Star
                        className={`h-4 w-4 ${i < testimonials[current].rating ? "fill-amber-500" : "opacity-30"}`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">by {testimonials[current].studentName}</span>
              </CardHeader>
              <CardContent>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-sm italic"
                >
                  {`"${testimonials[current].quote}"`}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setIsAutoPlaying(false)
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-amber-500 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
