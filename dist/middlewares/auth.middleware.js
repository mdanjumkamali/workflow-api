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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user/user.model");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "")) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.token);
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization token not provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded !== "object" || !decoded.id) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = yield user_model_1.User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = {
            id: user.id,
            email: user.email,
        };
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.default = authMiddleware;
