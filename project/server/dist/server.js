"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const gistRoutes_js_1 = __importDefault(require("./routes/gistRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = 4000;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/gists', gistRoutes_js_1.default);
app.use('/api/users', userRoutes_js_1.default);
app.use(errorMiddleware_1.errorHandler);
app.listen(port);
module.exports = app;
//# sourceMappingURL=server.js.map