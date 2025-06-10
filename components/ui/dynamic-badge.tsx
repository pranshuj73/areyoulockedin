import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { generateColor } from "@/lib/color"

interface DynamicBadgeProps {
  children: ReactNode
  text?: string
  className?: string
}

export function DynamicBadge({ children, text, className }: DynamicBadgeProps) {
  const contentText = text || (typeof children === "string" ? children : "")

  const { bg: bgGradient, text: textColorClass } = generateColor(contentText);
  // Only apply dynamic colors if not using default variant colors
  const style = contentText ? { backgroundImage: bgGradient } : {}

  return (
    <span className={cn(
      "cursor-default inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
      textColorClass,
      className
    )}
      style={style}
    >
      {children}
      {text}
    </span>
  )
}
