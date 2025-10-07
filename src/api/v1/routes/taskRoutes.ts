import express, { Router } from "express";
import {createTask} from "../controllers/taskController"
import {taskValidation} from "../validation/taskValidation"

const router: Router = express.Router();

router.get("/", taskValidation, createTask)

export default router;

