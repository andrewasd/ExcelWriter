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
exports.Decompressor = void 0;
const path_1 = __importDefault(require("path"));
const decompress_1 = __importDefault(require("decompress"));
const fs_1 = __importDefault(require("fs"));
const Utils_js_1 = __importDefault(require("./Utils.js"));
const compressing_1 = __importDefault(require("compressing"));
const fsp = fs_1.default.promises;
class Decompressor {
    /**
     * unzip all the zip files present in the @path
     */
    static unzipAll(inputdir_1) {
        return __awaiter(this, arguments, void 0, function* (inputdir, { preserveFolder = false } = {}) {
            const zipFiles = (yield fsp.readdir(inputdir)).filter((filename) => filename.endsWith(".zip"));
            for (const filename of zipFiles) {
                const filepath = path_1.default.join(inputdir, filename);
                const outputFolder = !preserveFolder
                    ? inputdir
                    : path_1.default.join(inputdir, Utils_js_1.default.removeFileExtension(filename));
                if (preserveFolder) {
                    yield Utils_js_1.default.createDirectory(outputFolder);
                }
                yield (0, decompress_1.default)(filepath, outputFolder);
            }
        });
    }
    /**
     * compress everything in the folder
     */
    static zip(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            yield compressing_1.default.zip.compressDir(obj.dirpath, obj.output);
        });
    }
    static cleanAll(inputdir_1) {
        return __awaiter(this, arguments, void 0, function* (inputdir, { unnecessary = ["Settings", "Devices"] } = {}) {
            const files = fs_1.default.readdirSync(inputdir);
            const toremove = files.filter(file => unnecessary.some((keyword) => file.includes(keyword)));
            for (const file of toremove) {
                yield Utils_js_1.default.removeFile(path_1.default.join(inputdir, file));
            }
        });
    }
}
exports.Decompressor = Decompressor;
//# sourceMappingURL=decompress.js.map