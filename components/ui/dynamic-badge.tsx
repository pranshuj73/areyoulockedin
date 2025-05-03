import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface DynamicBadgeProps {
  children: ReactNode
  text?: string
  className?: string
}

export function DynamicBadge({ children, text, className }: DynamicBadgeProps) {
  const contentText = text || (typeof children === "string" ? children : "")

  // Generate a consistent hash from the text
  const hashText = (text: string): number => {
    if (!text) return 0

    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i)
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }

  // Generate a color based on the hash
  const generateColor = (text: string): {bg: string, text: string} => {
    let hashValue = 0;
    for (let i = 0; i < text.length; i++) {
      hashValue = text.charCodeAt(i) + ((hashValue << 5) - hashValue);
    }

    hashValue = Math.abs(hashValue);
    const hue = Math.floor((hashValue * 137.508) % 360);

    const charCode = text.charCodeAt(0);
    const saturationBase = 60;
    const saturationVariance = 5;
    const saturation = saturationBase + (charCode % saturationVariance);

    const lightnessBase = 70;
    const lightnessVariance = 10;
    const lightness = lightnessBase - (charCode % lightnessVariance);

    return {
      bg:`hsl(${hue}, ${saturation}%, ${lightness}%)`,
      // text: lightness > 50 ? "text-gray-800" : "text-gray-200",
      text: "text-gray-800",
    } ;
  };


  const { bg: bgColor, text: textColorClass } = generateColor(contentText);
  // Only apply dynamic colors if not using default variant colors
  const style = contentText ? { backgroundColor: bgColor } : {}

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
