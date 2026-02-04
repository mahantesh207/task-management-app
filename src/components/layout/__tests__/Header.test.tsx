import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../Header";

describe("Header", () => {
  it("renders the title correctly", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders back button when onBack is provided", () => {
    const onBack = vi.fn();
    render(<Header title="Test Title" onBack={onBack} />);
    
    const backBtn = screen.getByLabelText(/go back/i);
    expect(backBtn).toBeInTheDocument();
    
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalled();
  });

  it("does not render back button when onBack is not provided", () => {
    render(<Header title="Test Title" />);
    expect(screen.queryByLabelText(/go back/i)).not.toBeInTheDocument();
  });
});
