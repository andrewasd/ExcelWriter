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
const fs_1 = __importDefault(require("fs"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Read the input file and split it into an array of keys
    const filepath = "inputfiles/todelete.txt";
    const outputfile = "output/KeyTool/iql.txt";
    const attributeName = "KEY";
    console.log("analizing", filepath);
    const keys = fs_1.default
        .readFileSync(filepath, { encoding: "utf8", flag: "r" })
        .split("\n");
    // Create an output stream
    const output = fs_1.default.createWriteStream(outputfile);
    // Filter out empty keys and remove line breaks
    const filteredKeys = keys
        .filter((key) => key.trim() !== "")
        .map((key) => key.replace(/\r|\n/g, ""));
    // Generate the filter condition for keys
    const filterCondition = filteredKeys
        .map((key) => `${attributeName} = "${key}"`)
        .join(" OR\n ");
    const result = `ObjectType == Host AND\n(${filterCondition})`;
    console.log("file result in ", outputfile);
    yield output.write(result);
    // Close the output stream
    output.close();
});
main();
//# sourceMappingURL=KeyConverter.js.map