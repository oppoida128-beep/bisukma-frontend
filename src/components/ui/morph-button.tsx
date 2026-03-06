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

  // Tampilkan teks jika hover (desktop) atau selalu tampil di mobile
  const showText = isHovered || isMobile

  // Konfigurasi spring yang smooth dan presisi
  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
  }

  return (
    <motion.button
      layout
      transition={springTransition}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center bg-transparent text-muted-foreground rounded-full h-10 border-none cursor-pointer outline-none transition-colors hover:text-accent",
        showText ? "px-5" : "w-10",
        className
      )}
      {...props}
    >
      <motion.div layout className="flex items-center justify-center shrink-0">
        <Icon size={18} />
      </motion.div>

      <AnimatePresence mode="popLayout">
        {showText && (
          <motion.span
            key="text"
            layout
            initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -8, filter: "blur(4px)" }}
            transition={{
              opacity: { duration: 0.15 },
              x: springTransition,
              filter: { duration: 0.15 }
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
