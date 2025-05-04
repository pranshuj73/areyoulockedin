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
  const generateColor = (text: string): { bg: string, text: string } => {
    let hashValue = 0;
    for (let i = 0; i < text.length; i++) {
      hashValue = text.charCodeAt(i) + ((hashValue << 5) - hashValue);
    }

    hashValue = Math.abs(hashValue);
    const hue1 = Math.floor((hashValue * 137.508) % 360);
    const hue2 = (hue1 + 30) % 360; // offset for gradient variation

    const charCode = text.charCodeAt(0);
    const saturationBase = 50;
    const saturationVariance = 5;
    const saturation = saturationBase + (charCode % saturationVariance);

    const lightnessBase = 70;
    const lightnessVariance = 10;
    const lightness1 = lightnessBase - (charCode % lightnessVariance);
    const lightness2 = Math.min(lightness1 + 10, 95); // keep within bounds

    const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
    const color2 = `hsl(${hue2}, ${saturation}%, ${lightness2}%)`;

    return {
      bg: `linear-gradient(135deg, ${color1} 60%, ${color2})`,
      text: "text-gray-800", // or dynamically decide this later
    };
  };


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
