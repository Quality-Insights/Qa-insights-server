"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const child_process_1 = require("child_process");
function runCommand(command) {
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve([stdout, stderr]);
        });
        child.stdout?.pipe(process.stdout);
        child.stderr?.pipe(process.stderr);
    });
}
exports.runCommand = runCommand;
