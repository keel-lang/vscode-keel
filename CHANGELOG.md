# Changelog

## [0.1.2]

Sync syntax highlighting and snippets with the Keel language surface through v0.2.4.

- Highlight `impl` and `while` keywords (previously unhighlighted).
- Stdlib namespaces are now lowercase `std/<name>` modules — recolor `ai`, `io`, `http`, `schedule`, … (was `Ai`, `Io`, `Schedule`, …) and extend the set to all 23 modules (`async`, `cache`, `control`, `crypto`, `csv`, `db`, `email`, `env`, `file`, `json`, `log`, `math`, `memory`, `random`, `search`, `shell`, `testing`, `time`, `uuid`).
- Highlight built-in verbs `run`, `stop`, `send`, `delegate`, `broadcast`, `min`, `max`, `typeof`.
- Highlight `@datetime` literals (`@2026-04-15`, `@monday_9am`).
- Drop `now` as a language constant — it is now `time.now()`.
- Snippets: lowercase `ai.classify` / `ai.summarize` / `schedule.every` / `schedule.cron`; new `prompt`, `use`, `impl`, `provider` (custom `LlmProvider`), and `while` snippets; `agentr` now scaffolds `@provider` + `@model`.

## [0.1.0] — 2026-05-02

Initial release extracted from the main `keel-lang/keel` repository.

- Syntax highlighting for all 28 reserved keywords, prelude namespaces, attributes, duration literals, and string interpolation
- Snippets: `agent`, `agents`, `agentr`, `task`, `type`, `types`, `interface`, `on_start`, `on_stop`, `on`, `when`, `if`, `for`, `try`, `classify`, `summarize`, `every`, `cron`
- LSP client — connects to `keel lsp` for diagnostics, go-to-definition, and rename
- Commands: `Keel: Run File`, `Keel: Check File`, `Keel: Lint File`, `Keel: Format File`
- Format-on-save via `keel fmt` (enable with `editor.formatOnSave`)
- Configurable binary path (`keel.executablePath`)
