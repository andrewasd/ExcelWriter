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
exports.ReadInputImpl = void 0;
const readline_1 = __importDefault(require("readline"));
const enquirer_1 = __importDefault(require("enquirer"));
const underscore_1 = require("underscore");
const DateUtils_js_1 = require("../DateUtils.js");
const Toggle = enquirer_1.default.Toggle;
const AutoComplete = enquirer_1.default.Toggle;
const AuthPrompt = enquirer_1.default.AuthPrompt;
class ReadInputImpl {
    constructor() {
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    selectValue(promptText_1, choices_1) {
        return __awaiter(this, arguments, void 0, function* (promptText, choices, config = { multiple: false, limit: 5 }) {
            let list;
            const map = new Map();
            let is_Array = false;
            if ((0, underscore_1.isArray)(choices)) {
                is_Array = true;
                if (choices.length == 0) {
                    console.log("No values provided");
                    return null;
                }
                list = choices;
            }
            else {
                const items = choices;
                list = this.createTextualInput(items.array, items.displayValue, {
                    sortBy: items.sortSelector,
                });
                for (const item of list) {
                    map.set(item.name, item.value);
                }
            }
            if (!config.multiple && list.length == 2) {
                const prompt = new Toggle({
                    message: promptText,
                    enabled: list[0],
                    disabled: list[1],
                });
                const result = yield prompt.run();
                return result;
            }
            const result = (yield new AutoComplete({
                message: promptText,
                limit: config.limit,
                initial: 0,
                choices: list,
                multiple: config.multiple,
            }).run());
            if (is_Array) {
                return result;
            }
            else {
                return result
                    .filter((item) => map.get(item))
                    .map((item) => map.get(item));
            }
        });
    }
    readline(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise((resolve) => {
                    this.rl.question(prompt, (answer) => {
                        resolve(answer);
                    });
                });
            }
            catch (e) {
                throw new Error(`error in reading line ${e}`);
            }
        });
    }
    askCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticate = (value, state) => {
                return value;
            };
            const CustomAuthPrompt = AuthPrompt.create(authenticate);
            const prompt = new CustomAuthPrompt({
                name: "password",
                message: "Please enter your password",
                username: "rajat-sr",
                password: "1234567",
                choices: [
                    { name: "username", message: "username" },
                    { name: "password", message: "password" },
                ],
            });
            const result = yield prompt.run();
            yield prompt.close();
            return result;
        });
    }
    createTextualInput(array, selector, options) {
        return array
            .sort((a, b) => {
            if (options === null || options === void 0 ? void 0 : options.sortBy) {
                const v1 = String(options.sortBy(a));
                const v2 = String(options.sortBy(b));
                const date1 = DateUtils_js_1.DateUtils.extractDateFromString(v1);
                const date2 = DateUtils_js_1.DateUtils.extractDateFromString(v2);
                if (date1.isValid() && date2.isValid()) {
                    return date2.toDate().getTime() - date1.toDate().getTime();
                }
                return v1.localeCompare(v2);
            }
            else {
                return 1;
            }
        })
            .map((item) => {
            return { name: selector(item), value: item };
        });
    }
}
exports.ReadInputImpl = ReadInputImpl;
//# sourceMappingURL=ReadInputImpl.js.map