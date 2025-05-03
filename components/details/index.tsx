"use client";

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Content from "./content";
import { ChevronUpIcon } from "lucide-react";
import Hidden from "../ui/hidden";

const TriggerButton = (props: React.ComponentProps<typeof Button>) => (
  <Button className="flex items-center justify-center gap-2 cursor-pointer" variant="outline" {...props}>
    <ChevronUpIcon />
    README.md
  </Button>
)

export function DetailModal() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <TriggerButton />
        </DialogTrigger>
        <DialogContent className="sm:min-w-[800px] h-[450px] max-h-[450px]">
          <Hidden>
            <DialogHeader>
              <DialogTitle>README.md</DialogTitle>
              <DialogDescription>
                Everything you need to know / check out about areyoulocked.in
              </DialogDescription>
            </DialogHeader>
          </Hidden>
          <Content isDesktop={isDesktop} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <TriggerButton />
      </DrawerTrigger>
      <DrawerContent>
        <Hidden>
          <DrawerHeader className="text-left">
            <DrawerTitle>README.md</DrawerTitle>
            <DrawerDescription>
              Everything you need to know / check out about areyoulocked.in
            </DrawerDescription>
          </DrawerHeader>
        </Hidden>
        <Content isDesktop={isDesktop} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
