"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logDebug = (message) => {
    const stringifiedMsg = JSON.stringify(message);
    const formattedMsg = chalk_1.default.yellow.bold(`DEBUG ${stringifiedMsg}`);
    console.log(`${formattedMsg}`);
};
exports.logDebug = logDebug;
//# sourceMappingURL=logDebug.js.map