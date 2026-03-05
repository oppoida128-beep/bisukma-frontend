
'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon: LucideIcon
}

export function MorphButton({ text, icon: Icon, className, ...props }: MorphButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.button
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center bg-accent text-white rounded-full h-8 shadow-none border-none cursor-pointer outline-none",
        isHovered ? "px-4 gap-2" : "w-8",
        className
      )}
      transition={{ 
        layout: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      {...props}
    >
      <motion.div layout className="flex items-center justify-center shrink-0">
        <Icon size={14} />
      </motion.div>

      <AnimatePresence mode="popLayout" initial={false}>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap text-[10px] font-bold uppercase tracking-wider"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
