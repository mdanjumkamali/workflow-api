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
exports.Login = exports.SignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../../models/user/user.model");
// Sign up
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const validateEmail = yield user_model_1.User.findOne({ email });
        if (validateEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPass = yield bcryptjs_1.default.hash(password, 10);
        const user = yield user_model_1.User.create({
            name,
            email,
            password: hashPass,
        });
        return res.status(201).json({
            message: "User created successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error("SignUp error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.SignUp = SignUp;
// Login
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const validPass = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.Login = Login;
