# ExcelWriter

[![npm version](https://img.shields.io/npm/v/excelwriter.svg)](https://www.npmjs.com/package/excelwriter)
[![license](https://img.shields.io/npm/l/excelwriter.svg)](https://github.com/yourusername/excelwriter/blob/main/LICENSE)

**ExcelWriter** is a simple and lightweight tool for generating Excel files programmatically.

---

## Installation

```bash
npm install excelwriter
```

or with Yarn:

```bash
yarn add excelwriter
```

---

## Usage

```javascript
import { ExcelWriter } from "excelwriter";

// Create a new Excel file
const file = new ExcelWriter();

// Add a worksheet
const sheet = file.addWorkSheet("SheetName");

// Write a row to the worksheet
sheet.writeRow(["value1", "value2", "valueN"]);

// Save the file
await file.close("filename.xlsx");
```

---

## API Reference

### `new ExcelWriter()`
Creates a new Excel file instance.

---

### `file.addWorkSheet(name: string)`
Adds a new worksheet to the file.

- **name**: The name of the worksheet.

Returns a `Sheet` object.

---

### `sheet.writeRow(values: string[])`
Writes a new row to the current worksheet.

- **values**: An array of strings representing the cell values.

---

### `file.close(filename: string)`
Saves and closes the Excel file.

- **filename**: The name of the output file (e.g., `myfile.xlsx`).

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [Andrei Nica](https://github.com/andrewasd).

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## Acknowledgments

Built with ❤️ to simplify Excel file creation.