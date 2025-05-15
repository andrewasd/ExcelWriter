import Utils from "../Utilities/Utils.js";
import ExcelS from "exceljs";

export type Cellstyle = {
  backgroundColor?: string;
  foregroundColor?: string;
  formatPercentual?: boolean;
};

export class Cell {

  private cell: ExcelS.Cell;
  constructor(cell: ExcelS.Cell) {
    this.cell = cell;
  }

  public getColumn() {
    return this.cell.col;
  }

  public getRow() {
    return this.cell.row;
  }

  public getAdress(): string {
    return this.cell.address;
  }

  public setStyle(style: Cellstyle) {
    const { backgroundColor, foregroundColor, formatPercentual } = style;

    if (backgroundColor) this.setbackgroundColor(backgroundColor);
    if (foregroundColor) this.setforegroundColor(foregroundColor);
    if (formatPercentual) this.formatPercentual(formatPercentual);
  }

  public formatPercentual(format: boolean) {
    if (format) this.cell.numFmt = "0.00%";
    else this.cell.numFmt = "";
  }

  public write(value: string | number, style?: Cellstyle) {
    this.cell.value = value;

    if (style) {
      this.setStyle(style);
    }
  }

  public getValue(): string {
    return this.cell.value?.toString() || "";
  }

  public setbackgroundColor(hexstring: string) {
    this.cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: Utils.getArgbfromHex(hexstring) },
    };
  }

  public setforegroundColor(hexstring: string) {
    this.cell.font = {
      name: "Arial Black",
      color: { argb: Utils.getArgbfromHex(hexstring) },
    };
  }
}
