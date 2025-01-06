"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBuildFile = exports.installBuildFileCommand = void 0;
const vscode_1 = require("vscode");
const cakeBuildFile_1 = require("./cakeBuildFile");
const shared_1 = require("../shared");
const constants_1 = require("../constants");
function installBuildFileCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if there is an open folder in workspace
        if (vscode_1.workspace.rootPath === undefined) {
            vscode_1.window.showErrorMessage('You have not yet opened a folder.');
            return;
        }
        var name = yield vscode_1.window.showInputBox({
            placeHolder: shared_1.messages.PROMPT_SCRIPT_NAME,
            value: constants_1.DEFAULT_SCRIPT_NAME
        });
        if (!name) {
            vscode_1.window.showWarningMessage('No script name provided! Try again and make sure to provide a file name.');
            return;
        }
        var result = yield installBuildFile(name);
        if (result) {
            vscode_1.window.showInformationMessage('Sample Build Cake File successfully created.');
        }
        else {
            vscode_1.window.showErrorMessage('Error creating Sample Build Cake File.');
        }
    });
}
exports.installBuildFileCommand = installBuildFileCommand;
function installBuildFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create the buildFile object
        let buildFile = new cakeBuildFile_1.CakeBuildFile(fileName);
        var targetPath = buildFile.getTargetPath();
        var ready = yield shared_1.utils.checkForExisting(targetPath);
        if (!ready) {
            Promise.reject(constants_1.CANCEL);
        }
        var result = yield buildFile.create();
        return result;
    });
}
exports.installBuildFile = installBuildFile;
//# sourceMappingURL=cakeBuildFileCommand.js.map