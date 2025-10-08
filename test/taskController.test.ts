import { Request, Response } from "express";
import * as taskService from "../../services/taskService";
import { createTask } from "../taskController";

jest.mock("../../services/taskService");

describe("taskController.createTask", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        userId: "u1",
        title: "Task",
        priority: "medium",
        status: "open",
        dueDate: new Date().toISOString(),
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 201 when task created successfully", async () => {
    const createdTask = { id: "1", ...req.body };
    (taskService.createTask as jest.Mock).mockResolvedValue(createdTask);

    await createTask(req as Request, res as Response);

    expect(taskService.createTask).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTask);
  });

  it("should return 500 if service throws an error", async () => {
    (taskService.createTask as jest.Mock).mockRejectedValue(new Error("DB down"));

    await createTask(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to create task" });
  });
});
