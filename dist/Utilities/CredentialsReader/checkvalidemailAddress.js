"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isvalidEmail = void 0;
const isvalidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return isValid;
};
exports.isvalidEmail = isvalidEmail;
//# sourceMappingURL=checkvalidemailAddress.js.map