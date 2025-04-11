type Language =
  | "Odin"
  | "Nim"
  | "Julia"
  | "Lisp"
  | "Gleam"
  | "Solidity"
  | "WebAssembly"
  | "Zig"
  | "COBOL"
  | "Elm"
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Go"
  | "Rust"
  | "Java"
  | "Kotlin"
  | "Swift"
  | "ObjectiveC" // Objective-C / Objective-C++
  | "C#"     // C#
  | "F#"     // F#
  | "C"
  | "C++"
  | "PHP"
  | "Ruby"
  | "Perl"
  | "Lua"
  | "Scala"
  | "Groovy"
  | "Dart"
  | "Elixir"
  | "Erlang"
  | "Clojure"
  | "Haskell"
  | "R"
  | "SQL"
  | "Shell"      // Generic Shell Script (sh, bash, zsh)
  | "PowerShell"
  | "Batch"      // Windows Batch Scripting
  | "Assembly";

type OtherFormat =
  | "HTML"
  | "CSS"
  | "SASS"       // Sass/SCSS
  | "Less"
  | "JSON"
  | "YAML"       // YAML/YML
  | "XML"
  | "CSV"
  | "TSV"        // Tab Separated Values
  | "Markdown"
  | "Text"       // Plain Text
  | "Properties" // Java .properties files
  | "TOML"
  | "INI"        // Config INI files
  | "Dockerfile"
  | "Makefile"
  | "Log"
  | "GraphQL"   // GraphQL Schema/Query files
  | "Nix";   // GraphQL Schema/Query files

// Combine the types for the map value
export type FileType = Language | OtherFormat;
