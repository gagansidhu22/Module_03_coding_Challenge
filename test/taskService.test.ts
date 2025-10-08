import * as repo from "../src/api/v1/repositories/firestoreRepository";
import { createTask } from "../src/api/v1/services/taskService";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("taskService.createTask", () => {
  afterEach(() => jest.clearAllMocks());

  it("should create a task successfully", async () => {
    const input = {
      userId: "user1",
      title: "Finish assignment",
      priority: "high",
      status: "open",
      dueDate: new Date().toISOString(),
    };

    const fakeTask = {
      id: "abc123",
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // mock Firestore repo
    (repo.createDocument as jest.Mock).mockResolvedValue(fakeTask);

    const result = await createTask(input as any);

    expect(repo.createDocument).toHaveBeenCalledWith("tasks", expect.objectContaining({
      userId: "user1",
      title: "Finish assignment",
    }));
    expect(result).toEqual(fakeTask);
  });

  it("should throw an error if Firestore fails", async () => {
    (repo.createDocument as jest.Mock).mockRejectedValue(new Error("Firestore error"));

    await expect(
      createTask({
        userId: "user1",
        title: "Test",
        priority: "low",
        status: "open",
        dueDate: new Date().toISOString(),
      } as any)
    ).rejects.toThrow("Firestore error");
  });
});
