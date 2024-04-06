"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureExists = void 0;
const fs_1 = __importDefault(require("fs"));
async function ensureExists(path) {
    const exists = fs_1.default.existsSync(path);
    if (!exists) {
        fs_1.default.mkdirSync(path, { recursive: true });
    }
}
exports.ensureExists = ensureExists;
