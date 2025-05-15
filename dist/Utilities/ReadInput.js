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
exports.InputReader = void 0;
const readline_1 = __importDefault(require("readline"));
const underscore_1 = require("underscore");
const enquirer_1 = __importDefault(require("enquirer"));
const AutoComplete = enquirer_1.default.AutoComplete;
class InputReader {
    constructor() {
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    readLine(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options) {
                return new Promise((resolve) => {
                    this.rl.question(text, (answer) => {
                        resolve(answer);
                    });
                });
            }
            if (!options.multiple) {
                options.multiple = false;
            }
            let prompt;
            if ((0, underscore_1.isString)(options.list[0])) {
                prompt = new AutoComplete({
                    name: options.name,
                    message: text,
                    limit: 9,
                    initial: 0,
                    choices: options.list,
                    multiple: options.multiple,
                });
            }
            else {
                prompt = new AutoComplete({
                    name: options.name,
                    message: text,
                    limit: 9,
                    initial: 0,
                    choices: options.list.map((option) => {
                        return { name: option.displayValue, value: option.value };
                    }),
                    multiple: options.multiple,
                    result(names) {
                        return this.map(names);
                    },
                });
            }
            const result = prompt.run();
            if (!result) {
                throw new Error("undefined result");
            }
            return result;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rl.close();
        });
    }
}
exports.InputReader = InputReader;
//# sourceMappingURL=ReadInput.js.map