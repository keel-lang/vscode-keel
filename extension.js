const vscode = require('vscode');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

let client;

function getKeelPath() {
  return vscode.workspace.getConfiguration('keel').get('executablePath', 'keel');
}

function activate(context) {
  registerCommands(context);

  if (vscode.workspace.getConfiguration('keel').get('lsp.enabled', true)) {
    startLspClient(context);
  }
}

function registerCommands(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('keel.runFile', () => runKeelCommand('run')),
    vscode.commands.registerCommand('keel.checkFile', () => runKeelCommand('check')),
    vscode.commands.registerCommand('keel.lintFile', () => runKeelCommand('lint')),
    vscode.commands.registerCommand('keel.formatFile', formatCurrentFile),
  );
}

function runKeelCommand(subcommand) {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'keel') {
    vscode.window.showErrorMessage('Open a .keel file first.');
    return;
  }

  const file = editor.document.uri.fsPath;
  const keel = getKeelPath();
  const channel = getOrCreateChannel();

  channel.show(true);
  channel.appendLine(`> ${keel} ${subcommand} ${file}`);

  const cp = require('child_process');
  const proc = cp.spawn(keel, [subcommand, file], { env: process.env });

  proc.stdout.on('data', (d) => channel.append(d.toString()));
  proc.stderr.on('data', (d) => channel.append(d.toString()));
  proc.on('close', (code) => {
    channel.appendLine(code === 0 ? `✓ ${subcommand} succeeded` : `✗ ${subcommand} exited ${code}`);
  });
}

function formatCurrentFile() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== 'keel') return;

  const file = editor.document.uri.fsPath;
  const keel = getKeelPath();

  const cp = require('child_process');
  cp.exec(`${keel} fmt ${file}`, (err, _stdout, stderr) => {
    if (err) {
      vscode.window.showErrorMessage(`keel fmt failed: ${stderr}`);
    }
  });
}

function startLspClient(context) {
  const keel = getKeelPath();

  const serverOptions = {
    command: keel,
    args: ['lsp'],
    transport: TransportKind.stdio,
  };

  const clientOptions = {
    documentSelector: [{ scheme: 'file', language: 'keel' }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher('**/*.keel'),
    },
    traceOutputChannel: vscode.window.createOutputChannel('Keel LSP Trace'),
  };

  client = new LanguageClient('keel', 'Keel Language Server', serverOptions, clientOptions);
  context.subscriptions.push(client);
  client.start();
}

function getOrCreateChannel() {
  if (!getOrCreateChannel._channel) {
    getOrCreateChannel._channel = vscode.window.createOutputChannel('Keel');
  }
  return getOrCreateChannel._channel;
}

function deactivate() {
  if (client) return client.stop();
}

module.exports = { activate, deactivate };
