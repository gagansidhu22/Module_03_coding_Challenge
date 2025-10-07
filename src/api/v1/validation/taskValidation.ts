import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
 
const taskSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  status: Joi.string().valid("open", "in-progress", "completed").required(),
  dueDate: Joi.date().required(),
});
 
export const taskValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = taskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: "The Validation has been failed",
      details: error.details.map((d) => d.message),
    });
  }
  next();
};