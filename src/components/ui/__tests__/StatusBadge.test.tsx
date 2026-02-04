import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "../StatusBadge";

describe("StatusBadge", () => {
  it("renders pending status correctly", () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("renders in-progress status correctly", () => {
    render(<StatusBadge status="in-progress" />);
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
  });

  it("renders completed status correctly", () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});
