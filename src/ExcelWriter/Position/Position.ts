export class Position {
  private XY: XY;
  private isZeroIndexed:boolean;

  constructor(position: RC | XY | string , {isZeroIndexed=true}) {
    this.isZeroIndexed = isZeroIndexed;

    //XY
    if (typeof position == "object" && "x" in position && "y" in position) {
      this.XY = { x: position.x, y: position.y };

      return;
    }

    //RC
    if (
      typeof position == "object" &&
      "r" in position &&
      "c" in position
    ) {
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

  public getXY(): XY {
    return this.XY;
  }
  public getRowCol(): RC {
    return Position.XYtoRC(this.XY);
  }

  public getAdress(): string {
    return Position.XYtoAddress(this.XY,{zeroIndexed:this.isZeroIndexed});
  }

  public static isXY(object: any) {
    return typeof object == "object" && "x" in object && "y" in object;
  }

  public static isRC(object: any) {
    return typeof object == "object" && "row" in object && "column" in object;
  }

  public static isExcelCoordinate(s: string): boolean {
    return /^[A-Z]+[0-9]+$/.test(s);
  }

  public static XYtoAddress(
    position: XY,
    { zeroIndexed = false } = {}
  ): string {
    const colName = zeroIndexed
      ? Position.numToColName(position.x + 1)
      : Position.numToColName(position.x);
    const row = zeroIndexed ? position.y + 1 : position.y;

    return colName + row;
  }

  public static addressToXY(
    cellAddress: string,
    { zeroIndexed = false } = {}
  ): XY {
    let col = 0,
      row = 0;
    let i = 0;
    const length = cellAddress.length;
    for (; i < length; i++) {
      const c = cellAddress.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        col = col * 26 + (c - 64);
      } else if (c >= 48 && c <= 57) {
        row = row * 10 + (c - 48);
      } else {
        break;
      }
    }

    const x = zeroIndexed ? col - 1 : col;
    const y = zeroIndexed ? row - 1 : row;
    return { x, y };
  }

  public static RCtoXY(position: RC, { zeroIndexed = false } = {}): XY {
    const x = zeroIndexed ? position.c + 1 : position.c;
    const y = zeroIndexed ? position.r + 1 : position.r;

    return { x, y };
  }

  public static XYtoRC(position: XY, { zeroIndexed = false } = {}): RC {
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
  public static numToColName(colNum: number): string {
    let colName = "";
    while (colNum > 0) {
      const remainder = (colNum - 1) % 26;
      colName = String.fromCharCode(65 + remainder) + colName;
      colNum = Math.floor((colNum - remainder) / 26);
    }
    return colName;
  }
}
export type XY = {
  x: number;
  y: number;
};

export type RC = {
  r: number;
  c: number;
};
