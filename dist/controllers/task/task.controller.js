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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const task_model_1 = require("../../models/task/task.model");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, status, priority, deadline } = req.body;
        const task = new task_model_1.Task({
            title,
            description,
            status,
            priority,
            deadline,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        yield task.save();
        res.status(201).json({ message: "Task created successfully", task });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.id) {
            return res
                .status(400)
                .json({ message: "User ID is missing from the request" });
        }
        const tasks = yield task_model_1.Task.find({ user: req.user.id });
        res.json({ tasks });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, status, priority, deadline } = req.body;
        const task = yield task_model_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(403).json({ message: "Not authorized" });
        }
        task.title = title;
        task.description = description;
        task.status = status;
        task.priority = priority;
        task.deadline = deadline;
        yield task.save();
        res.json({ message: "Task updated successfully", task });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const task = yield task_model_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(403).json({ message: "Not authorized" });
        }
        yield task_model_1.Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteTask = deleteTask;
