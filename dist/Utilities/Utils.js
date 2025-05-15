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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dayjs_1 = __importDefault(require("dayjs"));
const crypto = __importStar(require("crypto"));
const util_1 = __importDefault(require("util"));
const fs_2 = require("fs");
const fs_3 = __importDefault(require("fs"));
const workerLogger_js_1 = require("./workerLogger.js");
const copyAsync = util_1.default.promisify(fs_1.default.copyFile);
const renameAsync = util_1.default.promisify(fs_1.default.rename);
const deleteAsync = util_1.default.promisify(fs_1.default.unlink);
class Utils {
    /**
     * read file using Streams
     */
    static readFile(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            return fs_2.promises.readFile(filepath, "utf8");
        });
    }
    static getCSVDiscoveryPath(discovery, order) {
        return `inputfiles/csvreport/${discovery}/${discovery}_${order}.csv`;
    }
    /**
     *
     * @param funkey function like object => duplicateproperty
     * @param merge  array of properties to merge if diffrent
     * @param array  without duplicates values
     * @returns array without duplicates value
     */
    /**
     * removes all files from a directory
     * @param path to directory
     */
    static EmptyDirectory(DIR_PATH) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.default
                    .readdirSync(DIR_PATH)
                    .filter((value) => __awaiter(this, void 0, void 0, function* () { return !(yield _a.fileExists(path_1.default.join(DIR_PATH, value))); }))
                    .forEach((file) => __awaiter(this, void 0, void 0, function* () {
                    yield _a.removeFile(path_1.default.join(DIR_PATH, file));
                }));
            }
            catch (error) {
                if (error.code == "ENOENT") {
                    return;
                }
                (0, workerLogger_js_1.logEvent)(`error in emptying directory ${JSON.stringify(error)}`);
                throw new Error(`error in emptying directory ${DIR_PATH} ${error}`);
            }
        });
    }
    /**
     *
     * @param dir
     * @returns the number of file in the directory specified
     * if the directory don't exist throw an Error
     */
    static getNumFilesinDir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_a.isDirectory(dir)) {
                return fs_2.promises.readdir(dir).then((result) => result.length);
            }
            throw new Error(`directory don't exist`);
        });
    }
    /**
     *
     * @param input
     * @returns a sha256 hash of the stringified input
     */
    static generateUniqueId(input) {
        const hash = crypto.createHash("sha256");
        hash.update(JSON.stringify(input).toLocaleLowerCase());
        return hash.digest("hex");
    }
    /**
     * convert a string in the format yyyy-mm-ddThh:mm:ss in dayjs format
     */
    static readtimeISO(str) {
        return (0, dayjs_1.default)(str, "YYYY-MM-DDTHH:mm:ssZ");
    }
    static getDuplicates(objects, selector) {
        const grouped = new Map();
        for (const item of objects) {
            const key = String(selector(item));
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key).push(item);
        }
        return Array.from(grouped.entries()).filter(([, items]) => items.length > 1);
    }
    /**
     *
     * @param num
     * @returns return string num and if num is < 0 , a string with 0 before
     */
    static addZero(num) {
        if (num > 9) {
            return num;
        }
        return String(num).padStart(2, "0");
    }
    static convertPercentualtoText(num, aproximation) {
        return (num * 100).toFixed(aproximation || 3);
    }
    /**
     *
     * @param str
     * @return str without leading zeroes
     */
    static removeLeadingZerofromString(str) {
        return str.replace(/^0+/, "");
    }
    /**
     *
     * @param str
     * @returns str without commas
     */
    static replacecommas(str) {
        if (!str) {
            throw new Error("type undefined");
        }
        return str.replace(/,/g, "-");
    }
    /**
     * create directory if not present
     * @param dir
     */
    static createDirectory(dir, empty = false) {
        if (!fs_3.default.existsSync(dir)) {
            fs_3.default.mkdirSync(dir, { recursive: true });
        }
        else {
            if (empty) {
                _a.EmptyDirectory(dir);
            }
        }
    }
    static moveFile(sourcePath, destinationPath) {
        return renameAsync(sourcePath, destinationPath);
    }
    static copyFile(sourcePath, destinationPath) {
        return copyAsync(sourcePath, destinationPath);
    }
    static isDirectory(path) {
        try {
            return fs_1.default.existsSync(path);
        }
        catch (_b) {
            return false;
        }
    }
    static areSameType(obj1, obj2) {
        if (typeof obj1 !== "object" ||
            typeof obj2 !== "object" ||
            obj1 === null ||
            obj2 === null) {
            return false;
        }
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            if (!keys2.includes(key))
                return false;
            const type1 = typeof obj1[key];
            const type2 = typeof obj2[key];
            if (type1 !== type2)
                return false;
            // Recursively check nested objects (but not arrays or functions)
            if (type1 === "object" &&
                !Array.isArray(obj1[key]) &&
                !Array.isArray(obj2[key]) &&
                obj1[key] !== null &&
                obj2[key] !== null) {
                if (!_a.areSameType(obj1[key], obj2[key]))
                    return false;
            }
        }
        return true;
    }
    static removeFileExtension(filename) {
        const lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex === -1) {
            return filename;
        }
        return filename.slice(0, lastDotIndex);
    }
    /**
     * return true if the  specificed file exists
     * @param filepath
     */
    static fileExists(filepath) {
        return fs_1.default.existsSync(filepath);
    }
    static createFile(filePath) {
        const dir = path_1.default.dirname(filePath);
        // Create directories recursively if they don't exist
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        // Create the file if it doesn't exist
        if (!fs_1.default.existsSync(filePath)) {
            fs_1.default.writeFileSync(filePath, "");
        }
    }
    static formatPercentual(num) {
        return (num * 100).toFixed(2);
    }
    static isNumber(value) {
        if (typeof value == "string") {
            return !isNaN(parseFloat(value));
        }
        return true;
    }
    static getArgbfromHex(str) {
        if (str.charAt(0) != "#") {
            console.log("error in coverting color");
            process.exit(1);
        }
        return `ff${str.substring(1)}`;
    }
    static readJSONFileAsync(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield _a.readFile(filepath);
            return JSON.parse(file);
        });
    }
    static readJSONFile(filepath) {
        const file = fs_1.default.readFileSync(filepath, "utf-8");
        return JSON.parse(file);
    }
}
_a = Utils;
Utils.removeFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteAsync(path);
    }
    catch (e) { }
});
Utils.removeDirectory = (path) => {
    fs_1.default.rmSync(path, { recursive: true, force: true });
};
exports.default = Utils;
//# sourceMappingURL=Utils.js.map