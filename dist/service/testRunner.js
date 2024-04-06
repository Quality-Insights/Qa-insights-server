"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTests = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const simple_git_1 = __importDefault(require("simple-git"));
const logger_1 = __importDefault(require("../utils/logger"));
const fileSystem_1 = require("./fileSystem");
const config_1 = require("../config");
const system_1 = require("./system");
async function runTests(repo, branch) {
    const testDir = path_1.default.join(config_1.TEST_DIR, repo);
    await (0, fileSystem_1.ensureExists)(testDir);
    const git = (0, simple_git_1.default)({
        baseDir: testDir,
        binary: "git",
    });
    if (!fs_1.default.existsSync(`${testDir}/.git`)) {
        logger_1.default.info(`Cloning ${repo} to ${testDir}`);
        await git.clone(`https://github.com/${repo}.git`, testDir);
    }
    logger_1.default.info(`fetching changes form remote`);
    git.fetch();
    logger_1.default.info(`Checking out branch ${branch}`);
    await git.checkout(branch);
    logger_1.default.info(`starting tests`);
    await (0, system_1.runCommand)(`cd ${testDir}; npm install`);
    const testOutput = (0, system_1.runCommand)(`cd ${testDir};npm run test`);
}
exports.runTests = runTests;
