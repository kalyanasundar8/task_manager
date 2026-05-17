import type { Types } from "mongoose";

export enum Priority {
  high = "HIGH",
  medium = "MEDIUM",
  low = "LOW",
  urgent = "URGENT",
}

export enum Status {
  active = "ACTIVE",
  pending = "PENDING",
  completed = "COMPLETED",
}

export type ITask = {
  title: string;
  description: string;
  assignedBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  priority: Priority;
  dueDate: Date;
  status: Status;
};
