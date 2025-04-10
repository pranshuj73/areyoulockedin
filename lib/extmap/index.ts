import { fileExtensionMap } from '@/lib/extmap/map';
import type { FileType } from "@/types/lang";

export const getLanguage = (extension: string): FileType | undefined => {
  return fileExtensionMap[extension];
};
