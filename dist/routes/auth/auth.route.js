"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../../controllers/auth/auth.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.SignUp);
router.post("/login", auth_controller_1.Login);
exports.default = router;
