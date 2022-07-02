"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gistSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Please add gist title'],
    },
    content: {
        type: String,
        required: [true, 'Please add gist content'],
    },
    public: {
        type: Boolean,
        required: [true, 'Please add visibility of the gist'],
    },
    author: {
        type: String,
        required: [true, 'Please add an author of the gist'],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Gist = mongoose_1.default.model('Gist', gistSchema);
exports.default = Gist;
//# sourceMappingURL=gistModel.js.map