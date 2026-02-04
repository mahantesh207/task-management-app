import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskForm } from "../TaskForm";

describe("TaskForm", () => {
  const mockSubmit = vi.fn();
  const mockCancel = vi.fn();

  it("submits the form with title and description", () => {
    render(<TaskForm onSubmit={mockSubmit} onCancel={mockCancel} />);
    
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter the description/i), {
      target: { value: "Task Description" },
    });
    
    fireEvent.click(screen.getByText(/add/i));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: "New Task",
      description: "Task Description",
      status: "pending",
    });
  });

  it("disables the submit button if title is empty", () => {
    render(<TaskForm onSubmit={mockSubmit} onCancel={mockCancel} />);
    const submitBtn = screen.getByRole("button", { name: /add/i });
    expect(submitBtn).toBeDisabled();
    
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), {
      target: { value: "Valid Title" },
    });
    expect(submitBtn).not.toBeDisabled();
  });

  it("does not show status dropdown in add mode", () => {
    render(<TaskForm onSubmit={mockSubmit} onCancel={mockCancel} />);
    expect(screen.queryByText(/pending/i)).not.toBeInTheDocument();
  });

  it("shows status dropdown in edit mode", () => {
    const initialTask = {
      id: "1",
      title: "Edit Me",
      description: "Desc",
      status: "pending" as const,
      createdAt: "date",
    };
    
    render(
      <TaskForm
        initialTask={initialTask}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );
    
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("toggles status dropdown and selects a status", () => {
    const initialTask = {
      id: "1",
      title: "Edit Me",
      description: "Desc",
      status: "pending" as const,
      createdAt: "date",
    };
    
    render(
      <TaskForm
        initialTask={initialTask}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );
    
    const dropdown = screen.getByText(/pending/i);
    fireEvent.click(dropdown);
    
    const inProgressOption = screen.getAllByText(/in progress/i)[0];
    fireEvent.click(inProgressOption);
    
    fireEvent.click(screen.getByText(/update/i));
    
    expect(mockSubmit).toHaveBeenCalledWith(expect.objectContaining({
      status: "in-progress"
    }));
  });

  it("closes the dropdown when clicking outside", () => {
    const initialTask = {
      id: "1",
      title: "Edit Me",
      description: "Desc",
      status: "pending" as const,
      createdAt: "date",
    };
    
    render(
      <TaskForm
        initialTask={initialTask}
        onSubmit={mockSubmit}
        onCancel={mockCancel}
      />
    );
    
    const dropdown = screen.getByText(/pending/i);
    fireEvent.click(dropdown);
    expect(screen.getAllByText(/in progress/i)[0]).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(/in progress/i)).not.toBeInTheDocument();
  });

  it("applies active class to the current status item", () => {
    const initialTask = {
      id: "1",
      title: "Active",
      description: "Test",
      status: "pending" as const,
      createdAt: "date",
    };
    
    render(
      <TaskForm
        initialTask={initialTask}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />
    );
    
    fireEvent.click(screen.getByText(/pending/i));
    const activeItem = screen.getAllByText(/pending/i)[1].closest(".status-item");
    expect(activeItem).toHaveClass("active");
  });
});
