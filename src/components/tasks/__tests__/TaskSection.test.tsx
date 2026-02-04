import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskSection } from "../TaskSection";
import type { Task } from "../../../types/task";

describe("TaskSection", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Desc 1",
      status: "pending",
      createdAt: "date",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Desc 2",
      status: "completed",
      createdAt: "date",
    },
  ];

  it("renders only tasks matching the status", () => {
    render(
      <TaskSection
        title="Pending"
        status="pending"
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  it("toggles content when header is clicked", () => {
    render(
      <TaskSection
        title="Pending"
        status="pending"
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    
    const headerTitle = screen.getByText(/pending/i, { selector: ".section-header-title" });
    fireEvent.click(headerTitle);
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByText(/pending/i));
    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });
});
