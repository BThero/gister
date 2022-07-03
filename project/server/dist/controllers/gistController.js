"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGist = exports.updateGist = exports.setGist = exports.getPublicGists = exports.getMyGists = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const gistModel_1 = __importDefault(require("../models/gistModel"));
const getPublicGists = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.params.search;
    console.log('GET public', search);
    const gists = yield gistModel_1.default.find({
        public: true,
        $or: [
            {
                title: {
                    $regex: search || '',
                    $options: 'i',
                },
            },
            {
                author: {
                    $regex: search || '',
                    $options: 'i',
                },
            },
        ],
    });
    res.status(200).json(gists);
}));
exports.getPublicGists = getPublicGists;
const getMyGists = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gists = yield gistModel_1.default.find({
        user: req.user.id,
    });
    res.status(200).json(gists);
}));
exports.getMyGists = getMyGists;
const setGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title ||
        req.body.content === undefined ||
        req.body.public === undefined) {
        res.status(400);
        throw new Error('Please add a title, content and public');
    }
    const gist = yield gistModel_1.default.create({
        title: req.body.title,
        content: req.body.content,
        public: req.body.public,
        author: req.user.name,
        user: req.user.id,
    });
    res.status(200).json(gist);
}));
exports.setGist = setGist;
const updateGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gist = yield gistModel_1.default.findById(req.params.id);
    if (!gist) {
        res.status(400);
        throw new Error('Gist not found');
    }
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    if (gist.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    const updatedGist = yield gistModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedGist);
}));
exports.updateGist = updateGist;
const deleteGist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gist = yield gistModel_1.default.findById(req.params.id);
    if (!gist) {
        res.status(400);
        throw new Error('Gist not found');
    }
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    if (gist.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    yield gist.remove();
    res.status(200).json({ id: req.params.id });
}));
exports.deleteGist = deleteGist;
//# sourceMappingURL=gistController.js.map