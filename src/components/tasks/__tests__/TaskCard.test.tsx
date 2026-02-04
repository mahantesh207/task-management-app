import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TaskCard } from "../TaskCard";
import type { TaskStatus } from "../../../types/task";

describe("TaskCard", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    date: "2024-02-04",
    status: "pending" as TaskStatus,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it("renders task information correctly", () => {
    render(<TaskCard {...defaultProps} />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("2024-02-04")).toBeInTheDocument();
  });

  it("calls onEdit when the card itself is clicked", () => {
    render(<TaskCard {...defaultProps} />);
    
    const card = screen.getByText("Test Title").closest(".task-card");
    if (card) fireEvent.click(card);
    
    expect(defaultProps.onEdit).toHaveBeenCalled();
  });

  it("calls onEdit when the edit button is clicked", () => {
    render(<TaskCard {...defaultProps} />);
    
    const editBtn = screen.getByLabelText(/edit task/i);
    fireEvent.click(editBtn);
    
    expect(defaultProps.onEdit).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<TaskCard {...defaultProps} />);
    
    const deleteBtn = screen.getByLabelText(/delete task/i);
    fireEvent.click(deleteBtn);
    
    expect(defaultProps.onDelete).toHaveBeenCalled();
  });
});
