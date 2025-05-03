import DetailsCard from "@/components/ui/details-card";
import { FileType } from "@/types/lang";

const fileTypes: FileType[] = [
  'Assembly', 'Batch', 'C', 'C#', 'C++', 'COBOL',
  'CSS', 'CSV', 'Clojure', 'Dart', 'Dockerfile', 'Elixir',
  'Elm', 'Erlang', 'F#', 'Flix', 'Gleam', 'Go', 'GraphQL',
  'Groovy', 'HTML', 'Haskell', 'INI', 'JSON', 'Java', 'JavaScript',
  'Julia', 'Kotlin', 'Less', 'Lisp', 'Log', 'Lua', 'Makefile', 'Markdown',
  'Nim', 'Nix', 'ObjectiveC', 'Odin', 'PHP', 'Perl', 'PowerShell', 'Properties',
  'Python', 'R', 'Ruby', 'Rust', 'SASS', 'SQL', 'Scala', 'Shell', 'Solidity', 'Swift',
  'TOML', 'TSV', 'Text', 'TypeScript', 'Vue', 'WebAssembly', 'XML', 'YAML', 'Zig'
];


export default function SupportedLanguages() {
  return (
    <DetailsCard title="Supported Languages" description="AYLI currents detects & tracks the following languages.">
      <ul className="list-disc list-inside space-y-1">
        {fileTypes.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    </DetailsCard>
  );
}
