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
exports.ExcelWriter = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const Sheet_js_1 = require("./Sheet.js");
const path_1 = __importDefault(require("path"));
const Utils_js_1 = __importDefault(require("../Utilities/Utils.js"));
class ExcelWriter {
    constructor(filename) {
        this.sheets = {};
        this.filename = filename;
        this.workbook = new exceljs_1.default.Workbook();
        this.sheetCount = 0;
    }
    addWorkSheet(workSheetName) {
        if (!workSheetName) {
            workSheetName = `Sheet${this.sheetCount}`;
            this.sheetCount++;
        }
        return new Sheet_js_1.Sheet(this.workbook.addWorksheet(workSheetName));
    }
    getSheet(name) {
        return this.sheets[name];
    }
    close(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = !this.filename ? filename || "untitled.xlsx" : this.filename;
            const dir = path_1.default.dirname(name);
            if (!Utils_js_1.default.isDirectory(dir)) {
                Utils_js_1.default.createDirectory(dir);
            }
            this.workbook.xlsx
                .writeFile(name)
                .then()
                .catch((error) => console.log(`error ${error}`));
        });
    }
    /**
     *
     * @param num
     * @returns the num converted in letter es 1 => A, 2 => B
     */
    static getcolumnName(num) {
        let letters = "";
        while (num >= 0) {
            letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters;
            num = Math.floor(num / 26) - 1;
        }
        return letters;
    }
}
exports.ExcelWriter = ExcelWriter;
//# sourceMappingURL=Excelwriter.js.map