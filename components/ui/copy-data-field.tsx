"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CopyFieldProps {
  value: string
  label?: string
  className?: string
}

export function CopyField({ value, label, className }: CopyFieldProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className={`flex flex-col gap-1.5 bg-transparent text-current ${className}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="flex w-full items-center gap-2">
        <Input value={value} readOnly className="flex-1 !bg-transparent !text-current border-black/30" onClick={(e) => (e.target as HTMLInputElement).select()} />
        <Button
          variant="default"
          size="icon"
          onClick={copyToClipboard}
          className="h-10 w-10 shrink-0 !bg-transparent !text-current border border-black/30"
          aria-label="Copy to clipboard"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
