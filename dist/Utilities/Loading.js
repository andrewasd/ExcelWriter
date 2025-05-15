"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const loading_cli_1 = __importDefault(require("loading-cli"));
class Loading {
    //.oO°Oo.
    // /-\\|
    constructor(text) {
        this.animation1 = ".oO°Oo.";
        this.load = (0, loading_cli_1.default)({
            text: text,
            color: "yellow",
            interval: 100,
            stream: process.stdout,
            frames: this.animation1.split(""),
        });
    }
    start() {
        this.load.start();
    }
    stop() {
        this.load.stop();
    }
}
exports.Loading = Loading;
//# sourceMappingURL=Loading.js.map