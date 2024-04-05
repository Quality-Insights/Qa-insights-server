import { inspect } from "util";
import { createLogger, format, transports } from "winston";
import Transport from "winston-transport";

/**
 * https://stackoverflow.com/a/41407246
 * Log level escpace codes
 */
const levelIdentifierMap: { [key: string]: string } = {
  error: "🐞",
  warn: "❗",
  info: "🧠",
  verbose: "💤",
  debug: "❓",
  silly: "👅",
};

const levelColorMap: Record<string, string> = {
  error: "\x1b[31m",
  warn: "\x1b[33m",
  info: "\x1b[94m",
  verbose: "\x1b[35m",
  debug: "\x1b[32m",
  silly: "\x1b[36m",
};

const BRIGHT_COLOR = "\x1b[1m";
const RESET_COLOR = "\x1b[0m";

export class ConsoleLogTransport extends Transport {
  log(info: any, callback: { (): void }) {
    const message =
      typeof info.message === "string" || info.message instanceof String
        ? info.message
        : inspect(info.message);
    const label =
      info.consoleLoggerOptions?.label || (info.level as string).toUpperCase();

    const finalMessage = `[${new Date().toISOString()}] [${
      levelIdentifierMap[info.level]
    } ${label}] ${message.replace(
      // eslint-disable-next-line no-control-regex
      /\x1B\[(:?0|39)m/g,
      levelColorMap[info.level],
    )}`;

    console.log(
      BRIGHT_COLOR + levelColorMap[info.level] + finalMessage + RESET_COLOR,
    );

    info.stack && console.log("\t", info.stack);
    callback();
  }
}
const logTransports = [
  new transports.File({
    level: "error",
    filename: "./logs/error.log",
    format: format.json({
      replacer: (key, value) => {
        if (key === "error") {
          return {
            message: (value as Error).message,
            stack: (value as Error).stack,
          };
        }
        return value;
      },
    }),
  }),
  new ConsoleLogTransport(),
];

const logger = createLogger({
  format: format.combine(format.timestamp()),
  transports: logTransports,
  defaultMeta: { service: "api" },
  level: process.env.LOG_LEVEL || "silly",
});

export function l(stringToks: TemplateStringsArray, ...arr: any[]) {
  const retLog =
    arr.reduce((str, item, index) => {
      return (
        str +
        stringToks[index] +
        inspect(item, { colors: true, depth: null, compact: false })
      );
    }, "") + stringToks[stringToks.length - 1];

  return retLog;
}

export default logger;

export function decolorize(str: string) {
  // eslint-disable-next-line no-control-regex
  return str.replaceAll(/\x1B(?:[@-Z\\-_]|[[0-?]*[ -/]*[@-~])/gi, "");
}
