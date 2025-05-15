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
exports.FileSelectorImpl = void 0;
const DiscoveryList_js_1 = require("../../Parameters/DiscoveryList.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ReadInput_js_1 = require("../ReadInput.js");
const ReadInputImpl_js_1 = require("../InputUtils/ReadInputImpl.js");
const DateUtils_js_1 = require("../DateUtils.js");
class FileSelectorImpl {
    constructor() {
        this.pathExport = "inputfiles/csvExportsCMDB";
        this.csvReportDir = "inputfiles/csvreport";
    }
    selectBL() {
        return __awaiter(this, arguments, void 0, function* (options = { multiple: false }) {
            let option = options;
            const blList = DiscoveryList_js_1.Discovery.getAmbientList();
            const input = new ReadInput_js_1.InputReader();
            const selectedbl = (yield input.readLine("Seleziona la BL", {
                list: blList,
                name: "BL Name",
                multiple: option.multiple,
            }));
            return selectedbl;
        });
    }
    getLatestExport() {
        const files = fs_1.default.readdirSync(this.pathExport).filter((file) => file.endsWith(".csv"));
        files
            .sort((a, b) => {
            const dateA = DateUtils_js_1.DateUtils.extractDateFromString(a);
            const dateB = DateUtils_js_1.DateUtils.extractDateFromString(b);
            return dateB.diff(dateA);
        });
        return path_1.default.join(this.pathExport, files[0]);
    }
    askUserExportFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs_1.default.readdirSync(this.pathExport).filter(file => file.endsWith(".csv"));
            files.sort((a, b) => {
                const dateA = DateUtils_js_1.DateUtils.extractDateFromString(a);
                const dateB = DateUtils_js_1.DateUtils.extractDateFromString(b);
                return dateB.diff(dateA);
            });
            const inputread = new ReadInputImpl_js_1.ReadInputImpl();
            const value = yield inputread.selectValue("Seleziona il file che vuoi", files, {
                multiple: false,
                limit: 5,
            });
            return path_1.default.join(this.pathExport, value);
        });
    }
    askUserDiscoveriesToSelect() {
        return __awaiter(this, arguments, void 0, function* (options = { blList: [] }) {
            let discoveries;
            if (options.blList.length == 0) {
                discoveries = DiscoveryList_js_1.Discovery.getDiscoveryList();
            }
            else {
                discoveries = Object.entries(new DiscoveryList_js_1.discoveryList())
                    .filter(([name, values]) => options.blList.includes(values.ambient))
                    .map(([name, values]) => name);
            }
            const input = new ReadInput_js_1.InputReader();
            const selectedDiscoveries = (yield input.readLine("Seleziona i discovery", {
                list: discoveries.concat("Indietro"),
                name: "discovery Name",
                multiple: true,
            }));
            return selectedDiscoveries;
        });
    }
    askUserFileToSelectFromDiscovery(discovery) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs_1.default.readdirSync(path_1.default.join(this.csvReportDir, discovery));
            files.sort((a, b) => {
                const dateA = DateUtils_js_1.DateUtils.extractDateFromString(a);
                const dateB = DateUtils_js_1.DateUtils.extractDateFromString(b);
                return dateA.diff(dateB);
            });
            const inputread = new ReadInputImpl_js_1.ReadInputImpl();
            const filename = yield inputread.selectValue("Seleziona il file", files, {
                multiple: false,
                limit: 5,
            });
            return path_1.default.join(this.csvReportDir, discovery, filename);
        });
    }
    autoselectLatestFileFromDiscovery(discovery) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs_1.default.readdirSync(`inputfiles/csvreport/${discovery}`);
            files.sort((a, b) => {
                const dateA = DateUtils_js_1.DateUtils.extractDateFromString(a);
                const dateB = DateUtils_js_1.DateUtils.extractDateFromString(b);
                return dateB.diff(dateA);
            });
            return path_1.default.join(this.csvReportDir, discovery, files[0]);
        });
    }
}
exports.FileSelectorImpl = FileSelectorImpl;
//# sourceMappingURL=FileSelectorImpl.js.map