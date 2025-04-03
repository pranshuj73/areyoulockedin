import { fileExtensionMap } from '@/lib/extmap/map';
import type { FileType } from "@/lib/extmap/lang";

export const getLanguage = (extension: string): FileType | undefined => {
  return fileExtensionMap[extension];
};
