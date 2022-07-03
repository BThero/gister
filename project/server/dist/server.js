"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
(0, db_1.connectDB)();
app_1.default.listen(process.env.PORT || 80);
//# sourceMappingURL=server.js.map