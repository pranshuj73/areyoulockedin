import type { FileType } from "@/types/lang";
import type { DecorationType } from "@/types/decorations";

export const decorationMap: Partial<Record<FileType, DecorationType>> = {
  "Go": {
    image: "/assets/language/dancing-gopher.gif"
  },
  "Rust": {
    image: "/assets/language/crab.gif"
  }
}
