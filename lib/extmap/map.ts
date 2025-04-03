import type { FileType } from "@/lib/extmap/lang";

export const fileExtensionMap: Record<string, FileType> = {
  // Programming Languages
  "js": "JavaScript",
  "mjs": "JavaScript", // ES Modules
  "cjs": "JavaScript", // CommonJS Modules
  "jsx": "JavaScript", // JavaScript React Syntax
  "ts": "TypeScript",
  "mts": "TypeScript", // ES Modules
  "cts": "TypeScript", // CommonJS Modules
  "tsx": "TypeScript", // TypeScript React Syntax
  "py": "Python",
  "pyw": "Python",     // Python for Windows GUI (no console)
  "go": "Go",
  "rs": "Rust",
  "java": "Java",
  "jsp": "Java",       // Java Server Pages (Often contains Java code)
  "kt": "Kotlin",
  "kts": "Kotlin",     // Kotlin Script
  "swift": "Swift",
  "m": "ObjectiveC",   // Objective-C
  "mm": "ObjectiveC",  // Objective-C++
  "cs": "CSharp",      // C#
  "fs": "FSharp",      // F#
  "fsx": "FSharp",     // F# Script
  "c": "C",
  "h": "C",            // C Header (often used with C++ too, but primary C)
  "cpp": "CPlusPlus",  // C++
  "cxx": "CPlusPlus",  // C++
  "cc": "CPlusPlus",   // C++
  "hpp": "CPlusPlus",  // C++ Header
  "hxx": "CPlusPlus",  // C++ Header
  "hh": "CPlusPlus",   // C++ Header (less common)
  "php": "PHP",
  "phtml": "PHP",      // PHP/HTML mixed
  "rb": "Ruby",
  "pl": "Perl",
  "pm": "Perl",        // Perl Module
  "lua": "Lua",
  "scala": "Scala",
  "sc": "Scala",       // Scala Script
  "groovy": "Groovy",
  "gvy": "Groovy",
  "gy": "Groovy",
  "dart": "Dart",
  "ex": "Elixir",
  "exs": "Elixir",     // Elixir Script
  "erl": "Erlang",
  "hrl": "Erlang",     // Erlang Header
  "clj": "Clojure",
  "cljs": "Clojure",   // ClojureScript
  "cljc": "Clojure",   // Clojure/ClojureScript portable
  "hs": "Haskell",
  "lhs": "Haskell",    // Literate Haskell
  "r": "R",
  "sql": "SQL",
  "sh": "Shell",       // Generic Shell
  "bash": "Shell",     // Bash Script
  "zsh": "Shell",      // Zsh Script
  "ps1": "PowerShell", // PowerShell Script
  "bat": "Batch",      // Windows Batch
  "cmd": "Batch",      // Windows Batch (newer)
  "asm": "Assembly",   // Assembly language
  "s": "Assembly",     // Assembly language (Unix)

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
  "svg": "SVG",
  "dockerfile": "Dockerfile", // Often has no extension but this pattern is common
  "Makefile": "Makefile",     // Often has no extension but this pattern is common
  "makefile": "Makefile",
  "gitignore": "Ignore", // Specific name, often no extension
  "dockerignore": "Ignore", // Specific name, often no extension
  "graphql": "GraphQL",  // GraphQL Schema Definition Language or queries
  "gql": "GraphQL",
};

