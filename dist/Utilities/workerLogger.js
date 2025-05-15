"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = void 0;
const worker_threads_1 = require("worker_threads");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * The function does:
 * 1) Logs a message to the console.
 * 2) Sends a message to the worker thread if available.
 * 3) Logs a message to the provided file path if available.
 *
 * @param message - The message to be logged.
 */
const logEvent = (msg, options) => {
    console.log(msg);
    if (worker_threads_1.parentPort) {
        worker_threads_1.parentPort.postMessage({ message: msg, isError: options === null || options === void 0 ? void 0 : options.isError });
    }
    if (options === null || options === void 0 ? void 0 : options.filepath) {
        writeToLogFile(msg, options.filepath);
    }
};
exports.logEvent = logEvent;
const writeToLogFile = (msg, filepath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = path_1.default.dirname(filepath);
        // Ensure the directory exists
        yield fs_1.default.promises.mkdir(dir, { recursive: true });
        // Append message to file with timestamp
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${msg}\n`;
        yield fs_1.default.promises.appendFile(filepath, logMessage);
    }
    catch (error) {
        console.error(`Error writing to log file ${filepath}:`, error);
    }
});
//# sourceMappingURL=workerLogger.js.map