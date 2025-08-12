"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import EnhancedButton from "./enhanced-button"
import ParticleSystem from "./particle-system"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/hero-beach.jpg"
        alt="Yoga by the ocean, calm and focused"
        width={1600}
        height={900}
        priority
        className="h-[60vh] w-full object-cover sm:h-[70vh]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Particle Effects */}
      <ParticleSystem particleCount={40} colors={["#a4ac86", "#c2c5aa", "#b6ad90", "#936639"]} interactive={true} />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-7xl items-end px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl text-white relative z-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl font-semibold sm:text-5xl"
              style={{ transform: "translateZ(20px)" }}
            >
              Residential Yoga Programs for Deep Transformation
            </motion.h1>
            <motion.p
              className="mt-3 text-white/90"
              style={{ transform: "translateZ(15px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Calm, credible, and inspiring training designed to reset your mind and strengthen your practice.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 flex gap-3"
              style={{ transform: "translateZ(25px)" }}
            >
              <EnhancedButton variant3d="primary" depth="lg" asChild>
                <Link href="/book">Book Now</Link>
              </EnhancedButton>
              <EnhancedButton variant3d="secondary" depth="md" asChild>
                <Link href="/courses">Explore Courses</Link>
              </EnhancedButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
