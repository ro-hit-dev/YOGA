"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface EnhancedButtonProps extends ButtonProps {
  variant3d?: "primary" | "secondary" | "outline" | "ghost"
  depth?: "sm" | "md" | "lg"
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, variant3d = "primary", depth = "md", className = "", ...props }, ref) => {
    const depthValues = {
      sm: { translateZ: "5px", shadow: "0 4px 8px rgba(0,0,0,0.1)" },
      md: { translateZ: "10px", shadow: "0 8px 16px rgba(0,0,0,0.15)" },
      lg: { translateZ: "15px", shadow: "0 12px 24px rgba(0,0,0,0.2)" },
    }

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg",
      secondary:
        "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-md",
      outline: "border-2 border-amber-600 hover:bg-amber-50 text-amber-700 shadow-md hover:shadow-lg",
      ghost: "hover:bg-amber-50 text-amber-700 shadow-sm hover:shadow-md",
    }

    return (
      <motion.div
        whileHover={{
          rotateX: "-5deg",
          rotateY: "2deg",
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        whileTap={{
          scale: 0.98,
          rotateX: "0deg",
          rotateY: "0deg",
          transition: { duration: 0.1 },
        }}
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(${depthValues[depth].translateZ})`,
        }}
        className="inline-block"
      >
        <Button
          ref={ref}
          className={`
            ${variantStyles[variant3d]} 
            ${className}
            transition-all duration-300 
            hover:shadow-xl
            active:shadow-md
            transform-gpu
          `}
          style={{
            boxShadow: depthValues[depth].shadow,
          }}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export default EnhancedButton
