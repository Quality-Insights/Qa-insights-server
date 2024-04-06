"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const serverlessHandler = (0, serverless_http_1.default)(app);
async function handler(event, context) {
    const result = await serverlessHandler(event, context);
    return result;
}
exports.handler = handler;
