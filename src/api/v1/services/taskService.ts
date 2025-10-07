// src/api/v1/services/taskService.ts
import { createDocument } from "../../../../config/firebaseConfig";

export const createTask = async (taskData: any) => {
  const timestamp = new Date().toISOString();
  const newTask = {
    ...taskData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const task = await createDocument("tasks", newTask);
  return task;
};
