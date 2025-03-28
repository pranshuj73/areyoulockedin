"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {
        theme === 'light' ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )
      }

    </Button>
  )
}
