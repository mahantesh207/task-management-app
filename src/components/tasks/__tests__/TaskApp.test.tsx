import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CONFIRM_MODAL } from "../../../constants/app";
import { TaskApp } from "../TaskApp";

describe("TaskApp", () => {
  it("renders the task list by default", () => {
    render(<TaskApp />);
    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
  });

  it("switches to add mode when floating button is clicked", () => {
    render(<TaskApp />);
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    expect(screen.getByPlaceholderText(/enter the title/i)).toBeInTheDocument();
  });

  it("returns to list mode when cancel is clicked in form", () => {
    render(<TaskApp />);
    fireEvent.click(screen.getByLabelText(/add task/i));
    fireEvent.click(screen.getByText(/cancel/i));
    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
  });

  it("enters edit mode when a task card is clicked", () => {
    render(<TaskApp />);
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), { target: { value: "Edit Task" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    
    const cardElement = screen.getByText("Edit Task");
    fireEvent.click(cardElement);
    expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  });

  it("updates a task successfully", () => {
    render(<TaskApp />);
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), { target: { value: "Update Me" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    
    fireEvent.click(screen.getByText("Update Me"));
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), { target: { value: "Updated" } });
    fireEvent.click(screen.getByRole("button", { name: /update/i }));
    
    expect(screen.getByText("Updated")).toBeInTheDocument();
  });

  it("calls handleCancel through PageLayout back button", () => {
    render(<TaskApp />);
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    
    const backBtn = screen.getByLabelText(/go back/i);
    fireEvent.click(backBtn);
    expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
  });

  it("deletes a task through TaskList handler", () => {
    render(<TaskApp />);
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), { target: { value: "Delete Me" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    
    const deleteBtns = screen.getAllByLabelText(/delete task/i);
    fireEvent.click(deleteBtns[deleteBtns.length - 1]);
    
    expect(screen.getByText(CONFIRM_MODAL.DELETE_MESSAGE)).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole("button", { name: CONFIRM_MODAL.CONFIRM_DELETE }));
    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });

  it("cancels deletion when CANCEL is clicked in modal", () => {
    render(<TaskApp />);
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), { target: { value: "Don't Delete" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    
    const deleteBtns = screen.getAllByLabelText(/delete task/i);
    fireEvent.click(deleteBtns[deleteBtns.length - 1]);
    fireEvent.click(screen.getByRole("button", { name: CONFIRM_MODAL.CANCEL }));
    expect(screen.getByText("Don't Delete")).toBeInTheDocument();
  });

  it("resets form when switching from edit back to add mode", () => {
    render(<TaskApp />);
    
    const fab = screen.getByLabelText(/add task/i);
    fireEvent.click(fab);
    fireEvent.change(screen.getByPlaceholderText(/enter the title/i), { target: { value: "Task 1" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    
    fireEvent.click(screen.getByText("Task 1"));
    expect(screen.getByDisplayValue("Task 1")).toBeInTheDocument();
    
    const backBtn = screen.getByLabelText(/go back/i);
    fireEvent.click(backBtn);
    
    fireEvent.click(screen.getByLabelText(/add task/i));
    
    expect(screen.getByPlaceholderText(/enter the title/i)).toHaveValue("");
  });
});
