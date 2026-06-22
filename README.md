# Keel Language — VS Code Extension

Syntax highlighting, snippets, and language server support for [Keel](https://keel-lang.dev) — a programming language where AI agents are first-class citizens.

## Features

- **Syntax highlighting** — reserved keywords, stdlib namespaces (`ai`, `io`, `schedule`, …), built-in verbs (`run`, `send`, …), attributes (`@on_start`, `@role`, `@provider`, …), duration literals, string interpolation
- **Snippets** — `agent`, `task`, `type`, `interface`, `@on_start`, `when`, `try`, and more
- **Language server** — diagnostics, go-to-definition, rename (requires `keel` binary on PATH)
- **Commands** — `Keel: Run File`, `Keel: Check File`, `Keel: Lint File`, `Keel: Format File`
- **Format on save** — delegates to `keel fmt`

## Requirements

Install the `keel` CLI:

```bash
curl -fsSL https://keel-lang.dev/install.sh | sh
# or
brew install keel-lang/tap/keel
```

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `keel.executablePath` | `"keel"` | Path to the keel binary |
| `keel.lsp.enabled` | `true` | Enable the language server |
| `keel.trace.server` | `"off"` | LSP trace level (`off` / `messages` / `verbose`) |

## Format on save

Add to your VS Code settings:

```json
{
  "[keel]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "keel-lang.keel-lang"
  }
}
```

## Links

- [Keel documentation](https://keel-lang.dev/docs)
- [Language repository](https://github.com/keel-lang/keel)
- [Issues](https://github.com/keel-lang/vscode-keel/issues)
