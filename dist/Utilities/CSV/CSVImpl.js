"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVImpl = void 0;
const csv_stringify_1 = require("csv-stringify");
const csv_parse_1 = require("csv-parse");
const fs_1 = __importStar(require("fs"));
const stream_1 = require("stream");
class CSVImpl {
    createCSV(filepath, records) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                header: true,
            };
            return new Promise((resolve, reject) => {
                (0, csv_stringify_1.stringify)(records, options, (err, output) => {
                    if (err) {
                        console.error("Error stringifying data:", err);
                        return;
                    }
                    (0, fs_1.writeFile)(filepath, output, (err) => {
                        if (err) {
                            console.error("Error writing to CSV file:", err);
                        }
                        else {
                            console.log("CSV file has been saved.");
                            resolve();
                        }
                    });
                });
            });
        });
    }
    createCSV2(filepath, rows) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringifier = (0, csv_stringify_1.stringify)({
                delimiter: ",",
                quoted: true,
                header: true,
                columns: Object.keys(rows[0]),
            });
            const writer = fs_1.default.createWriteStream(filepath, { flags: "w" });
            for (const row of rows) {
                stringifier.write(row);
            }
            stringifier.end();
            try {
                yield (0, stream_1.pipeline)(stringifier, writer);
            }
            catch (err) {
                console.error(`Pipeline failed: ${err}`);
                throw err;
            }
        });
    }
    parseCSV(filepath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const delimiter = options ? options.delimiter : undefined;
            const result = [];
            const parser = fs_1.default
                .createReadStream(`${filepath}`)
                .pipe((0, csv_parse_1.parse)({ delimiter: delimiter }));
            let isFirstRecord = true;
            let headers = [];
            try {
                for (var _d = true, parser_1 = __asyncValues(parser), parser_1_1; parser_1_1 = yield parser_1.next(), _a = parser_1_1.done, !_a; _d = true) {
                    _c = parser_1_1.value;
                    _d = false;
                    const record = _c;
                    if (isFirstRecord) {
                        headers = record;
                        isFirstRecord = false;
                    }
                    else {
                        const recordObject = headers.reduce((acc, header, index) => {
                            acc[header] = record[index];
                            return acc;
                        }, {});
                        result.push(recordObject);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = parser_1.return)) yield _b.call(parser_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        });
    }
}
exports.CSVImpl = CSVImpl;
//# sourceMappingURL=CSVImpl.js.map