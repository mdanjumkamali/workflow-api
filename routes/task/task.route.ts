import e, { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../../controllers/task/task.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
