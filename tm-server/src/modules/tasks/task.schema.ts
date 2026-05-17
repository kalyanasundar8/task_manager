import { model, Schema, Types } from "mongoose";
import { Priority, Status, type ITask } from "./task.types.js";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedBy: { type: Types.ObjectId, required: true },
    assignedTo: { type: Types.ObjectId, required: false },
    priority: {
      type: String,
      enum: Priority,
      required: true,
      default: Priority.high,
    },
    dueDate: { type: Date, required: true, default: Date.now() },
    status: {
      type: String,
      enum: Status,
      required: true,
      default: Status.active,
    },
  },
  { timestamps: true },
);

const Task = model<ITask>("task", taskSchema);
export default Task;
