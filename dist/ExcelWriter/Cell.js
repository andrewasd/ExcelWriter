"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
const Utils_js_1 = __importDefault(require("../Utilities/Utils.js"));
class Cell {
    constructor(cell) {
        this.cell = cell;
    }
    getColumn() {
        return this.cell.col;
    }
    getRow() {
        return this.cell.row;
    }
    getAdress() {
        return this.cell.address;
    }
    setStyle(style) {
        const { backgroundColor, foregroundColor, formatPercentual } = style;
        if (backgroundColor)
            this.setbackgroundColor(backgroundColor);
        if (foregroundColor)
            this.setforegroundColor(foregroundColor);
        if (formatPercentual)
            this.formatPercentual(formatPercentual);
    }
    formatPercentual(format) {
        if (format)
            this.cell.numFmt = "0.00%";
        else
            this.cell.numFmt = "";
    }
    write(value, style) {
        this.cell.value = value;
        if (style) {
            this.setStyle(style);
        }
    }
    getValue() {
        var _a;
        return ((_a = this.cell.value) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    }
    setbackgroundColor(hexstring) {
        this.cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: Utils_js_1.default.getArgbfromHex(hexstring) },
        };
    }
    setforegroundColor(hexstring) {
        this.cell.font = {
            name: "Arial Black",
            color: { argb: Utils_js_1.default.getArgbfromHex(hexstring) },
        };
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map