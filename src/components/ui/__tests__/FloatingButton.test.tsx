import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FloatingButton } from "../FloatingButton";

describe("FloatingButton", () => {
  it("renders correctly and handles click", () => {
    const onClick = vi.fn();
    render(<FloatingButton onClick={onClick} />);
    
    const button = screen.getByLabelText(/add task/i);
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
