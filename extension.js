// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "silence-is-golden" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.insertSilence',
    function() {
      // The code you place here will be executed every time your command is executed

      var quotes = require('./data/quotes.json');

      var textEditor = vscode.window.activeTextEditor;
      textEditor
        .edit(editBuilder => {
          var firstLine = textEditor.document.lineAt(0);
          var lastLine = textEditor.document.lineAt(
            textEditor.document.lineCount - 1,
          );
          var textRange = new vscode.Range(
            0,
            firstLine.range.start.character,
            textEditor.document.lineCount - 1,
            lastLine.range.end.character,
          );

          var quote =
            quotes[Math.floor(Math.random() * quotes.length)];
          var text = `// “${quote.quote}”
// for more silence, go to https://marketplace.visualstudio.com/items?itemName=riencoertjens.silence-is-golden`;
          if (quote.author) text += ` ― ${quote.author}`;
          editBuilder.replace(textRange, text);
        })
        .then(() =>
          textEditor.document
            .save()
            .then(() =>
              vscode.window.showWarningMessage('be quiet!'),
            ),
        );
    },
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
