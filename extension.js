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
	console.log('Congratulations, your extension "gist-secretlens-decryptor" is now active!');

	let filePathRegExp = new RegExp(".*\(encrypted\)");
	vscode.window.onDidChangeActiveTextEditor(function (textEditor) {
		let editor = textEditor
		let resourceScheme = editor.document.uri.scheme
		if (resourceScheme === 'gist') {
			let resourceFilePath = editor.document.uri.path
			// let path = editor.document.uri.path
			if (filePathRegExp.test(resourceFilePath))
				vscode.commands.executeCommand('editor.action.selectAll').then(function (value) {
					vscode.commands.executeCommand('editor.action.insertCursorAtEndOfEachLineSelected').then(function (value) {
						vscode.commands.executeCommand('secretlens.decrypt').then(function (value) {
							vscode.commands.executeCommand('editor.action.toggleColumnSelection')
						})
					})
				})
		}
	})
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
