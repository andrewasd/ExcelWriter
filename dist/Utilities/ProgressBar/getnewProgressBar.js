"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewProgressBar = void 0;
const chalk_1 = __importDefault(require("chalk"));
const cli_progress_1 = __importDefault(require("cli-progress"));
const getNewProgressBar = (text) => {
    return new cli_progress_1.default.SingleBar({
        format: `${text} [${chalk_1.default.bgHex("#4d1e3bff").hex("#FFFFFF")("{bar}")}] {percentage}% || {value}/{total}`,
        barCompleteChar: "█",
        barIncompleteChar: "░",
        hideCursor: true,
    }, cli_progress_1.default.Presets.legacy);
};
exports.getNewProgressBar = getNewProgressBar;
//# sourceMappingURL=getnewProgressBar.js.map