import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import { HTTP_STATUS } from "../../../constants/httpConstants";


// create task
// src/api/v1/controllers/taskController.ts

import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS } from "../../../constants/httpConstants";

import * as taskService from "../services/taskService";
 
export const createTask = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const task = await taskService.createTask(req.body);

    return res.status(HTTP_STATUS.CREATED).json({

      message: "Task has been created successfully",

      data: task,

    });

  } catch (error) {

    console.error("The Error creating task:", error);

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({

      error: "Failed to create task",

    });

  }

};
 