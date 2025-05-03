"use client"

import type * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"

function VerticalTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      // Always set vertical orientation
      orientation="vertical"
      data-slot="tabs"
      // Vertical layout: flex-row places list and content side-by-side
      className={cn("flex flex-row gap-2", className)}
      {...props}
    />
  )
}

function VerticalTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Vertical styles are now the default/only styles
        "flex flex-col h-auto w-auto items-stretch border-r",
        // Base styles
        "bg-muted text-muted-foreground rounded-lg p-[3px] py-[18px]",
        className,
      )}
      {...props}
    />
  )
}

function VerticalTabsTrigger({ className, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base styles
        "flex items-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:outline-1 focus-visible:ring-ring/50 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "text-foreground dark:text-muted-foreground",
        "dark:data-[state=active]:text-foreground",
        // Vertical specific styles
        "w-full justify-start text-left data-[state=active]:bg-foreground/15",
        "data-[state=active]:[&>svg]:opacity-100 data-[state=active]:[&>svg]:ml-0",
        "transition-all duration-300 ease-in-out data-[state=active]:mr-0 data-[state=inactive]:mr-4 my-0.5",
        className,
      )}
      {...props}
    >
      <ChevronRightIcon className="-ml-4 opacity-0 h-4 w-4 transition-all duration-300 ease-in-out" />
      {children}
    </TabsPrimitive.Trigger>
  )
}

function VerticalTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none",
        // Vertical specific style (now default)
        "pl-4",
        className,
      )}
      {...props}
    />
  )
}

export { VerticalTabs, VerticalTabsList, VerticalTabsTrigger, VerticalTabsContent }
