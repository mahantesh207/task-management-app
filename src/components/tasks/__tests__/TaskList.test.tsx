import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskList } from "../TaskList";
import type { Task } from "../../../types/task";

describe("TaskList", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Buy Milk",
      description: "Grocery list",
      status: "pending",
      createdAt: "2024-02-04",
    },
    {
      id: "2",
      title: "Gym",
      description: "Workout",
      status: "completed",
      createdAt: "2024-02-04",
    },
  ];

  it("filters tasks by search query", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    const searchInput = screen.getByLabelText(/search tasks/i);
    fireEvent.change(searchInput, { target: { value: "Gym" } });
    
    expect(screen.getByText("Gym")).toBeInTheDocument();
    expect(screen.queryByText("Buy Milk")).not.toBeInTheDocument();
  });

  it("filters tasks by description ONLY", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    const searchInput = screen.getByLabelText(/search tasks/i);
    fireEvent.change(searchInput, { target: { value: "Grocery" } });
    
    expect(screen.getByText("Buy Milk")).toBeInTheDocument();
    expect(screen.queryByText("Gym")).not.toBeInTheDocument();
  });

  it("shows no tasks when search query doesn't match", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    const searchInput = screen.getByLabelText(/search tasks/i);
    fireEvent.change(searchInput, { target: { value: "Non-existent" } });
    
    expect(screen.queryByText("Gym")).not.toBeInTheDocument();
    expect(screen.queryByText("Buy Milk")).not.toBeInTheDocument();
  });

  it("renders all task sections", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.getByText(/pending/i, { selector: ".section-header-title" })).toBeInTheDocument();
    expect(screen.getByText(/completed/i, { selector: ".section-header-title" })).toBeInTheDocument();
    expect(screen.getByText(/in progress/i, { selector: ".section-header-title" })).toBeInTheDocument();
  });

  it("handles empty task list gracefully", () => {
    render(
      <TaskList
        tasks={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("handles unknown status tasks correctly", () => {
    const invalidTask = {
      id: "3",
      title: "Unknown",
      description: "Unknown",
      status: "unknown-status" as any,
      createdAt: "2024-02-04"
    };
    render(
      <TaskList
        tasks={[invalidTask]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.queryByText("Unknown")).not.toBeInTheDocument();
  });

  it("opens a section automatically when a task is added to an empty section", () => {
    const { rerender } = render(
      <TaskList
        tasks={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.queryByText("New Task")).not.toBeInTheDocument();
    
    const newTask: Task = {
      id: "3",
      title: "New Task",
      description: "Desc",
      status: "pending",
      createdAt: "2024-02-04"
    };
    
    rerender(
      <TaskList
        tasks={[newTask]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  it("filters tasks by status label in search query", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    const searchInput = screen.getByLabelText(/search tasks/i);
    
    fireEvent.change(searchInput, { target: { value: "Completed" } });
    expect(screen.getByText("Gym")).toBeInTheDocument();
    expect(screen.queryByText("Buy Milk")).not.toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: "Pending" } });
    expect(screen.getByText("Buy Milk")).toBeInTheDocument();
    expect(screen.queryByText("Gym")).not.toBeInTheDocument();
  });

  it("filters tasks by status tabs", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.getByText("Buy Milk")).toBeInTheDocument();
    expect(screen.getByText("Gym")).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/completed/i, { selector: ".tab-btn" }));
    expect(screen.getByText("Gym")).toBeInTheDocument();
    expect(screen.queryByText("Buy Milk")).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/incomplete/i, { selector: ".tab-btn" }));
    expect(screen.getByText("Buy Milk")).toBeInTheDocument();
    expect(screen.queryByText("Gym")).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/all/i, { selector: ".tab-btn" }));
    expect(screen.getByText("Buy Milk")).toBeInTheDocument();
    expect(screen.getByText("Gym")).toBeInTheDocument();
  });
});
