import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CommandPalette from "@/components/CommandPalette";

describe("CommandPalette", () => {
  it("renders when opened", () => {
    render(<CommandPalette open={true} onOpenChange={() => {}} />);
    expect(screen.getByPlaceholderText(/Type a command or search portfolio.../i)).toBeInTheDocument();
    expect(screen.getByText("About Anand")).toBeInTheDocument();
    expect(screen.getByText("Technical Stack")).toBeInTheDocument();
    expect(screen.getByText("Automation & Architecture Hub")).toBeInTheDocument();
  });

  it("lists project and action commands", () => {
    render(<CommandPalette open={true} onOpenChange={() => {}} />);
    expect(screen.getByText(/UVIndia Enterprise/i)).toBeInTheDocument();
    expect(screen.getByText(/Copy Email/i)).toBeInTheDocument();
  });
});
