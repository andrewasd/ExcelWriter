"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
class Position {
    constructor(position, { isZeroIndexed = true }) {
        this.isZeroIndexed = isZeroIndexed;
        //XY
        if (typeof position == "object" && "x" in position && "y" in position) {
            this.XY = { x: position.x, y: position.y };
            return;
        }
        //RC
        if (typeof position == "object" &&
            "r" in position &&
            "c" in position) {
            this.XY = Position.RCtoXY(position);
            return;
        }
        //address
        if (typeof position == "string" && Position.isExcelCoordinate(position)) {
            this.XY = Position.addressToXY(position);
            return;
        }
        throw new Error("Invalid input");
    }
    getXY() {
        return this.XY;
    }
    getRowCol() {
        return Position.XYtoRC(this.XY);
    }
    getAdress() {
        return Position.XYtoAddress(this.XY, { zeroIndexed: this.isZeroIndexed });
    }
    static isXY(object) {
        return typeof object == "object" && "x" in object && "y" in object;
    }
    static isRC(object) {
        return typeof object == "object" && "row" in object && "column" in object;
    }
    static isExcelCoordinate(s) {
        return /^[A-Z]+[0-9]+$/.test(s);
    }
    static XYtoAddress(position, { zeroIndexed = false } = {}) {
        const colName = zeroIndexed
            ? Position.numToColName(position.x + 1)
            : Position.numToColName(position.x);
        const row = zeroIndexed ? position.y + 1 : position.y;
        return colName + row;
    }
    static addressToXY(cellAddress, { zeroIndexed = false } = {}) {
        let col = 0, row = 0;
        let i = 0;
        const length = cellAddress.length;
        for (; i < length; i++) {
            const c = cellAddress.charCodeAt(i);
            if (c >= 65 && c <= 90) {
                col = col * 26 + (c - 64);
            }
            else if (c >= 48 && c <= 57) {
                row = row * 10 + (c - 48);
            }
            else {
                break;
            }
        }
        const x = zeroIndexed ? col - 1 : col;
        const y = zeroIndexed ? row - 1 : row;
        return { x, y };
    }
    static RCtoXY(position, { zeroIndexed = false } = {}) {
        const x = zeroIndexed ? position.c + 1 : position.c;
        const y = zeroIndexed ? position.r + 1 : position.r;
        return { x, y };
    }
    static XYtoRC(position, { zeroIndexed = false } = {}) {
        const col = zeroIndexed ? position.x + 1 : position.x;
        const row = zeroIndexed ? position.y + 1 : position.y;
        return { r: row, c: col };
    }
    /**
     *
     * @param colNum
     * @returns if 1 = return A, IF 2 = RETURN B etc.
     * 1 indexed
     */
    static numToColName(colNum) {
        let colName = "";
        while (colNum > 0) {
            const remainder = (colNum - 1) % 26;
            colName = String.fromCharCode(65 + remainder) + colName;
            colNum = Math.floor((colNum - remainder) / 26);
        }
        return colName;
    }
}
exports.Position = Position;
//# sourceMappingURL=Position.js.map