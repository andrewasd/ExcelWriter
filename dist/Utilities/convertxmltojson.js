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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const XMLFolderManager_js_1 = require("../XMLFolderManager/XMLFolderManager.js");
const ReadInput_js_1 = require("./ReadInput.js");
const FromXMLCreator_js_1 = require("../CMDB/Host/HostFactory/FromXML/FromXMLCreator.js");
const decompress_js_1 = require("./decompress.js");
const Utils_js_1 = __importDefault(require("./Utils.js"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const OUTPUT_DIR = "output/json";
    const xmlfolderManager = new XMLFolderManager_js_1.XMLFolderManager();
    const discoveryList = xmlfolderManager.readDiscoveryList();
    const inputreader = new ReadInput_js_1.InputReader();
    const selectedDiscovery = (yield inputreader.readLine("Seleziona i discovery che vuoi convertire", {
        list: discoveryList,
        name: "discovery",
        multiple: true,
    }));
    yield Utils_js_1.default.EmptyDirectory("output/json");
    for (const discovery of selectedDiscovery) {
        yield decompress_js_1.Decompressor.unzipAll(`inputfiles/xml/discovery/${discovery}`);
        yield decompress_js_1.Decompressor.cleanAll(`inputfiles/xml/discovery/${discovery}`);
        const hosts = yield readHostsbyFiles(discovery);
        for (const [file, hostsfile] of Object.entries(hosts)) {
            hostsfile.forEach((host) => {
                delete host.Applications;
                delete host.ApplicationServices;
                // delete host.FileSystem;
                delete host.ReferencedHosts;
                delete host.StorageDevice;
                // delete host.CPUs;
                delete host.NetworkInterfaces;
                delete host.Patches;
                delete host.Users;
                delete host.ConnectedDevices;
                delete host.Groups;
            });
            if (hostsfile.length > 0) {
                const filepath = path_1.default.join(OUTPUT_DIR, `${file}.json`);
                const fileoutput = fs_1.default.createWriteStream(filepath);
                yield fileoutput.write(JSON.stringify(hostsfile));
                console.log(`created ${filepath}, nr host ${hostsfile.length}`);
            }
        }
    }
}))();
function readHostsbyFiles(discovery) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const xmlparser = new FromXMLCreator_js_1.XMLParse();
        const files = fs_1.default
            .readdirSync(`inputfiles/xml/discovery/${discovery}`)
            .filter((file) => file.endsWith(".xml"));
        const result = {};
        try {
            for (var _d = true, files_1 = __asyncValues(files), files_1_1; files_1_1 = yield files_1.next(), _a = files_1_1.done, !_a; _d = true) {
                _c = files_1_1.value;
                _d = false;
                const file = _c;
                const hosts = yield xmlparser.parseData(`inputfiles/xml/discovery/${discovery}/${file}`, { applications: true });
                result[file] = hosts;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = files_1.return)) yield _b.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    });
}
//# sourceMappingURL=convertxmltojson.js.map