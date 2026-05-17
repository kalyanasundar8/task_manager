import express from "express";
import { TaskController } from "./task.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const taskRoute = express.Router();

taskRoute.post("/", authMiddleware, TaskController.createTask);
taskRoute.get("/tasks", authMiddleware, TaskController.getTasks);

export default taskRoute;
