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
exports.Sheet = void 0;
const Utils_js_1 = __importDefault(require("../Utilities/Utils.js"));
const Cell_js_1 = require("./Cell.js");
const Position_js_1 = require("./Position/Position.js");
class Sheet {
    constructor(sheet) {
        /**
         *
         * @param {Exceljs.Worksheet} sheet
         * @param {String} rangeCell
         * @returns Cell[] References
         */
        this.selectRange = (rangeCell) => {
            let [startCell, endCell] = rangeCell.split(":");
            // Recalculate in case bottom left and top right are given
            if (endCell < startCell) {
                let temp = endCell;
                endCell = startCell;
                startCell = temp;
            }
            let [endCellColumn, endRow] = endCell.match(/[a-z]+|[^a-z]+/gi);
            let [startCellColumn, startRow] = startCell.match(/[a-z]+|[^a-z]+/gi);
            // Recalculate in case bottom left and top right are given
            if (endCellColumn < startCellColumn) {
                let temp = endCellColumn;
                endCellColumn = startCellColumn;
                startCellColumn = temp;
            }
            // Recalculate in case bottom left and top right are given
            if (endRow < startRow) {
                let temp = endRow;
                endRow = startRow;
                startRow = temp;
            }
            let endColumn = this.sheet.getColumn(endCellColumn);
            let startColumn = this.sheet.getColumn(startCellColumn);
            if (!endColumn)
                throw new Error("End column not found");
            if (!startColumn)
                throw new Error("Start column not found");
            const endColumnNumber = endColumn.number;
            const startColumnNumber = startColumn.number;
            const cells = [];
            for (let y = parseInt(startRow); y <= parseInt(endRow); y++) {
                const row = this.sheet.getRow(y);
                for (let x = startColumnNumber; x <= endColumnNumber; x++) {
                    cells.push(row.getCell(x));
                }
            }
            return cells.map((cell) => {
                return new Cell_js_1.Cell(cell);
            });
        };
        this.sheet = sheet;
        this.isheaderwritten = false;
    }
    getInternal() {
        return this.sheet;
    }
    setAutoFilter(range) {
        this.sheet.autoFilter = range;
    }
    getFreecolumnIndex(row) {
        if (row <= 0) {
            throw new Error(`row < 0`);
        }
        let i = 1;
        while (this.getCell({ r: row, c: i }).getValue() != "") {
            i++;
        }
        return i;
    }
    writeTable(initialPosition, table, style) {
        const { r, c } = new Position_js_1.Position(initialPosition, {
            isZeroIndexed: false,
        }).getRowCol();
        table.forEach((row, index) => this.writeHorrizontalRow({ r: r + index, c: c }, row));
    }
    applyConditionalFormatting(cf) {
        this.sheet.addConditionalFormatting(cf);
    }
    writeHorrizontalRow(initialPosition, row, style) {
        const { r, c } = new Position_js_1.Position(initialPosition, {
            isZeroIndexed: true,
        }).getRowCol();
        for (let i = 0; i < row.length; i++) {
            const cell = this.getCell({ x: c + i, y: r });
            cell.write(row[i]);
            const { backgroundColor, foregroundColor, formatPercentual } = style !== null && style !== void 0 ? style : {};
            if (formatPercentual && Utils_js_1.default.isNumber(row[i]))
                cell.formatPercentual(true);
            if (backgroundColor)
                cell.setbackgroundColor(backgroundColor);
            if (foregroundColor)
                cell.setforegroundColor(foregroundColor);
        }
    }
    getCells(...cells) {
        const cellList = new Array(cells.length);
        for (let i = 0; i < cells.length; i++) {
            cellList[i] = this.getCell(cells[i]);
        }
        return cellList;
    }
    AddFormatting(format) {
        this.sheet.addConditionalFormatting(format);
    }
    getCell(value) {
        const address = new Position_js_1.Position(value, { isZeroIndexed: true }).getAdress();
        return new Cell_js_1.Cell(this.sheet.getCell(address));
    }
    getCellbyRowColumn(row, column) {
        return new Cell_js_1.Cell(this.sheet.getCell(row));
    }
    getColumn(name) {
        const firstRow = this.sheet.getRow(1);
        const cellValues = Array.isArray(firstRow.values)
            ? firstRow.values
            : Object.values(firstRow.values);
        const columnNumber = cellValues.indexOf(String(name));
        if (columnNumber <= 0) {
            return [];
        }
        const column = [];
        this.sheet.getColumn(columnNumber).eachCell((cell) => {
            column.push(new Cell_js_1.Cell(cell));
        });
        column.shift();
        return column;
    }
    writeRow(row) {
        this.sheet.addRow(row);
    }
    writeRecord(record) {
        const keys = Object.keys(record);
        if (!this.isheaderwritten) {
            this.writeRow(keys);
            this.isheaderwritten = true;
        }
        this.writeRow(Object.values(record));
    }
    writeRows(rows) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const row of rows) {
                this.writeRow(row);
            }
        });
    }
    freezefirstrow() {
        this.sheet.views = [{ state: "frozen", ySplit: 1 }];
    }
    selectfirstRow() {
        let i = 0;
        const cells = [];
        while (this.getCell({ r: 0, c: i }).getValue() != "") {
            cells.push();
        }
        return new Array();
    }
    setBackgroundColor(range, hexcolor) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectRange(range).forEach((cell) => {
                cell.setbackgroundColor(hexcolor);
            });
        });
    }
    setForeGroundColor(range, hexcolor) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectRange(range).forEach((cell) => {
                cell.setforegroundColor(hexcolor);
            });
        });
    }
}
exports.Sheet = Sheet;
//# sourceMappingURL=Sheet.js.map