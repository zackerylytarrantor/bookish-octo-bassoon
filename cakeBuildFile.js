"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CakeBuildFile = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const constants_1 = require("../constants");
class CakeBuildFile {
    constructor(scriptName = constants_1.DEFAULT_SCRIPT_NAME) {
        this.scriptName = scriptName;
    }
    getTargetPath() {
        if (vscode.workspace.rootPath) {
            return path.join(vscode.workspace.rootPath, this.scriptName);
        }
        return "";
    }
    create() {
        return new Promise((resolve, reject) => {
            try {
                let buildFile = fs.createWriteStream(this.getTargetPath(), {
                    flags: 'a'
                });
                buildFile.write('///////////////////////////////////////////////////////////////////////////////\n');
                buildFile.write('// ARGUMENTS\n');
                buildFile.write('///////////////////////////////////////////////////////////////////////////////\n');
                buildFile.write('\n');
                buildFile.write('var target = Argument("target", "Default");\n');
                buildFile.write('var configuration = Argument("configuration", "Release");\n');
                buildFile.write('\n');
                buildFile.write('///////////////////////////////////////////////////////////////////////////////\n');
                buildFile.write('// SETUP / TEARDOWN\n');
                buildFile.write('///////////////////////////////////////////////////////////////////////////////\n');
                buildFile.write('\n');
                buildFile.write('Setup(ctx =>\n');
                buildFile.write('{\n');
                buildFile.write('   // Executed BEFORE the first task.\n');
                buildFile.write('   Information("Running tasks...");\n');
                buildFile.write('});\n');
                buildFile.write('\n');
                buildFile.write('Teardown(ctx =>\n');
                buildFile.write('{\n');
                buildFile.write('   // Executed AFTER the last task.\n');
                buildFile.write('   Information("Finished running tasks.");\n');
                buildFile.write('});\n');
                buildFile.write('\n');
                buildFile.write('///////////////////////////////////////////////////////////////////////////////\n');
                buildFile.write('// TASKS\n');
                buildFile.write('///////////////////////////////////////////////////////////////////////////////\n');
                buildFile.write('\n');
                buildFile.write('Task("Default")\n');
                buildFile.write('.Does(() => {\n');
                buildFile.write('   Information("Hello Cake!");\n');
                buildFile.write('});\n');
                buildFile.write('\n');
                buildFile.write('RunTarget(target);');
                buildFile.end();
                buildFile.on('finish', function () {
                    vscode.workspace.openTextDocument(buildFile.path.toString()).then((document) => {
                        vscode.window.showTextDocument(document);
                    });
                    resolve(true);
                });
            }
            catch (error) {
                reject(false);
            }
        });
    }
}
exports.CakeBuildFile = CakeBuildFile;
//# sourceMappingURL=cakeBuildFile.js.map