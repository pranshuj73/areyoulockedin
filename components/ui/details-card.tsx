import { type ReactNode } from "react";
import { ScrollArea } from "./scroll-area";

// Define the interface for the Card component props
interface DetailsCardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export default function DetailsCard({ title, description, children }: DetailsCardProps) {
  return (
    <div className="h-[calc(450px-3rem)] max-h-[calc(450px-3rem)] w-full overflow-hidden border rounded-2xl p-6">
      <ScrollArea className="h-full max-h-[calc(450px-6rem)] min-w-full">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-foreground/80 mb-6">{description}</p>
        <div className="flex flex-col gap-4 [&>ul,ol]:mb-4">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
