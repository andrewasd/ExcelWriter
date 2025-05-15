"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// add-js-extension.ts
const ts_morph_1 = require("ts-morph");
const project = new ts_morph_1.Project({
    tsConfigFilePath: "tsconfig.json",
});
const sourceFiles = project.getSourceFiles("src/**/*.ts");
sourceFiles.forEach((file) => {
    let changed = false;
    file.getImportDeclarations().forEach((importDecl) => {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();
        if (moduleSpecifier.startsWith(".") && !moduleSpecifier.endsWith(".js")) {
            importDecl.setModuleSpecifier(moduleSpecifier + ".js");
            changed = true;
        }
    });
    if (changed) {
        file.saveSync();
    }
});
console.log("✅ All .ts imports now have .js extensions.");
//# sourceMappingURL=tmp.js.map