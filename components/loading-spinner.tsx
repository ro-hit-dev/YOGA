"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-amber-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}
