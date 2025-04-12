import { fileExtensionMap } from '@/lib/language/extension-map';
import { decorationMap } from '@/lib/language/decoration-map';
import type { FileType } from "@/types/lang";
import { DecorationType } from '@/types/decorations';

export const getLanguage = (extension: string): FileType | undefined => {
  return fileExtensionMap[extension.trim().toLowerCase()];
};

export const getDecorations = (fileType: FileType): DecorationType | undefined => {
  return decorationMap[fileType];
};
