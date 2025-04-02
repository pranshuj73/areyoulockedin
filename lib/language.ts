const fileExtension: Record<string, string>  = {
  "js": "JavaScript",
  "jsx": "JavaScript",
  "ts": "TypeScript",
  "tsx": "TypeScript",
}

export const getLanguage = (extension: string): string | undefined => {
  return fileExtension[extension];
};
