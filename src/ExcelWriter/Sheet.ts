import ExcelS from "exceljs";
import Utils from "../Utilities/Utils.js";
import { Cell, Cellstyle } from "./Cell.js";
import { Position, RC, XY } from "./Position/Position.js";

export class Sheet {
  private sheet: ExcelS.Worksheet;
  private isheaderwritten: boolean;

  constructor(sheet: ExcelS.Worksheet) {
    this.sheet = sheet;
    this.isheaderwritten = false;
  }

  public getInternal() {
    return this.sheet;
  }

  public setAutoFilter(range: string) {
    this.sheet.autoFilter = range;
  }

  public getFreecolumnIndex(row: number): number {
    if (row <= 0) {
      throw new Error(`row < 0`);
    }

    let i = 1;
    while (this.getCell({ r: row, c: i }).getValue() != "") {
      i++;
    }

    return i;
  }

  public writeTable(
    initialPosition: XY | RC | string,
    table: string[][],
    style?: Cellstyle
  ) {
    const { r, c } = new Position(initialPosition, {
      isZeroIndexed: false,
    }).getRowCol();
    table.forEach((row, index) =>
      this.writeHorrizontalRow({ r: r + index, c: c }, row)
    );
  }

  public applyConditionalFormatting(cf: ExcelS.ConditionalFormattingOptions) {
    this.sheet.addConditionalFormatting(cf);
  }

  public writeHorrizontalRow(
    initialPosition: XY | RC | string,
    row: (string | number)[],
    style?: Cellstyle
  ) {
    const { r, c } = new Position(initialPosition, {
      isZeroIndexed: true,
    }).getRowCol();

    for (let i = 0; i < row.length; i++) {
      const cell = this.getCell({ x: c + i, y: r });
      cell.write(row[i]);

      const { backgroundColor, foregroundColor, formatPercentual } =
        style ?? {};

      if (formatPercentual && Utils.isNumber(row[i]))
        cell.formatPercentual(true);
      if (backgroundColor) cell.setbackgroundColor(backgroundColor);
      if (foregroundColor) cell.setforegroundColor(foregroundColor);
    }
  }

  public getCells(...cells: string[]): Cell[] {
    const cellList: Cell[] = new Array(cells.length);

    for (let i = 0; i < cells.length; i++) {
      cellList[i] = this.getCell(cells[i]);
    }

    return cellList;
  }

  public AddFormatting(format: ExcelS.ConditionalFormattingOptions) {
    this.sheet.addConditionalFormatting(format);
  }

  public getCell(value: XY | RC | string): Cell {
    const address = new Position(value, { isZeroIndexed: true }).getAdress();
    return new Cell(this.sheet.getCell(address));
  }

  public getCellbyRowColumn(row: number, column: number): Cell {
    return new Cell(this.sheet.getCell(row));
  }

  public getColumn(name: string | number): Cell[] {
    const firstRow = this.sheet.getRow(1);
    const cellValues = Array.isArray(firstRow.values)
      ? firstRow.values
      : Object.values(firstRow.values);
    const columnNumber = cellValues.indexOf(String(name));

    if (columnNumber <= 0) {
      return [];
    }

    const column: Cell[] = [];
    this.sheet.getColumn(columnNumber).eachCell((cell) => {
      column.push(new Cell(cell));
    });

    column.shift();
    return column;
  }

  public writeRow(
    row: (string | number | boolean)[] | Record<string, string | number | null>
  ) {
    this.sheet.addRow(row);
  }

  public writeRecord(record: Record<string, string | number | boolean>) {
    const keys = Object.keys(record);

    if (!this.isheaderwritten) {
      this.writeRow(keys);
      this.isheaderwritten = true;
    }

    this.writeRow(Object.values(record));
  }

  public async writeRows(rows: (string | number)[][]): Promise<void> {
    for (const row of rows) {
      this.writeRow(row);
    }
  }

  public freezefirstrow(): void {
    this.sheet.views = [{ state: "frozen", ySplit: 1 }];
  }

  public selectfirstRow(): Cell[] {
    let i = 0;
    const cells = [];

    while (this.getCell({ r: 0, c: i }).getValue() != "") {
      cells.push();
    }

    return new Array();
  }

  public async setBackgroundColor(range: string, hexcolor: string) {
    this.selectRange(range).forEach((cell) => {
      cell.setbackgroundColor(hexcolor);
    });
  }

  public async setForeGroundColor(range: string, hexcolor: string) {
    this.selectRange(range).forEach((cell) => {
      cell.setforegroundColor(hexcolor);
    });
  }

  /**
   *
   * @param {Exceljs.Worksheet} sheet
   * @param {String} rangeCell
   * @returns Cell[] References
   */
  public selectRange = (rangeCell: string): Cell[] => {
    let [startCell, endCell] = rangeCell.split(":");

    // Recalculate in case bottom left and top right are given
    if (endCell < startCell) {
      let temp = endCell;
      endCell = startCell;
      startCell = temp;
    }

    let [endCellColumn, endRow] = endCell.match(/[a-z]+|[^a-z]+/gi) as string[];
    let [startCellColumn, startRow] = startCell.match(
      /[a-z]+|[^a-z]+/gi
    ) as string[];

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

    if (!endColumn) throw new Error("End column not found");
    if (!startColumn) throw new Error("Start column not found");

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
      return new Cell(cell);
    });
  };
}
