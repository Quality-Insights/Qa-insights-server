"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_DIR = void 0;
const path_1 = require("path");
exports.TEST_DIR = (0, path_1.join)(process.env.HOME || "", "test-data");
console.log(exports.TEST_DIR);
