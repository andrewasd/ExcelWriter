"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUtils = void 0;
class SetUtils {
    static isSame(A, B) {
        const A_str = Array.from(A).map((item) => JSON.stringify(item));
        const B_str = Array.from(B).map((item) => JSON.stringify(item));
        return A_str.every((item) => B_str.includes(item));
    }
}
exports.SetUtils = SetUtils;
//# sourceMappingURL=SetUtils.js.map