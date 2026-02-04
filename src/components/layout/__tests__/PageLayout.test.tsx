import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PageLayout } from "../PageLayout";

describe("PageLayout", () => {
  it("renders title and children", () => {
    render(
      <PageLayout title="Layout Title">
        <div data-testid="child">Content</div>
      </PageLayout>
    );
    
    expect(screen.getByText("Layout Title")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders floating action button if provided", () => {
    const fab = <button data-testid="fab">FAB</button>;
    render(
      <PageLayout title="Title" fab={fab}>
        <div>Content</div>
      </PageLayout>
    );
    
    expect(screen.getByTestId("fab")).toBeInTheDocument();
  });

  it("calls onBack when header back button is clicked", () => {
    const onBack = vi.fn();
    render(
      <PageLayout title="Title" onBack={onBack}>
        <div>Content</div>
      </PageLayout>
    );
    
    const backBtn = screen.getByLabelText(/go back/i);
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalled();
  });
});
