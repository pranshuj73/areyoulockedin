import type { FileType } from "@/types/lang";

/**
 * Maps language names to their corresponding iconify icons.
 */
export const iconnMap: Partial<Record<FileType, string>> = {
  "C++": "language-cpp",
  "Go": "language-go",
  "Haskell": "language-haskell",
  "HTML": "language-html5",
  "Java": "language-java",
  "JavaScript": "language-javascript",
  "Kotlin": "language-kotlin",
  "Lua": "language-lua",
  "PHP": "language-php",
  "Python": "language-python",
  "R": "language-r",
  "Ruby": "language-ruby",
  "Rust": "language-rust",
  "Swift": "language-swift",
  "TypeScript": "language-typescript",
  "Markdown": "language-markdown",
  "Vue": "vuejs",
  "Shell": "bash",
  "JSON": "code-json",
  "CSS": "language-css3",
  "C": "language-c",
  "C#": "language-csharp",
  "Ignore List": "git",
  "Git Config": "git",
  "Git Revision List": "git",
  "Git Attributes": "git",
  "Nix": "nix",
  "Fortran": "language-fortran",
  "Sass": "sass",
}
