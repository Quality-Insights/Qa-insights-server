"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decolorize = exports.l = exports.ConsoleLogTransport = void 0;
const util_1 = require("util");
const winston_1 = require("winston");
const winston_transport_1 = __importDefault(require("winston-transport"));
/**
 * https://stackoverflow.com/a/41407246
 * Log level escpace codes
 */
const levelIdentifierMap = {
    error: "🐞",
    warn: "❗",
    info: "🧠",
    verbose: "💤",
    debug: "❓",
    silly: "👅",
};
const levelColorMap = {
    error: "\x1b[31m",
    warn: "\x1b[33m",
    info: "\x1b[94m",
    verbose: "\x1b[35m",
    debug: "\x1b[32m",
    silly: "\x1b[36m",
};
const BRIGHT_COLOR = "\x1b[1m";
const RESET_COLOR = "\x1b[0m";
class ConsoleLogTransport extends winston_transport_1.default {
    log(info, callback) {
        const message = typeof info.message === "string" || info.message instanceof String
            ? info.message
            : (0, util_1.inspect)(info.message);
        const label = info.consoleLoggerOptions?.label || info.level.toUpperCase();
        const finalMessage = `[${new Date().toISOString()}] [${levelIdentifierMap[info.level]} ${label}] ${message.replace(
        // eslint-disable-next-line no-control-regex
        /\x1B\[(:?0|39)m/g, levelColorMap[info.level])}`;
        console.log(BRIGHT_COLOR + levelColorMap[info.level] + finalMessage + RESET_COLOR);
        info.stack && console.log("\t", info.stack);
        callback();
    }
}
exports.ConsoleLogTransport = ConsoleLogTransport;
const logTransports = [new ConsoleLogTransport()];
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp()),
    transports: logTransports,
    defaultMeta: { service: "api" },
    level: process.env.LOG_LEVEL || "silly",
});
function l(stringToks, ...arr) {
    const retLog = arr.reduce((str, item, index) => {
        return (str +
            stringToks[index] +
            (0, util_1.inspect)(item, { colors: true, depth: null, compact: false }));
    }, "") + stringToks[stringToks.length - 1];
    return retLog;
}
exports.l = l;
exports.default = logger;
function decolorize(str) {
    // eslint-disable-next-line no-control-regex
    return str.replaceAll(/\x1B(?:[@-Z\\-_]|[[0-?]*[ -/]*[@-~])/gi, "");
}
exports.decolorize = decolorize;
