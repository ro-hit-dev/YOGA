"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface BookingProgressProps {
  currentStep: number
  steps: string[]
}

export default function BookingProgress({ currentStep, steps }: BookingProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: i <= currentStep ? 1 : 0.8,
                opacity: i <= currentStep ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                i < currentStep
                  ? "border-green-500 bg-green-500 text-white"
                  : i === currentStep
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {i < currentStep ? <Check className="h-5 w-5" /> : i + 1}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i < currentStep ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-16 bg-green-500 mx-2 origin-left"
                style={{ backgroundColor: i < currentStep ? "#22c55e" : "#e5e7eb" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-muted-foreground"
        >
          Step {currentStep + 1}: {steps[currentStep]}
        </motion.p>
      </div>
    </div>
  )
}
