"use strict";
// import fs from "fs";
// import path from "path";
// import { spawn } from "child_process";
// import simpleGit from "simple-git";
// import logger from "../utils/logger";
// import { ensureExists } from "./fileSystem";
// import { TEST_DIR } from "../config";
// import { runCommand } from "./system";
//
// export async function runTests(repo: string, branch: string) {
//   const testDir = path.join(TEST_DIR, repo);
//   await ensureExists(testDir);
//   const git = simpleGit({
//     baseDir: testDir,
//     binary: "git",
//   });
//
//   if (!fs.existsSync(`${testDir}/.git`)) {
//     logger.info(`Cloning ${repo} to ${testDir}`);
//     await git.clone(`https://github.com/${repo}.git`, testDir);
//   }
//
//   logger.info(`fetching changes form remote`);
//   git.fetch();
//
//   logger.info(`Checking out branch ${branch}`);
//   await git.checkout(branch);
//
//   logger.info(`starting tests`);
//   await runCommand(`cd ${testDir}; npm install`);
//   const testOutput = runCommand(`cd ${testDir};npm run test`);
// }
