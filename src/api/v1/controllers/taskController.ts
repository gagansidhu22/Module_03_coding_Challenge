import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
 
export const createTask = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const task = await taskService.createTask(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      message: "Task has been created successfully",
      data: task,
    });

  } catch (error) {
    console.error("The Error has been occured while creating task:", error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: "Failed to create task",
    });

  }

};
 