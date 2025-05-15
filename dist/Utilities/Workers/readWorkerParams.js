"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkerParams = void 0;
const worker_threads_1 = require("worker_threads");
const getWorkerParams = () => {
    return worker_threads_1.workerData;
};
exports.getWorkerParams = getWorkerParams;
//# sourceMappingURL=readWorkerParams.js.map