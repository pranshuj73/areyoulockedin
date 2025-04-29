import type { FileType } from "@/types/lang";

export const fileExtensionMap: Record<string, FileType> = {
  // Programming Languages - Sorted roughly alphabetically by language name for grouping
  "asm": "Assembly",   // Assembly language
  "s": "Assembly",     // Assembly language (Unix)
  "bat": "Batch",      // Windows Batch
  "cmd": "Batch",      // Windows Batch (newer)
  "c": "C",
  "h": "C",            // C Header (often used with C/C++ too, but primary C)
  "cpp": "C++",  // C++
  "cxx": "C++",  // C++
  "cc": "C++",   // C++
  "hpp": "C++",  // C++ Header
  "hxx": "C++",  // C++ Header
  "hh": "C++",   // C++ Header (less common)
  "cs": "C#",      // C#
  "clj": "Clojure",
  "cljs": "Clojure",   // ClojureScript
  "cljc": "Clojure",   // Clojure/ClojureScript portable
  "cob": "COBOL",      // COBOL Source
  "cbl": "COBOL",      // COBOL Source
  "cpy": "COBOL",      // COBOL Copybook
  "dart": "Dart",
  "ex": "Elixir",
  "exs": "Elixir",     // Elixir Script
  "ejs": "JavaScript",
  "elm": "Elm",
  "erl": "Erlang",
  "hrl": "Erlang",     // Erlang Header
  "fs": "F#",      // F#
  "fsx": "F#",     // F# Script
  "gleam": "Gleam",
  "go": "Go",
  "groovy": "Groovy",
  "gvy": "Groovy",
  "gy": "Groovy",
  "hs": "Haskell",
  "lhs": "Haskell",    // Literate Haskell
  "java": "Java",
  "jsp": "Java",       // Java Server Pages (Often contains Java code)
  "vue": "Vue",
  "js": "JavaScript",
  "mjs": "JavaScript", // ES Modules
  "cjs": "JavaScript", // CommonJS Modules
  "jsx": "JavaScript", // JavaScript React Syntax
  "jl": "Julia",
  "kt": "Kotlin",
  "kts": "Kotlin",     // Kotlin Script
  "lisp": "Lisp",      // Common Lisp
  "lsp": "Lisp",       // Common Lisp / AutoLISP
  "cl": "Lisp",        // Common Lisp
  "lua": "Lua",
  "nim": "Nim",
  "nims": "Nim",       // Nim Script
  "m": "ObjectiveC",   // Objective-C
  "mm": "ObjectiveC",  // Objective-C++
  "odin": "Odin",
  "pl": "Perl",
  "pm": "Perl",        // Perl Module
  "php": "PHP",
  "phtml": "PHP",      // PHP/HTML mixed
  "ps1": "PowerShell", // PowerShell Script
  "py": "Python",
  "pyw": "Python",     // Python for Windows GUI (no console)
  "r": "R",
  "rb": "Ruby",
  "rs": "Rust",
  "scala": "Scala",
  "sc": "Scala",       // Scala Script
  "sh": "Shell",       // Generic Shell
  "bash": "Shell",     // Bash Script
  "zsh": "Shell",      // Zsh Script
  "sol": "Solidity",   // Solidity (Ethereum)
  "sql": "SQL",
  "swift": "Swift",
  "ts": "TypeScript",
  "mts": "TypeScript", // ES Modules
  "cts": "TypeScript", // CommonJS Modules
  "tsx": "TypeScript", // TypeScript React Syntax
  "wat": "WebAssembly", // WebAssembly Text Format
  "zig": "Zig",

  // Markup, Styling, Data, Config & Other Formats
  "html": "HTML",
  "htm": "HTML",
  "css": "CSS",
  "scss": "SASS",      // SCSS syntax for Sass
  "sass": "SASS",      // Indented syntax for Sass
  "less": "Less",
  "json": "JSON",
  "yaml": "YAML",
  "yml": "YAML",
  "xml": "XML",
  "csv": "CSV",
  "tsv": "TSV",
  "md": "Markdown",
  "markdown": "Markdown",
  "txt": "Text",
  "log": "Log",
  "properties": "Properties",
  "toml": "TOML",
  "ini": "INI",
  "cfg": "INI",        // Common alternative for INI/Config
  "conf": "INI",       // Common alternative for INI/Config
  "svg": "XML",
  "dockerfile": "Dockerfile", // Often has no extension but this pattern is common
  "Makefile": "Makefile",     // Often has no extension but this pattern is common
  "makefile": "Makefile",
  "graphql": "GraphQL",  // GraphQL Schema Definition Language or queries
  "gql": "GraphQL",
  "nix": "Nix",
};
