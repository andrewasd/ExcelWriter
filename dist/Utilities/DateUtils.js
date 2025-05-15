"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class DateUtils {
    /**
     * @return a list of italian months
     */
    static getItalianMonths() {
        return [
            "GENNAIO",
            "FEBBRAIO",
            "MARZO",
            "APRILE",
            "MAGGIO",
            "GIUGNO",
            "LUGLIO",
            "AGOSTO",
            "SETTEMBRE",
            "OTTOBRE",
            "NOVEMBRE",
            "DICEMBRE"
        ];
    }
    static extractDateFromString(str) {
        // Define the regex to match the date in YYYY-MM-DD format
        const dateRegex = [
            {
                format: "YYYY-MM-DD",
                regex: /\d{4}-\d{2}-\d{2}/,
            },
            {
                format: "DD-MM-YYYY",
                regex: /\d{2}-\d{2}-\d{4}/,
            },
        ];
        for (const regex of dateRegex) {
            const match = str.match(regex.regex);
            if (match != null) {
                return (0, dayjs_1.default)(match[0], regex.format);
            }
        }
        return (0, dayjs_1.default)("invalid date");
    }
}
exports.DateUtils = DateUtils;
//# sourceMappingURL=DateUtils.js.map