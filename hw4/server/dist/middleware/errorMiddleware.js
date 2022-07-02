"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (!res.statusCode) {
        res.status(500);
    }
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map