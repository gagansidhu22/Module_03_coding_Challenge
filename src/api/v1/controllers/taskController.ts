import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import { HTTP_STATUS } from "../../../constants/httpConstants";


// create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const taskData = req.body;
    const newTask = await taskService.createTask(taskData);
    res.status(HTTP_STATUS.CREATED).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to create task" });
  }
};
