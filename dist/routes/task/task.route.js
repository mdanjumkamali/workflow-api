"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../../controllers/task/task.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, task_controller_1.createTask);
router.get("/", auth_middleware_1.default, task_controller_1.getTasks);
router.put("/:id", auth_middleware_1.default, task_controller_1.updateTask);
router.delete("/:id", auth_middleware_1.default, task_controller_1.deleteTask);
exports.default = router;
