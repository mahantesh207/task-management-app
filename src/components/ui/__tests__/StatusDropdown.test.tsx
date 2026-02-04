import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StatusDropdown } from "../StatusDropdown";

describe("StatusDropdown", () => {
  const mockOnChange = vi.fn();

  it("renders with current value and toggles menu", () => {
    render(
      <StatusDropdown value="pending" onChange={mockOnChange} />
    );
    
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    
    const trigger = screen.getByText(/pending/i);
    fireEvent.click(trigger);
    
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    
    
    fireEvent.click(trigger);
    expect(screen.queryByText(/in progress/i)).not.toBeInTheDocument();
  });

  it("calls onChange and closes menu when item is clicked", () => {
    render(<StatusDropdown value="pending" onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByText(/pending/i));
    fireEvent.click(screen.getByText(/in progress/i));
    
    expect(mockOnChange).toHaveBeenCalledWith("in-progress");
    expect(screen.queryByText(/in progress/i)).not.toBeInTheDocument();
  });

  it("applies active class to the current value item", () => {
    render(<StatusDropdown value="pending" onChange={mockOnChange} />);
    fireEvent.click(screen.getByText(/pending/i));
    
    
    const items = screen.getAllByText(/pending/i);
    const menuItem = items[1].closest(".status-item");
    expect(menuItem).toHaveClass("active");
  });

  it("closes menu when clicking outside", () => {
    render(<StatusDropdown value="pending" onChange={mockOnChange} />);
    fireEvent.click(screen.getByText(/pending/i));
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText(/in progress/i)).not.toBeInTheDocument();
  });
  it("cleans up event listener on unmount", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(
      <StatusDropdown value="pending" onChange={mockOnChange} />
    );
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });
});
