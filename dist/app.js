"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const route_1 = __importDefault(require("./route"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.json());
app.use(route_1.default);
app.listen(8888, () => {
    logger_1.default.info("Server is running on port 8888");
});
exports.default = app;
