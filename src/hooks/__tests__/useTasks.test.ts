import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTasks } from "../useTasks";
import type { Task } from "../../types/task";

describe("useTasks", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "Description",
    status: "pending",
    createdAt: new Date().toDateString(),
  };

  it("should initialize with an empty array if localStorage is empty", () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it("should add a task", () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.dispatch({ type: "ADD", payload: mockTask });
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual(mockTask);
  });

  it("should update a task", () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.dispatch({ type: "ADD", payload: mockTask });
    });

    const updatedTask = { ...mockTask, title: "Updated Title" };
    
    act(() => {
      result.current.dispatch({ type: "UPDATE", payload: updatedTask });
    });

    expect(result.current.tasks[0].title).toBe("Updated Title");
  });

  it("should delete a task", () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.dispatch({ type: "ADD", payload: mockTask });
    });

    expect(result.current.tasks).toHaveLength(1);

    act(() => {
      result.current.dispatch({ type: "DELETE", payload: mockTask.id });
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it("should persist tasks to localStorage", () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.dispatch({ type: "ADD", payload: mockTask });
    });

    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(storedTasks).toHaveLength(1);
    expect(storedTasks[0].id).toBe(mockTask.id);
  });

  it("should initialize with tasks from localStorage if they exist", () => {
    localStorage.setItem("tasks", JSON.stringify([mockTask]));
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual(mockTask);
  });

  it("should return current state for unknown action types", () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      (result.current.dispatch as any)({ type: "UNKNOWN" });
    });

    expect(result.current.tasks).toEqual([]);
  });

  it("should return state for unknown reducer action", () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      (result.current.dispatch as any)({ type: "UNKNOWN_ACTION" });
    });
    expect(result.current.tasks).toEqual([]);
  });

  it("should handle corrupted localStorage gracefully", () => {
    localStorage.setItem("tasks", "invalid-json");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.tasks).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
