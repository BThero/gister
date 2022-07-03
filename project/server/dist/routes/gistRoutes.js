"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const gistController_1 = require("../controllers/gistController");
const router = express_1.default.Router();
router.route('/public').get(authMiddleware_1.protect, gistController_1.getPublicGists);
router.route('/public/:search').get(authMiddleware_1.protect, gistController_1.getPublicGists);
router.route('/').get(authMiddleware_1.protect, gistController_1.getMyGists).post(authMiddleware_1.protect, gistController_1.setGist);
router.route('/:id').put(authMiddleware_1.protect, gistController_1.updateGist).delete(authMiddleware_1.protect, gistController_1.deleteGist);
exports.default = router;
//# sourceMappingURL=gistRoutes.js.map