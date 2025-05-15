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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCSVfromPath = void 0;
const CSVImpl_js_1 = require("./CSVImpl.js");
const readCSVfromPath = (filepath, delimiter) => __awaiter(void 0, void 0, void 0, function* () {
    const csv = new CSVImpl_js_1.CSVImpl();
    return yield csv.parseCSV(filepath, { delimiter: delimiter });
});
exports.readCSVfromPath = readCSVfromPath;
//# sourceMappingURL=readCSV.js.map