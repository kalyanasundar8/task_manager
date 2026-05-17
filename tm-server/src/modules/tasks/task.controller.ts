import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { TaskService } from "./task.service.js";
import { redis } from "../../config/redis.connect.js";

export class TaskController {
  static createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = req.body;
      req.user = req.user as { id: string };
      const currentUserId = req.user.id;
      const task = await TaskService.createTask(data, currentUserId);

      // Invalidate assignee's task cache
      if (data.assignedTo) {
        await redis.del(`tasks:${data.assignedTo}`);
      }

      res.status(201).json({ message: "Task created", response: task });
    } catch (error) {
      next(error);
    }
  };

  static getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.user = req.user as { id: string };
      const id = req.user.id;

      // 1. Check Redis first using a user-specific key
      const cachedTasks = await redis.get(`tasks:${id}`);

      if (cachedTasks) {
        res.status(200).json({
          message: "Tasks fetched from session",
          response: JSON.parse(cachedTasks),
        });
        return;
      }

      // 2. Fetch from DB on cache miss
      const tasks = await TaskService.getTasks(id);

      // 3. Cache the tasks for 2 minutes (120 seconds)
      await redis.setEx(`tasks:${id}`, 2 * 60, JSON.stringify(tasks));

      res.status(200).json({ message: "Task fetched", response: tasks });
    } catch (error) {
      next(error);
    }
  };
}
