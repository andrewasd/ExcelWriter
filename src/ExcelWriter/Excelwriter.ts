import ExcelS from "exceljs";
import { Sheet } from "./Sheet.js";
import path from "path";
import Utils from "../Utilities/Utils.js";

export class ExcelWriter {
  private workbook;
  private sheets: Record<string, Sheet> = {};
  private sheetCount: number;
  private filename?: string;

  constructor(filename?: string) {
    this.filename = filename;
    this.workbook = new ExcelS.Workbook();
    this.sheetCount = 0;
  }

  public addWorkSheet(workSheetName?: string): Sheet {
    if (!workSheetName) {
      workSheetName = `Sheet${this.sheetCount}`;
      this.sheetCount++;
    }

    return new Sheet(this.workbook.addWorksheet(workSheetName));
  }

  public getSheet(name: string): Sheet {
    return this.sheets[name];
  }

  async close(filename?: string): Promise<void> {
    const name = !this.filename ? filename || "untitled.xlsx" : this.filename;

    const dir = path.dirname(name);

    if (!Utils.isDirectory(dir)) {
      Utils.createDirectory(dir);
    }

    this.workbook.xlsx
      .writeFile(name)
      .then()
      .catch((error) => console.log(`error ${error}`));
  }

  /**
   *
   * @param num
   * @returns the num converted in letter es 1 => A, 2 => B
   */
  static getcolumnName(num: number): string {
    let letters = "";
    while (num >= 0) {
      letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[num % 26] + letters;
      num = Math.floor(num / 26) - 1;
    }
    return letters;
  }
}
