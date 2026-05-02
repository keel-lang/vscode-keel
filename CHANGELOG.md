# Changelog

## [0.1.9] — 2026-05-02

Initial release extracted from the main `keel-lang/keel` repository.

- Syntax highlighting for all 28 reserved keywords, prelude namespaces, attributes, duration literals, and string interpolation
- Snippets: `agent`, `agents`, `agentr`, `task`, `type`, `types`, `interface`, `on_start`, `on_stop`, `on`, `when`, `if`, `for`, `try`, `classify`, `summarize`, `every`, `cron`
- LSP client — connects to `keel lsp` for diagnostics, go-to-definition, and rename
- Commands: `Keel: Run File`, `Keel: Check File`, `Keel: Lint File`, `Keel: Format File`
- Format-on-save via `keel fmt` (enable with `editor.formatOnSave`)
- Configurable binary path (`keel.executablePath`)
