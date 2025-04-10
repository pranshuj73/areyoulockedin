import { decorationMap } from '@/lib/decorations/map';
import type { FileType } from "@/types/lang";

export const getDecorations = (fileType: FileType): any => {
  return decorationMap[fileType];
};
