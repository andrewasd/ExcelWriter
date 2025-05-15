"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEmailCredentials = void 0;
const Utils_js_1 = __importDefault(require("../Utils.js"));
const readEmailCredentials = () => {
    return Utils_js_1.default.readJSONFile("credentials/emailBotCredentials.json");
};
exports.readEmailCredentials = readEmailCredentials;
//# sourceMappingURL=readEmailCredentials.js.map