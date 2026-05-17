import Task from "./task.schema.js";
import type { ITask } from "./task.types.js";

export class TaskService {
  static createTask = async (data: ITask, currentUserId: string) => {
    try {
      const task = await Task.create({ ...data, assignedBy: currentUserId });
      return task;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to create task");
    }
  };

  static getTasks = async (id: string) => {
    try {
      const userExists = await Task.find({ assignedTo: id });

      return userExists;
    } catch (error) {
      console.log(error);
      throw new Error("Unable to get tasks");
    }
  };
}
