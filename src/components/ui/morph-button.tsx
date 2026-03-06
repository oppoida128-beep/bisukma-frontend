'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon: LucideIcon
}

export function MorphButton({ text, icon: Icon, className, ...props }: MorphButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const isMobile = useIsMobile()

  // Tetap tampilkan teks di mobile agar user tahu fungsinya
  const showText = isHovered || isMobile

  // Spring transition yang lebih padat dan responsif
  const springConfig = { type: "spring", stiffness: 500, damping: 35, mass: 1 }

  return (
    <motion.button
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center bg-transparent text-muted-foreground rounded-full h-10 border-none cursor-pointer outline-none transition-colors hover:text-accent",
        showText ? "px-5" : "w-10",
        className
      )}
      transition={springConfig}
      {...props}
    >
      <motion.div layout className="flex items-center justify-center shrink-0">
        <Icon size={18} />
      </motion.div>

      <AnimatePresence mode="wait">
        {showText && (
          <motion.span
            key="text"
            initial={{ opacity: 0, x: -4, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -4, filter: "blur(4px)" }}
            transition={{ 
              duration: 0.2,
              ease: [0.23, 1, 0.32, 1] // easeOutQuint untuk kesan premium
            }}
            className="whitespace-nowrap text-xs font-bold ml-2.5 overflow-hidden"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
