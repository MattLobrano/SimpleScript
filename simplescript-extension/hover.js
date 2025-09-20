const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerHoverProvider('simplescript', {
            provideHover(document, position) {
                const word = document.getText(document.getWordRangeAtPosition(position));
                const tooltips = {
                    "temp.mem;": "Temporary variable declaration",
                    "perm.mem;": "Permanent variable declaration",
                    "show": "Prints output",
                    "popup": "Shows an alert popup",
                    "if": "Conditional statement",
                    "repeat": "Loop statement"
                };
                if (tooltips[word]) {
                    return new vscode.Hover(tooltips[word]);
                }
            }
        })
    );
}

exports.activate = activate;
function deactivate() {}
exports.deactivate = deactivate;
